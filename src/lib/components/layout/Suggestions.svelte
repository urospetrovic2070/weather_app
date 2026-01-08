<script lang="ts">
	interface Props {
		locations: any[];
	}
	let { locations }: Props = $props();
</script>

<div class="absolute">
	{#if locations.length > 0}
		{#each locations as location}
			<div class="w-100 cursor-pointer border-b-2 bg-white p-3">
				<p>{location.name}, {location.country}</p>
			</div>
		{/each}
	{/if}
</div>
