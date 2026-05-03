<script lang="ts">
	import { globalState } from '$lib/state/global.svelte';
	import { weatherState } from '$lib/state/weather.svelte';
	import type { Location } from '$lib/types';

	interface Props {
		location: Location[];
	}
	let { location }: Props = $props();

	async function handleClick(e: any) {
		const latitude = e.target.dataset.latitude;
		const longitude = e.target.dataset.longitude;
		const query = `${latitude}_${longitude}`;
		try {
			const res = await fetch(`/api/weather?q=${encodeURIComponent(query)}`);
			const data = await res.json();
			weatherState.weather = data;
			globalState.global.modal.open = false;
			document.body.style.overflow = '';
		} catch (err) {
			console.error('Search Error:', err);
		}
	}
</script>

<div class="absolute flex flex-col">
	{#if location.length > 0}
		{#each location as { country, latitude, longitude, name }}
			<button
				class="w-75 cursor-pointer bg-black/50 p-3 backdrop-blur-xl first:rounded-t-sm last:rounded-b-sm hover:bg-black/70 lg:w-100"
				data-latitude={latitude}
				data-longitude={longitude}
				onclick={handleClick}>{name}, {country}</button
			>
		{/each}
	{/if}
</div>
