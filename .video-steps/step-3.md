# Step 3: rxResource() with the stream option

Slides: Part 3 (rxResource(): the RxJS bridge, the stream option, wiring an RxJS service).
Goal: build the RxJS service and fill in the third example. rxResource() feeds an Observable
into the same resource surface. In v22 the option is named stream.

## FILE: src/app/weather.service.ts
```ts
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
```

## FILE: src/app/rx-resource-example/rx-resource-example.component.ts
```ts
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather.types';

/**
 * 3. rxResource(): the RxJS bridge.
 * Feeds an Observable into the same resource surface. In v22 the option is named stream.
 */
@Component({
  selector: 'app-rx-resource-example',
  template: `
    <section>
      <h2 class="text-xl font-semibold mb-2">3. rxResource() with the stream option</h2>
      <p class="text-sm opacity-70 mb-2">
        Bridges an RxJS service (<code>WeatherService.getWeather()</code>) into
        signals. In v22 the option is named <code>stream</code>.
      </p>
      <button class="btn btn-secondary" (click)="rxWeather.reload()">
        Reload (rxResource)
      </button>
      <div class="mt-3" data-testid="rx-output">
        @if (rxWeather.isLoading()) {
          <span class="loading loading-spinner loading-lg"></span>
        } @else if (rxWeather.error()) {
          <div role="alert" class="alert alert-error">
            {{ rxWeather.error() }}
          </div>
        } @else if (rxWeather.value(); as weather) {
          <img [src]="weather.icon" class="w-16" alt="weather icon" />
          <p>Temperature: {{ weather.temperature }}</p>
          <p>Condition: {{ weather.condition }}</p>
        }
      </div>
    </section>
  `,
})
export class RxResourceExampleComponent {
  private weatherService = inject(WeatherService);

  rxWeather = rxResource<WeatherData, string>({
    stream: () =>
      this.weatherService.getWeather().pipe(
        catchError(() => {
          throw new Error('Could not fetch data');
        })
      ),
  });
}
```

## Explanation (write verbatim to STEP-3-EXPLAINED.md)
```md
# Step 3: rxResource() with the stream option

- `rxResource()` bridges the RxJS world into the same resource surface.
- The `stream` option (v22 name) takes a function returning an `Observable`.
- We `inject(WeatherService)` and pipe `getWeather()` through `catchError` to surface errors.
- `rxWeather.reload()` re-runs the stream on demand; state is `value()`/`isLoading()`/`error()`.

Try it: click "Reload (rxResource)" and watch the loading spinner refresh the data.
```
