import type { Weather } from '$lib/types';

function createWeatherState() {
	let weather = $state<Weather>({
		ready: false,
		name: '',
		country: '',
		region: '',
		latitude: 0,
		longitude: 0,
		generationtime_ms: 0,
		utc_offset_seconds: 0,
		timezone: '',
		timezone_abbreviation: '',
		elevation: 0,
		current_units: {
			time: '',
			interval: '',
			temperature_2m: '',
			relative_humidity_2m: '',
			apparent_temperature: '',
			is_day: '',
			weather_code: '',
			pressure_msl: '',
			wind_speed_10m: '',
			wind_direction_10m: '',
			uv_index: '',
			sunset: ''
		},
		current: {
			time: '',
			interval: 0,
			temperature_2m: 0,
			relative_humidity_2m: 0,
			apparent_temperature: 0,
			is_day: 0,
			weather_code: 0,
			pressure_msl: 0,
			wind_speed_10m: 0,
			wind_direction_10m: 0,
			uv_index: 0,
			sunset: '',
			visibility: 0
		},
		hourly_units: {
			time: '',
			temperature_2m: '',
			visibility: ''
		},
		hourly: {
			time: [],
			temperature_2m: [],
			visibility: []
		},
		daily_units: {
			time: '',
			weather_code: '',
			temperature_2m_max: '',
			temperature_2m_min: '',
			sunset: '',
			uv_index_max: ''
		},
		daily: []
	});

	return {
		get weather() {
			return weather;
		},
		set weather(v) {
			weather = v;
		}
	};
}

export const weatherState = createWeatherState();
