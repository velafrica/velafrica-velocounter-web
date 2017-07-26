import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {


  // @Output() click: EventEmitter<any> = new EventEmitter();
  @Input() count: number;

  constructor() { }

  ngOnInit() {
  }
}
