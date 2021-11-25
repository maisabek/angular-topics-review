import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  constructor() {}
  age;
 item: any
 title: any = {id: 1}
 data:string
  ngOnInit() {}
 log(event: KeyboardEvent) {
   console.log(event)
 }
 anotherlog() {
   console.log('in another log');
  }

}
