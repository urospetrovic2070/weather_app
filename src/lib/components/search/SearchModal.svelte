<script>
	import { globalState } from '$lib/state/global.svelte';

	import Search from './Search.svelte';
</script>

{#if globalState.global.modal.open}
	<div class="fixed inset-0 z-1">
		<button
			class="absolute inset-0 overflow-hidden bg-black/20 backdrop-blur-2xl"
			title=""
			onclick={() => {
				globalState.global.modal.open = false;
				document.body.style.overflow = '';
			}}
		></button>
		<div class="absolute top-1/10 left-1/2 -translate-x-1/2 -translate-y-1/10">
			<Search />
		</div>
	</div>
{/if}
