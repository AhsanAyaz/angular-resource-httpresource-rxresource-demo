import { Component, resource, signal } from '@angular/core';
import { WeatherData } from '../weather.types';

type WeatherRequestState = 'idle' | 'ready';

/**
 * 1. resource(): the general-purpose primitive.
 * A custom async loader with an abortSignal, plus reactive params so it loads on demand only.
 */
@Component({
  selector: 'app-resource-example',
  template: `
    <section>
      <h2 class="text-xl font-semibold mb-2">1. resource() with reactive params</h2>
      <p class="text-sm opacity-70 mb-2">
        Custom <code>async</code> loader with <code>abortSignal</code>.
        <code>params</code> returns <code>undefined</code> until you click, so it
        loads on demand only.
      </p>
      <button class="btn btn-primary" (click)="getWeatherInfo()">
        Fetch Weather (resource)
      </button>
      <div class="mt-3" data-testid="resource-output">
        @if (weatherResource.isLoading()) {
          <span class="loading loading-spinner loading-lg"></span>
        } @else if (weatherResource.error()) {
          <div role="alert" class="alert alert-error">
            {{ weatherResource.error() }}
          </div>
        } @else if (weatherResource.value(); as weather) {
          <img [src]="weather.icon" class="w-16" alt="weather icon" />
          <p>Temperature: {{ weather.temperature }}</p>
          <p>Condition: {{ weather.condition }}</p>
        }
      </div>
    </section>
  `,
})
export class ResourceExampleComponent {
  weatherRequestState = signal<WeatherRequestState>('idle');

  weatherResource = resource<WeatherData, WeatherRequestState | undefined>({
    params: () => {
      // Return undefined to skip loading entirely.
      if (this.weatherRequestState() === 'idle') {
        return undefined;
      }
      return this.weatherRequestState();
    },
    loader: async ({ abortSignal }) => {
      const response = await fetch('assets/weather.json', {
        signal: abortSignal,
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      return (await response.json()) as WeatherData;
    },
  });

  getWeatherInfo() {
    this.weatherRequestState.set('ready');
  }
}
