/*
transpulation
عملية التحويل من لغة برمجة للغة برمجة تانية
______________________________
typescript
open source programming language
هى مجموعة كبيرة من الجافا اسكربت
البروزر مش عارف التايب اسكربت فاى كود تايب اسكربت بيتحول للجافا اسكربت
الانجلر مبنية على التايب اسكربت
typescript static with oop
javascript dynamic
عشان يحول من تايب اسكربت للجافا اسكربت عن طريق الامر
tsc filename.ts
tsc -w filename.ts
______________
الفرق بين الجافا اسكربت وبين التايب اسكربت ؟؟
لذالك تم انشاء التايب اسكربت syntaxs الجافا اسكربت فيها بعض العيوب فى ال
لتحل هذة المشاكل كما انة تم اضافة مزايا لتحل هذة العيوب
التايب اسكربت هى الجافا اسكربت لكن التايب اسكربت مطورة على الجافا اسكربت
مثال فى المتغيرات لازم فى التايب اسكربت ادى نوع للمتغير
var اما فى الجافا اسكربت عن طريق ال
يعنى اقدر اغير فى نوع المتغير losely typed language يعنى الجافا اسكربت
يعى مثلا ممكن اكتب
var x=10
وسطر تانى اكتب
x="aaa"
يبقى كدة غير فى الداتا تايب بتاع المتغير
لكن فى المقابل بتذود احتمالية ايرور كتير flexable دى بتخلى الجافا اسكربت سهلة و
للفنكشن دى هقدر ابصيلها اى متغير من اى نوع داتا تايب call يعنى زى لو عندى فنكشن وبديها متغير فى الجافا اسكربت لما اعمل
اما فى التايب اسكربت لازم متغير من نفس نوع الداتا اللى مبصهلها
feature و بعض ال subInterfaces و interfaces والتايب اسكربت زودت
يعنى التايب اسكربت عبارة عن  فرجن من الايكما اسكربت 6  زيادة عليها الفيتشر الجديدة

TypesScript is known as Object oriented programming language
ودا هيوفر تنظيم الكود وتقليل الكود وتوفير الجهد
 inheratance,interface , class يعنى فيها
whereas JavaScript is a scripting language

TypeScript gives support for modules whereas JavaScript does not support modules.
TypeScript has Interface but JavaScript does not have Interface.
TypeScript has a feature known as Static typing but JavaScript does not have this feature.
Static typing is allows for checking type correctness at compile time. This is not available in
JavaScript.
___________________
typescript لية استخدم
فالكود بيكون عشوائى فالصعب احدد الايرور واعمل اى تعديل عليةobject orianted programming لان الجافا اسكربت مش شغالة
من الصعب انشاء مشروع كبير من خلال الجافا اسكربت وادخال تعديلات علية
واجراء صيانة لة
 فى الجافا اسكربت compile-time error عدم القدرة على تحديد الاخطاء التى تظهر اثناء التشغيل
___________________
خصائص التايب اسكربت
ممكن اكتب كود جافا اسكربت فى ملف التايب اسكربت
من الجافا اسكربت superset يعنى التايب اسكربت هى
 ممكن استخدام مكتبات الجافا اسكربت مع لغة التايب اسكربت

 ____________________
عيوب التايب اسكربت ؟
TypeScript takes time to compile the code.
بتاخد وقت اطول فى الرن لان البروزر مش بيفهم تايب اسكربت فبيحولها لجافا اسكربت
compile the code by cli
*/
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.scss']
})
export class TypescriptComponent implements OnInit {
 constructor() {
  //  this.addition.push('jj')

  /*
  enum
  ليها علاقة ببعض فدلوقتى اقدر constant  مجموعة من ال
  read only كل القيم دى ك access
  */

  enum operation {
    add= 1,
    sub= 2,
    div= 3,
    mul= 4
  }
  if (this.y === operation.add) {console.log('add'); }
  if (this.y === operation.sub) {console.log('sub'); }
  if (this.y === operation.div) {console.log('div'); }
  /*________________________________________________________*/
 /*
  generic
 نوع من انواع التعامل مع الداتا
 تمكنا من تعريف انواع جديدة من الداتا للتعامل معاها
*/
  function todo<T>(x: T) {
  console.log(x)
}
// وممكن استخدمها مع الكلاس
  class op<N, K> {
constructor(x: N, y: K) {}
}
  // let Op: op<string, number> = new op('nnn', 88);
  // const Op: op<number, number> = new op(99, 88);
  todo<string>('true');
/*________________________________________________________*/
// commandline as a function expression
  const options = {
  program: 'test1',
  commandline: () => '**Hello World**'
}
  const fn: any = options.commandline;
  console.log(fn())
  }
     set SetHeight(height: any) {
        this.height = height;
      }
      get GetHeight() {
        return this.height;
      }
  // دول بيسموا immutable
 name: string;
 age: number;
 married: boolean;
 y: any = 1;
// mutable
 addition: any[];
// Union Type Variable
// يعنى الاكس ممكن اديها نمبر او استرنج
 x: number|string
/*____________________________________________________________*/
  userinfo = {
    name: 'hussein',
    age: 28
   };
/*________________________________________________________*/
  /*
   The Function Constructor
   TypeScript also supports defining a function with
   the built-in JavaScript constructor called Function()
  */
   myFunction = new Function('a', 'b', 'return a * b');
  /*________________________________________________________*/
      height: any;
/*________________________________________________________*/
/*
   spread operator , Rest Parameters
  تلاتة دوت معناها ابصى للفنكشن اى عدد من المتغيرات بتكون
   more flexable فى التعامل مع البيانات
*/
  sum(...value) {
    let sum = 0
    for (const n of value) {
      sum += n
    }
    return sum
  }
  /*________________________________________________________*/

