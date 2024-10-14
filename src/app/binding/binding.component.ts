import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.scss']
})
/*
 node.js
 دى انفيرومنت معمولة للجافا اسكربت بتسمح للجافا اسكربت انها تشتغل باك اند
  node.js ==> جوها ال npm
  ودى بتخلى الانجلر  تقدر تعمل انكلود لاى حااجة من برة
______________________________________
 rxjs
 مكتبة معمولة بالجافا اسكربت وظيفتها بتعمل هاندل لاى اتنان اسنكنورنس ركوست بين اتنين ابلكشن
 اسنكنورس ركوست يعنى غير متزامن مش عاارفة هيبدء امتى وينتهى امتى
 _________________________________
 observable
 rxjs كلاس موجود جوة ال
subscripe الكلاس دة موجودة جواة فنكشن اسمها
http request الفنكشن دى وظيفتها انها تعمل ادراك لاى تغير او ابدات يحصل لل
 channel او socket الفنكشن دى بتفتح
 عشاان اى تغير يحصل يسمع عندى
*/
export class BindingComponent implements OnInit{
  content=null
  num:any=4
  constructor(inject:Injector,domSanitizer:DomSanitizer) {
    // const ReceiveElement=createCustomElement(ReceiveComponent,{injector:inject})
    // customElements.define('my-receive',ReceiveElement)
    setTimeout(() => {
      //<p>paragraph</p>
      this.content=domSanitizer.bypassSecurityTrustHtml("<my-receive  message='Use Angular!'></receive>")
    }, 3000);

  }
  dummy=InputComponent
  fname: any;
  data:any
  actionName:any='property binding'
  siteurl: any = window.location.href
  imgUrl = 'assets/images/9.jpg';
  successVarable = 'success';
  allow=false
  flag = false
  clickMessage:any
   messageclass: any = {
    success: this.flag,
    successStyle: !this.flag
  };
 styleVariable = 'yellow';
 titleStyle: any = {
    color: 'gray',
   fontStyle: 'italic'
  };
  greet = '';
  ngOnInit() {
    // global api بيبقى فية اى داتا بتبعت
    console.log('global api', history.state)
    console.log('global api', history.state.data)
  }
  greetHello() {return 'hello'; }
  onClick() {alert('nn');}
  greeting(e) {this.greet = e.type; alert(this.greet); }
  logMessage(inputt) {alert(inputt);}

  serverName=''
  onUpdateServerName(event:Event){
    // explicit casting
   this.serverName=(<HTMLInputElement>event.target).value
  }
}
