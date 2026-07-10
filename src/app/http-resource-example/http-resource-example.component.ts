import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MultiCityWeather, WeatherData } from '../weather.types';

/**
 * 2. httpResource(): the HttpClient-powered shortcut.
 * A URL function that reads a signal, so flipping the toggle re-fetches automatically.
 */
@Component({
  selector: 'app-http-resource-example',
  template: `
    <section>
      <h2 class="text-xl font-semibold mb-2">2. httpResource() with a URL function</h2>
      <p class="text-sm opacity-70 mb-2">
        The URL function reads <code>isMultiCityMode()</code>, so flipping the
        toggle re-fetches automatically through <code>HttpClient</code>.
      </p>
      <label class="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          class="toggle toggle-primary"
          data-testid="multi-toggle"
          [checked]="isMultiCityMode()"
          (change)="toggleMultiCity()"
        />
        <span>Multi-city mode (Milan)</span>
      </label>
      <div class="mt-3" data-testid="http-output">
        @if (httpWeather.isLoading()) {
          <span class="loading loading-spinner loading-lg"></span>
        } @else if (httpWeather.error()) {
          <div role="alert" class="alert alert-error">
            {{ httpWeather.error() }}
          </div>
        } @else if (httpWeather.value(); as weather) {
          <img [src]="weather.icon" class="w-16" alt="weather icon" />
          <p>Temperature: {{ weather.temperature }}</p>
          <p>Condition: {{ weather.condition }}</p>
        }
      </div>
    </section>
  `,
})
export class HttpResourceExampleComponent {
  isMultiCityMode = signal<boolean>(false);

  httpWeather = httpResource<WeatherData>(
    () => {
      // Reads a signal, so it re-fetches when the toggle changes.
      return this.isMultiCityMode()
        ? 'assets/weather-multi.json'
        : 'assets/weather.json';
    },
    {
      parse: (response) => {
        // Throw here to surface a validation error in error().
        if (this.isMultiCityMode()) {
          const list = response as MultiCityWeather[];
          const milan = list.find((info) => info.city === 'Milan');
          if (!milan) {
            throw new Error('Weather info not found');
          }
          return milan;
        }
        return response as WeatherData;
      },
    }
  );

  toggleMultiCity() {
    this.isMultiCityMode.update((value) => !value);
  }
}