  /*
   let , var , const

   const ==> block scope
   _____
   let ==> block scope
    لو معرفة متغير جوة اسكوب وندات على المتغير دة برة الاسكوب دى
    هيدنى ايرور لانة متعرف  داخل الاسكوب دة بس
   _____
    var ==> function scope
    لو معرفة متغير جوة اسكوب اقدر انادى علية برة الاسكوب وهيطبع الاوت بوت
    A variable, by definition, is “a named space in the memory” that stores values

  */
   differenceBetweenLetAndVar() {
      var age = 20;
      if (age === 20) {
        var age=2
        console.log(age)
      const msg = 'bbbbbbbbb';
      const n = 'kkk';
    }
    console.log(age)
      // console.log(msg);
    // console.log(n);
   }
  /*________________________________________________________*/
    defferenceBetweenOfAndOn() {
      // loops
     const jobs = ['developer', 'admin'];
     // الفرق بين of,in
     for (const job of jobs) {console.log(job); }
     for (const job in jobs) {console.log(jobs[job]); }
    }
   passingObjectToFunction(userinfo) {
     console.log(`${userinfo.name}`);
    }
  /*________________________________________________________*/
   // Destructing
   Destructing() {
    const info = {
      id: 1,
      username: 'alex',
      password: '12344'
    };
    // username:fullName هيخزن اليوزر نام فى المتغير فول نام
    const {id, username: fullName, password} = info
    // دى بدل
    // const id = info.id;
    // const username = info.username;
    // const password = info.password;
    let a = 5;
    let b = 10;
    /*
   aفى ال b هيخزن قيمة ال
   b فى ال a وال
    */
    [a, b] = [b, a];

    const ar = ['hussein', 'developer'];
    const [name, age] = ar;
    // دى معنها
    // name=hussein , age=developer
  }
  /*________________________________________________________*/
 // number
   print() {
  console.log('TypeScript Number');
  console.log('Maximum value that a number variable can hold: ' + Number.MAX_VALUE);
  console.log('The least value that a number variable can hold: ' + Number.MIN_VALUE);
  console.log('Value of Negative Infinity: ' + Number.NEGATIVE_INFINITY);
  console.log('Value of Negative Infinity:' + Number.POSITIVE_INFINITY);
  }
  /*________________________________________________________*/
  /*
  Default Parameters
  الديفلت برمتر هنا ال
  rate:number = 0.50
  فعادى مش يبصية للفنكشن وهو بيعملها كول
  */
  calculate_discount(price: number, rate: number = 0.50) {
    const discount = price * rate;
    console.log('Discount Amount: ', discount);
 }
 /*________________________________________________________*/
      // Optional Parameters
      disp_details(id: number, name: string, mail_id?: string) {
        console.log('ID:', id)
        console.log('Name', name);
        if (mail_id != undefined) {
        console.log('Email Id', mail_id)
        }
      }
  /*________________________________________________________*/
   // Optional parentheses for a single parameter
   display = x => { console.log('The function got ' + x ); }
  /*________________________________________________________*/
  usingarrowFunction() {
    const  c = document.getElementById('')
    // Lambda   ()=>
    // استخدمها بدل كلمة
    // function()
    // anonymous function expression that points to a single line of code
    c.addEventListener('click', () => {})
  }
  foo = (x: number) => {
    x = 10 + x
    console.log(x);
   }
  /*________________________________________________________*/
  // Anonymous function with parameters
     res = function(a: number, b: number) {
    return a * b
    };
  /*________________________________________________________*/
       // Recursion
     factorial(number: any){
       if (number <= 0) { // termination case
          return 1
       } else {
       return (number * this.factorial(number - 1)); // function invokes itself
       }
    }

