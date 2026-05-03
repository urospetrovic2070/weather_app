<script lang="ts">
	import * as d3 from 'd3';

	import { weatherState } from '$lib/state/weather.svelte';

	interface Point {
		x: Date;
		y: number;
	}

	const width = $state(2304);
	const height = $state(400);
	const margin = { top: 0, right: 0, bottom: 0, left: 0 };
	const hourlyInterval = d3.timeHour.every(1);

	let container = $state<HTMLDivElement | null>(null);
	let offsetX = $state(0);
	let startX = $state(0);
	let isDragging = $state(false);
	let viewportWidth = $state(850);

	const maxOffset = $state(0);
	const minOffset = $derived(viewportWidth - width);

	const { hourly } = $derived(weatherState.weather);

	$effect(() => {
		const el = container;
		if (!el) return;

		const update = () => {
			viewportWidth = el.clientWidth - 50;
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(el);

		return () => ro.disconnect();
	});

	$effect(() => {
		if (data.length) {
			offsetX = 0;
		}
	});

	let data = $derived(
		hourly
			? Array.from({ length: 24 }, (_, i) => ({
					x: new Date(hourly.time[i]),
					y: hourly.temperature_2m[i]
				}))
			: []
	);

	let xScale = $derived(
		data
			? d3
					.scaleTime()
					.domain(d3.extent(data, (d) => d.x) as [Date, Date])
					.range([margin.left, width - margin.right])
			: null
	);

	let xTicks = $derived(xScale && hourlyInterval ? xScale.ticks(hourlyInterval) : []);

	let yScale = $derived(
		data
			? d3
					.scaleLinear()
					.domain([d3.min(data, (d) => d.y) as number, d3.max(data, (d) => d.y) as number])
					.range([height - 50, margin.top + 50])
			: null
	);

	let lineGenerator = $derived(
		xScale && yScale
			? d3
					.line<Point>()
					.x((d) => xScale(d.x))
					.y((d) => yScale(d.y))
					.curve(d3.curveLinear)
			: null
	);

	const formatHour = d3.timeFormat('%H:%M');

	// const wheel = (e: WheelEvent) => {
	// 	if (!container) return;
	// 	e.preventDefault();
	// 	container.scrollLeft += e.deltaY;
	// };

	const clamp = (value: number, min: number, max: number) => {
		return Math.max(min, Math.min(max, value));
	};

	const onPointerDown = (event: PointerEvent) => {
		isDragging = true;
		startX = event.clientX;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event: PointerEvent) => {
		if (!isDragging) return;

		const dx = event.clientX - startX;
		startX = event.clientX;

		offsetX = clamp(offsetX + dx, minOffset, maxOffset);
	};

	const onPointerUp = () => {
		isDragging = false;
	};
</script>

<div
	style="touch-action: none;"
	class="no-scrollbar cursor-move overflow-x-auto bg-black/30 py-5 backdrop-blur-xl no-select"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	role="application"
	aria-label="Chart"
	bind:this={container}
>
	{#if data && xScale && yScale && lineGenerator}
		<svg
			class="no-interaction"
			{width}
			{height}
			viewBox={`${-2} ${-2} ${width + 2 * 2} ${height + 2 * 2}`}
		>
			<g transform={`translate(${offsetX},0)`}>
				<g transform="translate(0,{height})">
					{#each xTicks as tick}
						<text x={xScale(tick)} fill="white">{formatHour(tick)}</text>
					{/each}
				</g>
				<path d={lineGenerator(data)} class="min-w-max stroke-white" stroke-width={6} fill="none" />
				{#each data as d}
					<text x={xScale(d.x)} y={yScale(d.y) - 35} fill="white">
						{d.y}°
					</text>
				{/each}
			</g>
		</svg>
	{/if}
</div>
