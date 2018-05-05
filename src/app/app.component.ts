import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  TESTValue = 50;
  MyZones = [
    { value: 50, color: 'yellow' },
    { value: 90, color: 'blue' },
  ];

  changeValue() {
    this.TESTValue = Math.floor(Math.random() * 100);
  }
}
