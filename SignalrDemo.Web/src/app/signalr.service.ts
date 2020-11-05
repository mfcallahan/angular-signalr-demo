import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  hubProxy: any;
  hubHelloMessage: string;
  progressPercentage: number;
  progressMessage: string;

  constructor() { }

  // establish a connection to the SignalR server hub
  public initiateSignalrConnection(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44333/signalrdemohub') // the SignalR server url as set in the .NET Project properties and Startup class
        .build();

      this.setSignalrClientMethods();

      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
          resolve();
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
    });
  }

  // This method will implement the methods defined in the ISignalrDemoHub inteface in the SignalrDemo.Server .NET solution.
  private setSignalrClientMethods(): void {
    this.connection.on('DisplayMessage', (message: string) => {
      this.hubHelloMessage = message;
    });

    this.connection.on('UpdateProgressBar', (percentage: number) => {
      this.progressPercentage = percentage;
    });

    this.connection.on('DisplayProgressMessage', (message: string) => {
      this.progressMessage = message;
    });
  }
}
