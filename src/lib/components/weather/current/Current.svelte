<script lang="ts">
	import { weatherState } from '$lib/state/weather.svelte';
	import description from '$lib/utils/description';
	import { formatTime } from '$lib/utils/format';

	const { name, region, country, timezone, current, current_units } = $derived(
		weatherState.weather
	);
</script>

<div
	class="grid grid-cols-3 gap-5 rounded-sm bg-black/30 px-4 py-5 backdrop-blur-xl lg:grid-cols-2 lg:gap-10 lg:px-5"
>
	<div class="order-1 col-span-2 lg:col-span-1">
		<p class="mt-1 text-lg">Current Weather</p>
		<p class="text-2xl">
			{name}, <span class="block lg:inline">{country === 'United States' ? region : country}</span>
		</p>
	</div>
	<div class="order-2 flex items-center justify-end lg:block">
		<p class="text-right text-4xl lg:text-5xl">
			{formatTime(new Date().toISOString(), timezone)}
		</p>
	</div>
	<div class="order-3 col-span-2 lg:col-span-1">
		<h1 class="text-6xl font-bold">
			{current.temperature_2m}
			{current_units.temperature_2m}
		</h1>
		<p class="mt-3 text-2xl">
			{description[description.findIndex((el) => el.code === current.weather_code)].day.description}
		</p>
		<p class="mt-1 text-lg">
			Feels like {current.apparent_temperature}
			{current_units.apparent_temperature}
		</p>
	</div>
	<div class="order-4 col-span-3 grid grid-cols-3 gap-3 text-sm lg:col-span-1 lg:text-base">
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>Wind speed</p>
			<p>
				{current.wind_speed_10m}
				{current_units.wind_speed_10m}
			</p>
		</div>
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>Humidity</p>
			<p>
				{current.relative_humidity_2m}
				{current_units.relative_humidity_2m}
			</p>
		</div>
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>Pressure</p>
			<p>
				{current.pressure_msl}
				{current_units.pressure_msl}
			</p>
		</div>
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>UV Index</p>
			<p>{current.uv_index}</p>
		</div>
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>Visibility</p>
			<p>
				{weatherState.weather.current.visibility}
				{weatherState.weather.hourly_units.visibility}
			</p>
		</div>
		<div class="rounded-sm bg-black/30 p-2 backdrop-blur-xl">
			<p>Sunset</p>
			<p>
				{formatTime(current.sunset)}
			</p>
		</div>
	</div>
</div>