    exponent(a: any, n: any){
      if (n === 0) {return 1;} else {
      return a * this.exponent(a, n - 1);
       }
    }

  ngOnInit() {
    console.log('addition : ', this.addition);
    console.log('sum: ', this.sum(2, 3, 5));
    console.log('differenceBetweenLetAndVar : ', this.differenceBetweenLetAndVar());
    console.log('defferenceBetweenOfAndOn : ', this.defferenceBetweenOfAndOn());
    console.log('passingObjectToFunction : ', this.passingObjectToFunction({name: 'kk', age: 34}));
    console.log('Destructing : ', this.Destructing());
    console.log('print : ', this.print());
    console.log('calculate_discount : ', this.calculate_discount(1000));
    console.log('calculate_discount : ', this.calculate_discount(1000, 0.30));
    console.log('display : ', this.display(6));
    console.log('res : ', this.res(5, 7));
    console.log('factorial : ', this.factorial(7));
    console.log('exponent : ', this.exponent(7, 6));
    console.log('disp_details : ', this.disp_details(1, 'gg'));
    console.log('myFunction : ', this.myFunction(4, 3));
  }
}

/*
لية عملوا الموديل؟؟
لان لو انا عندى كذا اسكربت معتمد على حاجة
فلو لغبطت فى الترتيب دة هيحصل مشكلة زى فى الجاكورى بكتب الاسكربت بتاع الجاكورى
وبعد كدة الكود فلو لغبطت ما بنهم هيحصل مشكلة
لو عندى كذا ملف وكل ملف معتمد على التانى وحد تانى شغال معايا وعامل مجموعة ملفات ماشية بترتيب معين
فهو عامل مجموعة ملفات ماشية بترتيب معين والحد التانى عامل مجموعة ملفات ماشية بترتيب معين
imports اللى هو موديل يعمل فية entry point فكدا هيحصل مشكلة فعملوا
عشان البروزر يقدر يفهمها typed module للملفات التانية وبعد كدة لازم اقولة انة من
______________________
Internal Module
This was used to logically group classes,
interfaces, functions into one unit and can be exported in another module.
namespace عن طريق كلمة
{} وبعدها اسم الموديل وبعدها
ودى اللى  قبل كدة دلوقتى بيستخدم كلمة موديل بدل كلمة
namespace
*/

namespace TutorialPoint{
 export function add(x, y) {
    console.log(x + y);
 }
}

/*
To access the class or interface in another namespace,
the syntax will be namespaceName.className
*/
namespace TutorialPoint{
  export function addx(x, y) { console.log(x + y); }
}
// You can define one namespace inside another namespace
namespace namespace_name1 {
  export namespace namespace_name2 {
  export class class_name {}
}
}
/*
External Module
each file is considered as a module The syntax for
declaring an external module is using keyword ‘export’ and ‘import’
_________
all نادى كل اللى موجود فى المسار دة بالاسم دة
import * as all from './app.js';
واما اجى انادى على الحاجات اللى جو المسار يبقى
all.اسم الحاجة
__________
واحد بس default export لية module كل
default export اعملها من غير الاقواس يعنى اسم الحاجة اللى مكتوب قبلها import ولما اجى اعملها
من غير اقواس ومش شرط اكتب اسم الحاجة بالظبط
 import sayHello from './app'
 sayHello ==> default export كدة دى واخدة
*/
/*___________________________________________*/
/*
 abstract class
  مقدرش اخد منة اوبجكيت
طب بعمل الكلاس دة لية ؟؟؟؟؟
extends لان المفروض الكلاس دة معمولة
للكلاس تانى فبالتالى اللى فالكلاس التانى يقدر يعملها
 اكسس يعنى هو بيخدم كلاس تانى فقط
 وفى حالة ان عندى كلاس مهم مش عايزة اى حد يقدر يعمل منة اوبجكيت
 */
 abstract class creadit{
  private creaditID:number;
  private pass:number;
  constructor(creaditID:number, pass:number){
      this.creaditID=creaditID;
      this.pass=pass;
  }
  public showCreaditID(){
      console.log("the creadit id is "+this.creaditID);
  }
  public getPassOfCreadit() : number  {
       return this.pass;
  }
 }

export  class employ extends creadit{
  public fullName:string;
  public age:number;
  constructor(fullName:string, age:number){
      super(123456789,123321);
      this.fullName=fullName;
      this.age=age
  }
}

/*
override
child واحدة فى ال parent لو عندى اتنان فنكشن بنفس الاسم واحدة فى ال
child هينفذ اللى موجودة فى ال
 عن طريق  parent لو عايزة انادى على اللى وجودة فى ال
super.اسم الفنكشن
*/
abstract class creadit2{
  private creaditID:number;
  private pass:number;
  constructor(creaditID:number, pass:number){
      this.creaditID=creaditID;
      this.pass=pass;
  }

