import { redis } from '$lib/server/redis';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const latitude = cookies.get('latitude');
	const longitude = cookies.get('longitude');
	const cached = await redis.get(`${latitude}_${longitude}`);
	if (cached) {
		return { weather: cached };
	} else if (latitude && longitude) {
		const query = `${latitude}_${longitude}`;
		const res = await fetch(`/api/weather?q=${encodeURIComponent(query)}`);
		const data = await res.json();
		return { weather: data };
	}
};
