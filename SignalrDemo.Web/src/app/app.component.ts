import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hubHelloMessage: Subject<string>;

  constructor(public signalrService: SignalrService) { }

  ngOnInit(): void {
    this.signalrService.connection
      .invoke('Hello')
      .catch(error => {
        console.log(`SignalrDemoHub.Hello() error: ${error}`);
        alert('SignalrDemoHub.Hello() error!, see console for details.');
      });
  }
}
