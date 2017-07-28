import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CounterService } from '../core/counter/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {


  // @Output() click: EventEmitter<any> = new EventEmitter();
  @Input() count: number;

  constructor(private counterSerivce: CounterService) { }

  ngOnInit() {
    console.log('counter component initialised');



    // this.counterSerivce.getTodaysCount()
  }
}
