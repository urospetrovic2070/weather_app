<script lang="ts">
	import Suggestions from './Suggestions.svelte';
	import { getCities } from './search.remote';

	let search = '';
	let timeout: ReturnType<typeof setTimeout>;
	let locations: any[] = [];

	async function searchLocation(query: string) {
		if (query.length < 2) {
			locations = [];
			return;
		}

		try {
			const data = await getCities(query);
			locations = data || [];
		} catch (err) {
			console.error('Search Error:', err);
			locations = [];
		}
	}

	const handleSearch = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			searchLocation(search);
		}, 300);
	};
</script>

<div>
	<input
		class="w-100 bg-white p-3 focus:outline-none"
		id="search"
		autocomplete="off"
		placeholder="Enter a location (e.g. Limoges)"
		on:input={handleSearch}
		bind:value={search}
	/>

	<Suggestions {locations} />
</div>
