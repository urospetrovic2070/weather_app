import { LOCATION_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const namePrefix = url.searchParams.get('q') || '';
	if (namePrefix.length < 2) {
		return json({ data: [] });
	}

	try {
		const apiUrl = new URL(LOCATION_URL);
		apiUrl.searchParams.set('limit', '5');
		apiUrl.searchParams.set('offset', '0');
		apiUrl.searchParams.set('types', 'CITY');
		apiUrl.searchParams.set('sort', '-population');
		apiUrl.searchParams.set('namePrefix', namePrefix);
		apiUrl.searchParams.set('minPopulation', '100000');

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
