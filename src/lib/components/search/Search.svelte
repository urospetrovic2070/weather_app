<script lang="ts">
	import { getLocation } from '$lib/remote/search.remote';
	import { weatherState } from '$lib/state/weather.svelte';
	import type { Location } from '$lib/types';

	import SearchList from './SearchList.svelte';

	let location: Location[] = $state([]);
	let locationVisible: boolean = $state(false);
	let search: string = $state('');
	let spinnerVisible: boolean = $state(false);

	let searchContainer: HTMLDivElement;
	let timeout: ReturnType<typeof setTimeout>;

	let inputEl: HTMLInputElement | null = null;

	$effect(() => {
		requestAnimationFrame(() => {
			inputEl?.focus();
		});
	});

	async function searchLocation(query: string) {
		if (query.length < 3) {
			location = [];
			return;
		}
		try {
			spinnerVisible = true;
			const data = await getLocation(query).run();
			location = data || [];
			spinnerVisible = false;
		} catch (err) {
			console.error('Search Error:', err);
			location = [];
		}
	}

	const handleSearch = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			searchLocation(search);
		}, 400);
	};

	$effect(() => {
		({ location, locationVisible, search } = {
			location: [],
			locationVisible: false,
			search: ''
		});
		weatherState.weather;
	});

	$effect(() => {
		const onPointerDown = (e: PointerEvent): void => {
			const isOutside =
				e.target instanceof Node && locationVisible && !searchContainer.contains(e.target);
			if (isOutside) {
				locationVisible = false;
			}
		};
		document.addEventListener('pointerdown', onPointerDown);
		return () => document.removeEventListener('pointerdown', onPointerDown);
	});
</script>

<div bind:this={searchContainer}>
	<input
		autocomplete="off"
		bind:this={inputEl}
		bind:value={search}
		class="mb-2 w-75 rounded-sm bg-black/40 p-3 backdrop-blur-xl focus:outline-none lg:w-100"
		id="search"
		onfocus={() => (locationVisible = true)}
		oninput={handleSearch}
		placeholder="Enter a settlement (e.g. Limoges)"
	/>
	{#if spinnerVisible}
		<span
			class="loader pointer-events-none absolute top-3 right-3 box-border inline-block h-6.25 w-6.25 rounded-full border-[3px] border-white border-b-transparent"
		></span>
	{/if}
	{#if locationVisible}
		<SearchList {location} />
	{/if}
</div>
