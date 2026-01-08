import { query } from '$app/server';

import { supabase } from '$lib/supabaseClient';

export const getCities = query('unchecked', async (search) => {
	const { data, error } = await supabase
		.from('cities')
		.select('name,country,region')
		.ilike('search', `%${search}%`)
		.limit(5)
		.order('population', { ascending: false });
	if (error) {
		console.error(error);
	}
	return data;
});
