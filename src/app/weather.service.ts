import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { WeatherData } from './weather.types';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getWeather(): Observable<WeatherData> {
    // Simulate an API call with a delayed response so the loading state is visible.
    return this.http.get<WeatherData>('assets/weather.json').pipe(delay(1200));
  }
}
