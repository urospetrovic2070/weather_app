interface Current_Units {
	time: string;
	interval: string;
	temperature_2m: string;
	relative_humidity_2m: string;
	apparent_temperature: string;
	is_day: string;
	weather_code: string;
	pressure_msl: string;
	wind_speed_10m: string;
	wind_direction_10m: string;
	uv_index: string;
	sunset: string;
}

interface Current {
	time: string;
	interval: number;
	temperature_2m: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	is_day: number;
	weather_code: number;
	pressure_msl: number;
	wind_speed_10m: number;
	wind_direction_10m: number;
	uv_index: number;
	sunset: string;
	visibility: number;
}

interface Hourly_Units {
	time: string;
	temperature_2m: string;
	visibility: string;
}

interface Hourly {
	time: string[];
	temperature_2m: number[];
	visibility: number[];
}

interface Daily_Units {
	time: string;
	weather_code: string;
	temperature_2m_max: string;
	temperature_2m_min: string;
	sunset: string;
	uv_index_max: string;
}

export interface Daily {
	time: string;
	weather_code: number;
	temperature_2m_max: number;
	temperature_2m_min: number;
	sunset: string;
	uv_index_max: number;
}

export interface Weather {
	ready: boolean;
	name: string;
	country: string;
	region: string;
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: Current_Units;
	current: Current;
	hourly_units: Hourly_Units;
	hourly: Hourly;
	daily_units: Daily_Units;
	daily: Daily[];
}

export interface Daily_Response {
	time: string[];
	weather_code: number[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	sunset: string[];
	uv_index_max: number[];
}

export interface Location {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
}
