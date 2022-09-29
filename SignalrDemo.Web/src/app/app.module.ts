import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignalrService } from './signalr.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SignalrService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalrService) => () => signalrService.initiateSignalrConnection(),
      deps: [SignalrService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
