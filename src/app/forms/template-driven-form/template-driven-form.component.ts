import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss']
})
export class TemplateDrivenFormComponent implements OnInit {
  @ViewChild('buildForm', {static: true}) myform;
  constructor() { }

  ngOnInit() {}
  onSubmit(formValue) {
    console.log('formValue', formValue);
    setTimeout(() => {
        this.myform.reset();
      }, 2000);
  }
}
