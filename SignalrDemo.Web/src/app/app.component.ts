import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  processing: boolean;

  constructor(public signalrService: SignalrService) { }

  ngOnInit(): void {
    this.signalrService.connection
      .invoke('Hello')
      .catch(error => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      }
    );
  }

  public processData(): void {
    this.processing = true;
    this.signalrService.progressPercentage = 0;
    this.signalrService.progressMessage = null;

    this.signalrService.connection
      .invoke('SimulateDataProcessing')
      .then(() => {
        this.processing = false;
      })
      .catch(error => {
        console.log(`SignalrDemoHub.SimulateDataProcessing() error: ${error}`);
        alert('SignalrDemoHub.SimulateDataProcessing() error!, see console for details.');
      }
    );
  }
}
