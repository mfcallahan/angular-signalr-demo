import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl: string;
  connection: any;

  constructor() {
    this.hubUrl = 'https://localhost:7199/signalrdemohub';
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      this.connection.start().then(() => {
        console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
      }).catch((err: any) => {
          return console.error(err.toString());
      });

      await this.connection.start();


    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }
}
