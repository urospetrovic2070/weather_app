<script lang="ts">
	import { weatherState } from '$lib/state/weather.svelte';
	import { formatDate, formatDayOfTheWeek, formatDescription } from '$lib/utils/format';

	const { daily, daily_units } = $derived(weatherState.weather);
</script>

<div class="no-scrollbar overflow-x-auto">
	<ul class="grid auto-cols-[170px] grid-flow-col gap-5 lg:grid-cols-7">
		{#each daily as day}
			<li class="bg-black/30 py-4 text-center backdrop-blur-xl">
				<p>{formatDayOfTheWeek(day.time)}</p>
				<p class="font-medium">
					{formatDate(day.time)}
				</p>
				<p class="text-xl">
					{formatDescription(day.weather_code)}
				</p>
				<p class="text-lg font-medium">
					{day.temperature_2m_max}
					{daily_units.temperature_2m_max} / {day.temperature_2m_min}
					{daily_units.temperature_2m_min}
				</p>
			</li>
		{/each}
	</ul>
</div>
