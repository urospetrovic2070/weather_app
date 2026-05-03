<script>
	import SearchModal from '$lib/components/search/SearchModal.svelte';
	import Current from '$lib/components/weather/current/Current.svelte';
	import Forecast from '$lib/components/weather/forecast/Forecast.svelte';
	import { weatherState } from '$lib/state/weather.svelte';
</script>

{#if weatherState.weather && weatherState.weather.ready}
	<Current />
	<Forecast />
{:else}
	<p class="text-center">No Location Selected</p>
{/if}
<SearchModal />
