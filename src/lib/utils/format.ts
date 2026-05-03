import description from './description';

export const formatDayOfTheWeek = (time: string) => {
	return new Date(time).toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatDate = (time: string) => {
	return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatTime = (time: string, timeZone?: string) => {
	return new Date(time).toLocaleTimeString([], {
		timeZone: timeZone || undefined,
		minute: '2-digit',
		hour: '2-digit',
		hour12: false
	});
};

export const formatDescription = (weather_code: number) => {
	return description[description.findIndex((el) => el.code === weather_code)].day.description;
};

export const formatBackground = (weather_code: number) => {
	return description[description.findIndex((el) => el.code === weather_code)].day.background;
};
