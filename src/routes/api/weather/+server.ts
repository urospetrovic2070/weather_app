import { json } from '@sveltejs/kit';

import { setCookies } from '$lib/server/cookies';
import { redis } from '$lib/server/redis';
import { fetchLocation } from '$lib/server/services/location';
import { fetchWeather } from '$lib/server/services/weather';
import { sliceHourlyData, transposeDaily } from '$lib/utils/transform';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const query = url.searchParams.get('q') || '';
	if (query.length < 2) {
		return json({});
	}

	const [latitude, longitude] = query.split('_');
	const queryKey = `${latitude}_${longitude}`;

	const location = await fetchLocation(latitude, longitude);
	const weather = await fetchWeather(fetch, latitude, longitude);

	setCookies(cookies, {
		latitude,
		longitude
	});

	const data = { ...location, ...weather };

	data.daily = transposeDaily(data.daily);
	data.current_units.uv_index = data.daily_units.uv_index_max;
	data.current.uv_index = data.daily[0].uv_index_max;
	data.current_units.sunset = data.daily_units.sunset;
	data.current.sunset = data.daily[0].sunset;

	const [time, temperature, visibility] = sliceHourlyData(
		data.hourly.time,
		data.hourly.temperature_2m,
		data.hourly.visibility,
		data.timezone
	);
	data.hourly.time = time;
	data.hourly.temperature_2m = temperature;
	data.current.visibility = visibility;
	data.ready = true;

	await redis.set(queryKey, JSON.stringify(data), { ex: 3600 });

	return json(data);
};
