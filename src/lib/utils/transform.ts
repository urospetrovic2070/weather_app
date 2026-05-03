import type { Daily, Daily_Response } from '$lib/types';

export const transposeDaily = (daily: Daily_Response): Daily[] => {
	return daily.time.map((_, i) => ({
		time: daily.time[i],
		weather_code: daily.weather_code[i],
		temperature_2m_max: daily.temperature_2m_max[i],
		temperature_2m_min: daily.temperature_2m_min[i],
		sunset: daily.sunset[i],
		uv_index_max: daily.uv_index_max[i]
	}));
};

export const sliceHourlyData = (
	time: string[],
	temperature: number[],
	visibility: number[],
	timeZone: string
) => {
	const now = new Date();

	const local = new Date(
		new Intl.DateTimeFormat('en-US', {
			timeZone,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(now)
	);

	let closestIndex = 0;
	const diff = (t: string) => Math.abs(new Date(t).getTime() - local.getTime());

	for (let i = 1; i < time.length; i++) {
		if (diff(time[i]) < diff(time[closestIndex])) {
			closestIndex = i;
		}
	}

	const slicedTime = time.slice(closestIndex, closestIndex + 24);
	const slicedTemperature = temperature.slice(closestIndex, closestIndex + 24);
	const currentVisibility = visibility[closestIndex];

	return [slicedTime, slicedTemperature, currentVisibility];
};
