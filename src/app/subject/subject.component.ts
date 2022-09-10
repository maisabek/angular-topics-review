import { Component, OnInit } from '@angular/core';
import {asyncScheduler, AsyncSubject, BehaviorSubject, ConnectableObservable, EMPTY, from, fromEvent, interval, NEVER, of, pipe, ReplaySubject, Subject, Subscription} from 'rxjs'
import { multicast, refCount, switchMap, take,tap, throttleTime,map, catchError, retry, retryWhen, delay, scan, pluck, auditTime } from 'rxjs/operators';
import {SharedService} from '../../app/shared/shared.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
     /*
     subject ==> (Like EventEmitter)
     is an object you can subscribe to put it's more active because you can activaly call
     next on it from outside
     you only use subject to communicate accross components,through services so through
     a machanism where you in the end subscribe to somewhere
     فى نفس الوقت observer و observable هو
     واستقبل الداتا observer واحط ال subscribe يعنى اقدر اعمل علية observable
     يعنى اقدر اشيلة داتا next(),error(),complete() يعنى اقدر استخدمة كاوبجكيت واستخدم ال observer
     بقدر اعمل صب اسكريب  من قبل ما ابعت داتا
     Multicasting شغال subject ال
     Unicasting شغال observable اما ال
     __________________________________
     Multicasting ==>
    فانا بيكون عندى زى اراى بسجل فية list بتسجلة فى observer مش بتشغلة ال  invoke علية مش بتعملة subscribe  لما بتعمل subject ال
    على داتا بالترتيب بتعهم listen  يعملوا subscribe تبدء ال  exection يتعملها subject لما  observer ال
    لوحدة بيمشى معاهم فى التراك اللى فات فات واللى جاى جاى exection دخل متأخر ميعملش observer ال
     _________________________________
     Unicasting ==>
    واشتغل عليها observable اللى جوها خد نسخة من ال observer ال subscribe كل نسخة
    */
  constructor(private SharedService:SharedService) {}
  ngOnInit() {
    // const obs$=of(1,2,3) // observable دا
    const obs$=interval(1000).pipe(take(3)) // هيجيب اول 3 قيم
    // هيتنفذ مرتين observable هنا ال
    obs$.subscribe(x => {
      console.log('in first sub',x)
    })
    setTimeout(()=> {
      obs$.subscribe(x =>{
        console.log('in second sub',x)
      })
    },2000)
    //______________________________________________
    this.SharedService.activatedEmitter.subscribe((res)=>{ // subject like EventEmitter
     console.log("res = ",res)
    })
    const mySubject=new Subject<number>()
    // بتاعى داتا Subject  عشان اشيل ال  tap استخدم ال
    const obs2=interval(1000).pipe(tap(x=>mySubject.next(x)),take(3))
    obs2.subscribe()
    mySubject.subscribe(x =>{
      console.log('in first subject sub',x)
    })
    setTimeout(()=>{
      mySubject.subscribe(x =>{
        console.log('in second subject sub',x)
      })
    },2000)
    /* observable ممكن نستخدمة ك subject عايز يثبت ان ال*/
   const mySubject1=new Subject<number>()
    mySubject1.subscribe(r=>{
    //Subject فى اراى خاصة بال observerبتسجل ال Subject مش بتشغل ال subscribe ال
     console.log('in observer 1',r)
    })

    mySubject1.subscribe(r=>{
      console.log('in observer 2',r)
    })

    /*
    ؟ multicast ل unicast عشان نحول من
       observer ك Subject استخدم ال
       multicast ل unicast وحولنا من
    */
    const obs5=of(1,2,3)
    obs5.subscribe(mySubject1)

  //؟ multicast الى unicast ازاى احول من
  const source=of(1,2,3)
  // console.log("source",typeof(source)) // object
  const mySubject3 = new Subject<number>()
  /*
   multicast هيطبق علية نظرية ال observable عشان شايل  unicast  اللى هو source ال
   connect عادى بس بيستخدم ميثود اسمها observable يعنى دة بيرجع <== ConnectableObservable
   بتحدد امتى هتشتغل source اللى هو هنا ال shared observable هى اللى بتحدد ال connect الميثود
    observable على ال subscribe يعنى كأنى عملت  source.subscribe(mySubject3) بتعادل connect يعنى الميثود
    unsubscribe ولازم ارجع اعمل

   obs5.subscribe(mySubject1) يعنى بتعادل دى multicast ل unicast ودى كلة توضيح ازاى بنحول من
   */
  const multicasted=source.pipe(multicast(mySubject3),refCount()) as ConnectableObservable<number>

  multicasted.subscribe(x => {
      console.log('in observer x',x)
  })

  multicasted.subscribe(y => {
    console.log('in observer y',y)
  })

  /*
  refCount() ==> shared observable لل subscribe  بيعمل
  لوحدة unsubscribe وبيعمل هنا pipe جو ال  refCount() يعمل  connect ممكن بدل ما يعمل
 */
  // multicasted.connect()
  /*
   Subject
   مش بيشوفها subscribe اللى بتيجى قبل ما يعمل next ال
   subscribe اللى بعد ال next بيشوف  كل ال
  */
    const mySubject4=new Subject()
    mySubject4.next(1)
    mySubject4.subscribe(x => { // اللى فى الاول مش هيحس بية next هيعرض ال 2و3 وال
      console.log("x1",x)
    })
    mySubject4.next(2)
    mySubject4.subscribe(x => {
      console.log("x2",x) // 3
    })
    mySubject4.next(3)
    /*
    BehaviorSubject
    لية ميزتان اساسيتين
    initial value انى ببعت معاة
    last value لاحدث فاليو يعنى بيعمل ابدات لل store وبيعمل

    subscribe عند اول
    subscribe قبل ال next بيبدء من عند اخر
    */
    const mySubject5=new BehaviorSubject(0)
    mySubject5.subscribe(x => {
      console.log("y1",x) // 0,1,2,3
    })
    mySubject5.next(1)
    mySubject5.subscribe(x => {
      console.log("y2",x) // 1,2,3
    })
    mySubject5.next(2)
    mySubject5.subscribe(y =>{
      console.log("y3",y) // 2,3
    })
    mySubject5.next(3)

    //________________

    mySubject5.next(1)
    mySubject5.next(2)
    mySubject5.subscribe(y =>{
      console.log("y1",y) // 2,3 ==> subscribe قبل next بدء من عند اخر
    })
    mySubject5.next(3)
    mySubject5.subscribe(x =>{
      console.log("y2",x) // 3 ==> 3 دة اللى قبلة كان واقف عند 3 فيدء دة من عند subscribe لما دخل ال
    })
   /*
   ReplaySubject ==>  بس عندة ميمورى BehaviorSubject شبة ال
   اللى قبلها next من ال ReplaySubject تاخد اد العدد اللى انا ببصتة لل subscribe يعنى ال
  subscribe قبل ال next وهنا لو بصيت زيرو زى ما بصيت واحد بتاخد اخر
   */
   const mySubject6=new ReplaySubject(2) // يعنى الميمورى شايلة 2
   mySubject6.subscribe(x =>{
     console.log("z1",x) // 1,2,3,4,5
   })
   mySubject6.next(1)
   mySubject6.subscribe(x => {
     console.log("z2",x) // 1,2,3,4,5
   })
   mySubject6.next(2)
   mySubject6.next(3)
   mySubject6.subscribe(y =>{
    // هيعرض 2,3,4,5 عشان الميمورى فيها 2 فخد 2و3 لو زيرو او واحد هياخد 3 بس
     console.log("z3",y)
   })
   mySubject6.next(4)
   mySubject6.next(5)
   mySubject6.subscribe(y =>{
    console.log("z4",y) // 4,5
  })

  /*
  AsyncSubject ==>
    لاخر قيمة بس modify بيعمل complete بيشتغل لما يحصل
  */

    const mySubject7=new AsyncSubject()
    mySubject7.subscribe(x =>{
     console.log("h1",x) // 3 ==> علطول complete اخد الانكست اللى قبل
   })

   mySubject7.next(1)
   mySubject7.next(2)
   mySubject7.next(3)

   mySubject7.subscribe(x =>{
     console.log("h2",x) // 3
   })

   mySubject7.complete()
   mySubject7.next(4)

/*
throttleTime
 اى داتا تانية ignore دة بيشتغل بيعمل timer ال timer وجواة observable بيستقبل داتا خارجة من
لمدة معينة
هينفذ وبعد كدة يتجاهل المدة اللى ادتهالوة وبعد كدة ينفذ وبعد كدة يتجاهل وهكذا
_______
fromEvent
فى نفس الوقت addEventListener , removeEventListener عيارة عن
*/
const click=fromEvent(document,'click')
const result=click.pipe(throttleTime(3000))
/*
  كل ما اضغط على اى مكان فى الصفحة يطبع كلك ويتجاهل الكلك 3 ثوانى وبعد كدة ينفذ الكلك وهكذا
   asyncScheduler,throttleTimeConfig ودا فى حالة انى مش ضيفة دول
   ولما اضيف دول يعد 3 ثوانى يشغل
*/
result.subscribe(()=>{
  console.log('dbl clicked 1')
})
/*
بيعمل هاندل setTimeout ودا عبارة عن schedular اللى هو argument تانى
clearTimeout وال setTimeout اللى دخلة  يعنى لو دخلة كذا كلك بيهندل ال taskes لل
ازاى التاسكات تشتغل مع بعضها
___________
الديفلت بتاعها بتعرض اول داتا configuraion اللى هو ال argument تالت
للباقى دا الديفلت بتاعها ignore وبتعمل
leading ==> اول داتا هتدخل
trailling ==> اخر داتا طالعة
const throttleTimeConfig={
  leading:true,
  trailling:false
}
throttleTimeConfig ولو عايزة اغير بغير فى الاوبجكيت دة
leading , trailling فى القيم دى
*/
// لو عايزة اعرض اخر داتا
const throttleTimeConfig={
  leading:false, // اول داتا هتدخل
  trailling:true // اخر داتا طالعة
}
//هيشتغل تلت ثوانى وبعدها هيطبع اخر كلك timer وبعدها ال false ب leading اول كلك هيحصل مش هيحس بية لأن واخد
const result2=click.pipe(throttleTime(3000,asyncScheduler,throttleTimeConfig))
result2.subscribe(()=>{
  console.log('dbl clicked 2')
})

const result3=click.pipe(map(()=>{
  console.log("clicked")
}),throttleTime(3000,asyncScheduler,throttleTimeConfig))

result3.subscribe(()=>{
  console.log('dbl clicked 2')
})

/*
swichMap
شغال ولما بعمل سيوتش لواحد تانى بيوقف عمل الأول observable دا بيبقى فية

observables ما بين ال swich بيعمل
فهو بيتاكد انك شغال احدث واحد وبيعمل observable جواة شوية observable يعنى لو عندى ال
للقديم unsubscribe
للقديم cancel يعنى بيعمل
شغال هيضيع مساحة الميمورى observable لان لو فى اكتر من
*/
const click2=fromEvent(document,'click')
// swichMap شغالين مع بعض عشان احل دة بال  observable دول اتنان
click2.subscribe(()=>{
  interval(1000).subscribe(x =>{
    console.log(x)
  })
})

// using swichMap
const click3=fromEvent(document,'click')
click3.pipe(
switchMap(()=>{
  return interval(1000)
})
).subscribe((x)=>{
/*
كل لما
اللى هو كلكobservable وشغلة من الأول لما يشغل اول  interval(1000) ال observable   اعمل كلك دا يبدء عد من الاول يعنى بقفل
margeMap انا عايزاة فالحل فى observable بس دى مشكلة  لان ممكن يقفل
*/
console.log("xx = ",x)
})

/*
catchError
بتاخد حاجتين
 1- الايرور
 2- caught ==> اللى انا جاى منة source بتاعى او ال observable دا اللى هو ال

بترجع 3 حاجات catchError ال
observable ممكن ترجع
وممكن ترجع ايرور تانى
دة observable وممكن احاول انى اعمل كونكت على نفس ال

*/
const obs6$=interval(1000).pipe(
  map(value => {
    if(value > 3) {
      throw new Error("over 3");  // عشان اخلية يطلع ايرور لما يعدى ال 3
    }
    return 3
  }),
  catchError((error,caught)=>{
  // return of('x','y')//ومش هترجع ايرور فى الكونسولcomplete وبعد كدة هيدخل على x,y لما يحصل ايرور اللى هو observable بترجع
  // throw new Error('inside catchError') // هنا هيرجع ايرور
  // return caught // وديها كام مرة هيعمل كونكتtake() فممكن استخدم معاها  infint loop هيعمل كونكت عدد لا نهائى ودا خطر وممكن ندخل فى  source دة وارجع ال observable وممكن احاول انى اعمل كونكت على نفس ال
  // return EMPTY
 /*
  EMPTY
علطول بستخدمة عشان نهرب من سياق احداث بتحصل يعنى اطلع متكملش complete بيعمل observable
علطول complete يعنى اما يحصل ايرور هيروح لل  catchError يعنى اول لما يوصل لل complete function اول لما بيشتغل بيرن stream مفيش فية observable عبارة عن
 */
  return NEVER //ولا يطلع ايرور complate بيخليك متعلق فى الحتة دى لا بيروح ولا يجى يعنى لما يحصل ايرور يقف وميعملش
  }),
   take(20)
)

obs6$.subscribe(
value =>{
  console.log('value',value)
},
err =>{
console.error("error",err.message)
},
()=>{
  console.log('complete')
})


}
onActivate(){
  // this.SharedService.activatedEmitter.emit(true)

   /*
  لكل ال notification يبعت subject ودا بيخلى ال subject لقيمة جديدة جوة ال push هنا بعمل
  اللى علية بالقيمة دى subscribers
  */
  this.SharedService.activatedEmitter.next(true)

}

}


