import { Component, OnInit } from '@angular/core';

let courses=[]

// sayHello هينادى علية عند الفنكشن decorator دا
// اللى descriptorدى وبعد كدة ال member دى تبع انهى اوبجكيت وبعد كدة اسم ال member   اول حاجة ال

// export function makeChange(obj,prop,descriptor){
// console.log(descriptor.value)  // f sayHello(){console.log("hello")}
// //عشان يعدل على الفاليو بتاعة الفنكشن دى
// descriptor.value = () => {
//   console.log("hello decorator") // hello decorator
// }
// console.log(descriptor.value) // f sayHello(){console.log("hello decorator")}
// }

// function validation(obj,prop,descriptor){
// const originalFun=descriptor.value
// console.log(originalFun) //بتاع الفنكشن body هيطبع ال
// originalFun("php") //بدون ما يضغط على الزرار courses فى ال  php هيدخل ال
// descriptor.value = (course) => {
//   if(courses.includes(course)){
//     console.log("no change")
//   } else{
//     originalFun(course)
//   }
// }
// }
//للفنكشن دى return  دة  هحط الفنكشن دى جو فنكشن  واخليها تعمل decorator لو عايزة امرر فاليو لل
// function validation(config){
//   return  (obj,prop,descriptor)=>{
//     console.log(config)
//     const originalFun=descriptor.value
//     console.log(originalFun) //بتاع الفنكشن body هيطبع ال
//     originalFun("php") //بدون ما يضغط على الزرار courses فى ال  php هيدخل ال
//     descriptor.value = (course) => {
//       if(courses.includes(course)){
//         console.log("no change")
//       }else{
//         originalFun(course)
//       }
//     }
//     }
// }
@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.scss']
})
export class DecoratorComponent implements OnInit {
/*
decorator
ecmascript7 تم اصدارة فى ال
بيقوم بتعديل محتوى الاوبجكيت بطريقة دينامكية
نوعان
1- class decorator :
 بستخدمة لو هطبق على الكلاس وبياخد نفس نوع الكلاس
is typescript feature which allow you to enhance your classes,enhance elements

2- member decorator :
 بتاع الكلاس اللى هى الفنكشن وبياخد نفس نوع الفنكشن  member بستخدمة لو هطبق على ال
*/
  constructor(){}

  ngOnInit() {
    // this.sayHello()
  }
/*
decorator على الفنكشن دى فلازم اعرف فى ال  decorator عايزة اعمل
   حاجات 3
 اللى descriptorدى وبعد كدة ال member دى تبع انهى اوبجكيت وبعد كدة اسم ال member اول حاجة ال
 هو ال
 writable
 configurable
 enumerable
 value :  الفاليو الخاصة بالفنكشن يعنى الاوامر اللى جو الاقواس
 فممكن يعدل الفاليو بتاعة الفنكشن دى
 discriptor.value وعن طريق ال  decorator انة يجى داخل ال
*/
  // @makeChange
  // sayHello(){
  //   console.log("hello")
  // }



  // @validation
  // addCourses(course){
  //   courses.push(course)
  //   console.log(courses)
  // }

  // @validation({
  //   name:"jj",
  //   age:25
  // })
  // addCourses(course){
  //   courses.push(course)
  //   console.log(courses)
  // }

}


// decorator ==> ضيفين ديكرتور للكلاس عشان يضيف علية فهو بيضيف على الكونستركتور
function age(constructor: Function) {
  console.log('in decorator in ', constructor);
  constructor.prototype.age = 26;
  }
  @age
  class greeting {

  constructor() {}

  sayHello(){

  }
  }
  const myobj1=new greeting()
  // ______________________
  function classDecrotator<T extends {new (...args: any[])}>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  }
  }
  console.clear()
  @classDecrotator
  class Greeting {
    property = 'property';
    hello: string;
    constructor(m: string) {
      this.hello = m;
    }
  }
  console.log(new Greeting('world'));
  const myobj=new Greeting('world')
  console.log("myobj",myobj.property)
  // ____________________
  function Student(config: any) { // decorator factory
    return function(target: any) {    // decorator
      console.log(config, target);
      Object.defineProperty(target.prototype, 'course', {
        value: () => config.course
      });
    };
  }
  @Student({
    course: `Angular 9`
  })
  class person {}
  console.log(new person());

