import { Component, OnInit } from '@angular/core';
import { AppComponent, student } from '../app.component';

interface Display{
  name:string
  age:number

  displayInfo():any
}

// هنعرض فية البيانات 
class X{

  constructor(display:Display){
    display.displayInfo() // لما يطبقها هيعدل البيانات الموجودة فى الكلاس
    console.log(display.name,display.age)
  }

}

class A implements Display{
  name='abdullah'
  age=25
  constructor(){
    /*
      A البيانات الموجودة فى الكلاس  X عشان ابعت للكلاس 
 Display من  implements وهو بيعمل A عايدة على الكلاس this ال
 منها implements بيعمل A بيستقبل من نفس نوع البيانات اللى الكلاس  X الكلاس 
 */
    new X (this) 
  }
  displayInfo(){
    this.age=24 //  24  ل  age هنا غير قيمة ال 
  }
}

class B implements Display{

  constructor(){
    new X (this)
  }
  name = 'osama';
  age = 25;

  displayInfo() {
 //fggg
  }


}

class C implements Display{ 
  name='ahmed'
  age=25
  constructor(){
    new X (this)
  }
  displayInfo(){
    //jkjk
  }
}

@Component({
  selector: 'app-polymorphism',
  templateUrl: './polymorphism.component.html',
  styleUrls: ['./polymorphism.component.scss']
})
export class PolymorphismComponent implements OnInit {
/*
polymorphism 
بيسهل كتابة الكود بحيث اننا منكررش الكود 
وبيوفر وقت
يعنى مثلا لو عندى 3 كلاس
C كلاس , B كلاس , A كلاس 
التلاتة كلاس فيهم ميثود مشتركة فبدل ما يكرر الميثود دى عند كل كلاس
وظيفتة ميخلنيش اكرر الكود وبيخلى فى مرونة اكتر x قال نعمل كلاس polymorphism فال 
بيحل دة polymorphism يعنى مثلا ممكن الميثود المشتركة دى تكون بتختلف فى حاجات فال 
 A داخل ال x بستدعى الكلاس A لما بقى عايزة  انفذ الفنكشن المشتركة الموجودة فى الكلاس 
 B داخل ال x بستدعى الكلاس B ولما بقى عايزة  انفذ الفنكشن المشتركة الموجودة فى الكلاس 
 C داخل ال x بستدعى الكلاس C ولما بقى عايزة  انفذ الفنكشن المشتركة الموجودة فى الكلاس 
*/
  constructor() { 
    new A()
    new B()
    new C()
  }

  ngOnInit() {
    const appObj=new AppComponent()
    /* 
         student  وليس  AppComponent هنا حط فى الفنكشن اوبجكيت من نوع 
    polymorphism ودا مفهموم ال student من implemenets بيعمل AppComponent ودة لاان ال 
    */
    this.atmLogin(appObj,"12333")
  }

  atmLogin(obj:student,password:string){
    console.log(obj.name)
  }

}
