import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, ContentChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import {SideComponent} from '../side/side.component';
@Component({
  selector: 'app-viewchildchildren',
  templateUrl: './viewchildchildren.component.html',
  styleUrls: ['./viewchildchildren.component.scss']
})
export class ViewchildchildrenComponent implements OnInit, AfterViewInit {
constructor() {
  // console.log("phone : " + this.myPhone.nativeElement.value )
 }
// phone ==> اسم الرفيرنس
// myPhone ==> الاسم اللى هستخدمة هنا
// HTMLInputElement ===> عشان دا انبت
@ViewChild('myinput', {static: true}) myPhone: ElementRef<HTMLInputElement>;
// {static:true}
// ngOnInit()عشان اشوف الفليو اللى فى الكمبونت لو مكتبتهاش الفليو مش هتظهر فى ال
// __________________________
// read:ElementRef ==> ElementRef عايزة اعملة اكسس ك
// ___________________________
 // عايز يبص على الكبوننت دى
// بتشوف الكبونت اللى فى التمبلت بتاعها بس
@ViewChild(SideComponent, {static: true, read: ElementRef}) side: SideComponent

@ViewChildren(SideComponent) childs: QueryList<SideComponent>;
logMessage(input) {alert(input) }

ngOnInit() {

  console.log('view child component', this.side);
  // console.log("view childs component",this.childs.toArray())
}
ngAfterViewInit() {
  console.log('view child component', this.side);
  console.log('view childs component', this.childs.toArray());
  for (const child of this.childs.toArray()){
    console.log(child);
  }
}
ngAfterViewChecked(){
  console.log('this.myPhone ', this.myPhone.nativeElement.value);

}



}
