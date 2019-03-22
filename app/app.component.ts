import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5, 6];
  value = 4;

  someFunction(event, i) {
    console.log(event + " " + i);
  }

  constructor() {

  }
}
