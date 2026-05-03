<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { weatherState } from '$lib/state/weather.svelte';
	import { formatBackground } from '$lib/utils/format';

	import type { LayoutProps } from './$types';
	import './layout.css';

	let { data, children }: LayoutProps = $props();

	$effect(() => {
		weatherState.weather = data.weather;
	});
</script>

<svelte:head
	><link rel="icon" href={favicon} /><link
		rel="preload"
		as="image"
		href="/images/day_sunny.jpg"
	/></svelte:head
>
<div
	class="flex min-h-screen flex-col bg-blue-500 bg-cover text-white"
	style={`background-image: url(${weatherState.weather && weatherState.weather.ready ? formatBackground(weatherState.weather.current.weather_code) : '/images/day_sunny.jpg'})`}
>
	<Header />
	<main class="flex-1">
		<div class="mx-auto my-7 max-w-6xl px-2 lg:px-0">
			{@render children()}
		</div>
	</main>
	<Footer />
</div>
