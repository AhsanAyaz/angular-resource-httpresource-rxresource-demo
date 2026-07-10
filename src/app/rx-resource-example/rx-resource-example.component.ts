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
