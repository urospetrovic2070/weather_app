import * as z from 'zod';

import { query } from '$app/server';

import { searchLocation } from '$lib/server/services/location';

export const getLocation = query(z.string(), async (search) => {
	return searchLocation(search);
});
