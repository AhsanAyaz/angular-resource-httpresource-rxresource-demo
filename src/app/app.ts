import { Component } from '@angular/core';
import { ResourceExampleComponent } from './resource-example/resource-example.component';
import { HttpResourceExampleComponent } from './http-resource-example/http-resource-example.component';
import { RxResourceExampleComponent } from './rx-resource-example/rx-resource-example.component';

@Component({
  selector: 'app-root',
  imports: [
    ResourceExampleComponent,
    HttpResourceExampleComponent,
    RxResourceExampleComponent,
  ],
  template: `
    <div class="navbar bg-base-200 shadow-sm">
      <div class="flex-1 px-2 font-semibold">
        resource() vs httpResource() vs rxResource()
      </div>
      <div class="flex-none px-2 text-sm">Angular v22</div>
    </div>

    <div class="prose max-w-2xl mx-auto p-6 space-y-10">
      <!-- CTA banner -->
      <div class="alert bg-base-200 text-sm my-3 block">
        Live code from the
        <a
          class="link link-primary"
          href="https://blog.codewithahsan.dev/angular-resource-httpresource-rxresource"
          target="_blank"
          >resource() vs rxResource() vs httpResource() guide</a
        >. Full deep-dive in
        <a
          class="link link-primary"
          href="https://leanpub.com/mastering-angular-signals/c/V22LAUNCH?utm_source=youtube&utm_medium=social&utm_campaign=v22-launch"
          target="_blank"
          >Mastering Angular Signals</a
        >.
      </div>

      <div class="alert alert-success text-sm block">
        All three APIs give you the same signal surface:
        <code>value()</code>, <code>isLoading()</code>, <code>error()</code> and
        <code>reload()</code>. They differ only in how you tell them to fetch.
      </div>

      <app-resource-example />
      <app-http-resource-example />
      <app-rx-resource-example />
    </div>
  `,
})
export class App {}
