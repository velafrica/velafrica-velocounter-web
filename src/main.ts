import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// check if https active, because that would cause trouble with the backend
if (location.protocol != 'http:')
{
  location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

platformBrowserDynamic().bootstrapModule(AppModule);
