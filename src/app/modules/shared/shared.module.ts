import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // عشان اسمح للكمبونت دى ان انادى عليها برة لانها متشافها هنا بس احطها فى الاكس بورتس
  exports: []
})
export class SharedModule {}
