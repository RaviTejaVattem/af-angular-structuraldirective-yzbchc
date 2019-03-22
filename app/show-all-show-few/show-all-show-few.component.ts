import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-all-show-few',
  templateUrl: './show-all-show-few.component.html',
  styleUrls: ['./show-all-show-few.component.css']
})
export class ShowAllShowFewComponent {
  showAll: boolean = true;
  @Output() emitShow = new EventEmitter<boolean>();

  emitValue(event) {
    this.showAll = !this.showAll;
    this.emitShow.emit(this.showAll);
  }

}