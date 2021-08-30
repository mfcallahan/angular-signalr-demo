import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignalrService } from './signalr.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatProgressBarModule, NoopAnimationsModule],
  providers: [
    SignalrService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalrService) => () =>
        signalrService.initiateSignalrConnection(),
      deps: [SignalrService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
