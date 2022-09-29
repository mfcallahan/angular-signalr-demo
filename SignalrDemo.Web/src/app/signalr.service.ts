import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl: string;
  connection: any;
  hubHelloMessage: BehaviorSubject<string>;
  progressPercentage: BehaviorSubject<number>;
  progressMessage: BehaviorSubject<string>;

  constructor() {
    this.hubUrl = 'https://localhost:7199/signalrdemohub';
    this.hubHelloMessage = new BehaviorSubject<string>('');
    this.progressPercentage = new BehaviorSubject<number>(0);
    this.progressMessage = new BehaviorSubject<string>('');
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.setSignalrClientMethods();

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  private setSignalrClientMethods(): void {
    this.connection.on('DisplayMessage', (message: string) => {
      this.hubHelloMessage.next(message);
    });

    this.connection.on('UpdateProgressBar', (percentage: number) => {
      this.progressPercentage.next(percentage);
    });

    this.connection.on('DisplayProgressMessage', (message: string) => {
      this.progressMessage.next(message);
    });
  }
}
