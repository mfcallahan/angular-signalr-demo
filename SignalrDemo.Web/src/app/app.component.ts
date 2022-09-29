import { Component, OnInit } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hubHelloMessage: string;
  progressPercentage: number;
  progressMessage: string;
  processing: boolean;

  constructor(public signalrService: SignalrService) {
    this.hubHelloMessage = '';
    this.progressPercentage = 0;
    this.progressMessage = '';
    this.processing = false;
  }

  public processData(): void {
    this.processing = true;
    this.progressPercentage = 0;
    this.progressMessage = '';

    this.signalrService.connection
      .invoke('SimulateDataProcessing')
      .then(() => {
        this.processing = false;
      })
      .catch((error: any) => {
        console.log(`SignalrDemoHub.SimulateDataProcessing() error: ${error}`);
        alert('SignalrDemoHub.SimulateDataProcessing() error!, see console for details.');
      }
    );
  }

  ngOnInit(): void {
    this.signalrService.hubHelloMessage.subscribe((hubHelloMessage: string) => {
      this.hubHelloMessage = hubHelloMessage;
    });

    this.signalrService.progressPercentage.subscribe((progressPercentage: number) => {
      this.progressPercentage = progressPercentage;
    });

    this.signalrService.progressMessage.subscribe((progressMessage: string) => {
      this.progressMessage = progressMessage;
    });

    this.signalrService.connection
      .invoke('Hello')
      .catch((error: any) => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      }
    );
  }
}
