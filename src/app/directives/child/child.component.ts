import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  // @Input() parentTemplate: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
