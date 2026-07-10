import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { WeatherData } from './weather.types';

/**
 * Scaffold stub. Step 3 recreates the real HttpClient-backed body.
 */
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  getWeather(): Observable<WeatherData> {
    return EMPTY;
  }
}
