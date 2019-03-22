import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5, 6];
  value = 4;

  someFunction(event, i) {
    console.log(event + " " + i);
  }

  constructor() {
    // setInterval(() => { this.value = this.count++; }, 3000);
  }
}
