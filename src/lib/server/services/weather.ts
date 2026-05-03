import { WEATHER_API } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function fetchWeather(
	fetch: typeof globalThis.fetch,
	latitude: string,
	longitude: string
) {
	const daily = 'weather_code,temperature_2m_max,temperature_2m_min,sunset,uv_index_max';
	const hourly = 'temperature_2m,visibility';
	const current =
		'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m';
	const timezone = 'auto';

	const params = {
		latitude,
		longitude,
		daily,
		hourly,
		current,
		timezone
	};

	try {
		const apiUrl = new URL(WEATHER_API);
		Object.entries(params).forEach(([key, val]) => {
			if (val != null) {
				apiUrl.searchParams.set(key.toLowerCase(), String(val));
			}
		});

		const res = await fetch(apiUrl.toString());
		if (!res.ok) {
			throw error(res.status, `Error:${res.status}`);
		}

		return await res.json();
	} catch (err) {
		if (err instanceof Response) throw err;

		throw error(500, 'Internal Server Error');
	}
}
