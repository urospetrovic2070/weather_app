import { WEATHER_KEY, WEATHER_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q') || '';
	if (query.length < 2) {
		return json({ data: [] });
	}

	const NUMBER_OF_DAYS = '3';
	const AQI_ENABLED = 'yes';
	const ALERTS_ENABLED = 'yes';

	try {
		const apiUrl = new URL(WEATHER_URL);
		apiUrl.searchParams.set('key', WEATHER_KEY);
		apiUrl.searchParams.set('q', query);
		apiUrl.searchParams.set('days', NUMBER_OF_DAYS);
		apiUrl.searchParams.set('aqi', AQI_ENABLED);
		apiUrl.searchParams.set('alerts', ALERTS_ENABLED);

		const res = await fetch(apiUrl.toString());
		if (!res.ok) {
			return error(400, 'Error');
		}

		const data = await res.json();
		return json(data);
	} catch (err) {
		console.error('Error:', err);
		return error(500, 'Error');
	}
};
