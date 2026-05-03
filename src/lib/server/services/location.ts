import { error as kitError } from '@sveltejs/kit';

import { supabase } from '$lib/supabaseClient';

export async function searchLocation(search: string) {
	const { data, error } = await supabase
		.from('locations')
		.select('name,country,latitude,longitude')
		.ilike('search', `%${search}%`)
		.limit(5)
		.order('population', { ascending: false });
	if (error) {
		throw kitError(500, `Error:${error.message}`);
	}
	return data;
}

export async function fetchLocation(latitude: string, longitude: string) {
	const { data, error } = await supabase
		.from('locations')
		.select('name,country,region')
		.eq('latitude', latitude)
		.eq('longitude', longitude)
		.single();
	if (error) {
		throw kitError(500, `Error:${error.message}`);
	}
	return data;
}