  public showinfo(){
      console.log("the creadit id is "+this.creaditID);
  }

 }


export  class employ2 extends creadit2{

  public fullName:string;
  public age:number;

  constructor(fullName:string, age:number){
      super(123456789,123321);
      this.fullName=fullName;
      this.age=age;

  }
  public showinfo(){
    super.showinfo() // parent عشان انادى على اللى موجودة فى ال
    console.log("showinfo in child ");
}
}

/*

concrete class
 كلاس اقدر اخد اوبجكيت منة
________________
abstract method
declration فى abstract بكتب كلمة

public abstract void moveTo(String dis);
 ليها قاعدتين
body ملهاش abstract method ان ال
والقاعدة التانية
abstract class لازم تكون بداخل
____
فايدتها
implementation بيخلى الكلاس اللى وارث منة هو اللى يعملها
inheratence لازم لما اعمل
super() اكتب فى  الكونستركتور بتاع الصب كلاس
parent  وبصيلة البرمتر الموجودة فى ال
__________________
interface
بتخلى الكود اكثر تنظيم
abstract ولازم تكون body الفنكشن فية ملهاش
public abstract وعادى مكتبش
by default لانها مكتوبة
_________________
extends لما يبقى كلاس بيورث كلاس بنكتب
implements بنكتب interface ولما كلاس بيورث
بياخد كل الميثود الموجودة فى الانترفيس ويعمل
implementation
للميثود دى
abstract وبيختلف عن ال
_____________________
defference between interface and abstract class ?
interface ==>
1- members of interface are public
2- interface implemented using keywords 'implements'
3- interface can extend  another interface onley
4- implementation ومينفعش يعملها abstract الميثود لازم تكون
5- interface does't contain constructor
6- variables static
__
abstract class ==>
1- members of abstract class are public , private , protected
2- abstract class extended using keywords 'extend'
3- abstract class can extend  another class and implement multiple interfaces
4- implementation يعنى يبقى فى مبثود اقدر اعملها  abstract  الميثود مش شرط تكون
5- abstract class contain constructor
6- variables static and non static
_______________________________
defference between class and struct ?
struct ==>
1- inheritance not supported
2- no destructor
3-  public بيكون default ال access modifer لو مفيش
4- instance of structure is a structure variable
5- new لما بعمل اوبجكيت مش بستخدم
6- abstract مينفعش يكون
7- have only parameterized constructor
___
class ==>
1- inheritance supported from class and structure
2-can have destructor
3-  private بيكون default ال access modifer لو مفيش
4- instance of class is an object
5- new لما بعمل اوبجكيت بستخدم
6- abstract ممكن يكون
7- have all types of constructor

*/
abstract class creadit3 {

  private creaditID:number;
  private pass:number;
  constructor(creaditID:number, pass:number){
      this.creaditID=creaditID;
      this.pass=pass;
  }

  public getCreaditID():number{
      return this.creaditID;
  }

  public getPassOfCreadit() :number  {
       return this.pass;
  }

}

interface creditOp{

  machine:any;

  loginCredit(pass:number);
}

export  class employ3 extends creadit3 implements creditOp {
  machine: any;
  public fullName:string;
  public age:number;

  constructor(fullName:string, age:number , creaditID:number, pass:number){
      super(creaditID,pass); //parent بينادى على الكونستركتور بتاع ال
      this.fullName=fullName;
      this.age=age;
      this.machine="speed etm";
  }

  loginCredit(pass: number) {
     if(pass == this.getPassOfCreadit()){

          console.log(this.fullName + " successfully login ");
          console.log( "your creadit is " + this.getCreaditID());

     }else console.log("roooooong pass");
  }
}

interface IPerson {
  firstName: string;
  lastName: string;
  sayHi: () => string;
}
const customer: IPerson = {
  firstName: 'Tom',
  lastName: 'Hanks',
  sayHi: (): string => 'Hi there'
};
/*_________________________________________________ */

// Simple Interface Inheritance
interface Person {
  age: number;
}
interface Musician extends Person {
  instrument: string;
}
const drummer = {} as Musician;
drummer.age = 27;
drummer.instrument = 'Drums';

/*_________________________________________________ */

// Multiple Interface Inheritance
interface IParent1 {
  v1: number;
}
interface IParent2 {
  v2: number;
}

interface Child extends IParent1, IParent2 { }
const Iobj: Child = { v1: 12, v2: 23};
/* _______________________________________________ */

/*
protected =>
متشاف على مستوى الكلاس اللى هو فية والكلاس اللى عامل وراثة منة
ومقدرش اوصلة داخل الاوبجكيت اللى انا واخداة من كلاس
________________
constructor ==> build in method each typeScript class has which is called once this
component is created
*/

