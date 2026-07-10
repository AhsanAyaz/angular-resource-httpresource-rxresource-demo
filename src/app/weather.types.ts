/**
 * Shared weather shapes used by all three examples.
 * Keeping them in one file means every resource returns the same signal surface.
 */
export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

export interface MultiCityWeather extends WeatherData {
  city: string;
}
