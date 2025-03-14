import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { addIcons } from 'ionicons';
import { locationOutline, personOutline, logoWhatsapp, linkOutline, mailOutline, callOutline, trashOutline, addCircleOutline } from 'ionicons/icons';

addIcons({
  'location-outline': locationOutline,
  'person-outline': personOutline,
  'logo-whatsapp': logoWhatsapp,
  'link-outline': linkOutline,
  'mail-outline': mailOutline,
  'call-outline': callOutline,
  'trash-outline': trashOutline,
  'add-circle-outline': addCircleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
