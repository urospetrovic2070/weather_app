<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { globalState } from '$lib/state/global.svelte';
	import { weatherState } from '$lib/state/weather.svelte';

	let width = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

<header class="bg-black/30 py-5 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center px-3 lg:px-0">
		<h1 class="flex-1 text-3xl">Tropocast</h1>
		{#if width < 1024}
			<button
				onclick={() => {
					globalState.global.modal.open = true;
					document.body.style.overflow = 'hidden';
				}}
				class="cursor-pointer text-3xl"
			>
				<SearchIcon />
			</button>
		{:else}
			<input
				class="w-75 rounded-sm bg-black/30 p-3 backdrop-blur-xl focus:outline-none lg:w-100"
				onfocus={() => {
					globalState.global.modal.open = true;
					document.body.style.overflow = 'hidden';
				}}
				placeholder="Search"
			/>
			<p class="flex-1 text-right">
				{weatherState.weather?.ready ? weatherState.weather.name : 'Select Location'}
			</p>
		{/if}
	</div>
</header>
