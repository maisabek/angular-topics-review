import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent implements OnInit {
  color = 'green';
  name = 'angular';
  names: string[] = ['a', 'b', 'c'];
  colors = 'green';
  ctx = {color: 'blue'}
  currentItem:any
  constructor() {}
  ngOnInit() {}
  trackByFn(index) {
    return index;
  }

}
