import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, fromEvent, of, from,Notification, asyncScheduler, Observable, concat, EMPTY, forkJoin, bindCallback, BehaviorSubject, combineLatest, defer, iif, throwError, merge, Subject, GroupedObservable,partition, range, Timestamp, ConnectableObservable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, retry, retryWhen, scan, pluck, auditTime, tap, share, take, count,first, takeLast, last, takeWhile, mergeMap, catchError, delay, switchMapTo, mapTo, bufferToggle, buffer, bufferWhen, bufferTime, bufferCount, exhaustMap, exhaust, expand, groupBy, reduce, mergeScan, pairwise, startWith, mergeAll, windowWhen, takeUntil, skipWhile, skip, skipLast, skipUntil, debounce, audit, throttle, distinctUntilKeyChanged, distinct, distinctUntilChanged, ignoreElements, elementAt, sampleTime, sample, single, delayWhen, dematerialize, materialize, timestamp, timeInterval, timeout, timeoutWith, findIndex, toArray, defaultIfEmpty, isEmpty, every, withLatestFrom, publishBehavior, refCount, publish, publishLast, publishReplay } from 'rxjs/operators';

interface Course{
  id:number
  name:string
}
interface GroupCourses{
key:number
value:Array<Course>
}
interface Person {
  id: number;
  name: string;
}
@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  posts=[]
  start$ = new Subject();
  stop$ = new Subject();
  nameSubject = new BehaviorSubject<string>(null);
  fetchDataButton = new Subject();
  nameSubject1 = new Subject<Person>();
ngOnInit() {

/*
retry ==> انى اعمل كونكت او ريكونكت عدد مرات معين يعنى اما يخلص يبدء تانى من الاول
retryWhen ==> observable عايز يعمل ريكونكت بس بشرط ما بتاخد منى
*/
const obs7$=interval(1000).pipe(
  map(value => {
    if(value > 3) {
      throw new Error("over 3")  // عشان اخلية يطلع ايرور لما يعدى ال 3
    }
    return value
  }),
  retry(2) // عايز يعمل ريكونكت مرتين
)
obs7$.subscribe(
value =>{
  console.log('value 2',value)
},
err =>{
console.error("error",err.message)
},
()=>{
  console.log('complete')
})

const obs8$=interval(1000).pipe(
  map((value)=>{
    if(value >3){
      throw new Error('error ')
    }
    return value
  }),retryWhen(error=>{
  // scan ==> معينة operation بتعمل لوب علية وتعمل علية observable بتدخل على
    return error.pipe(scan((count,errors:Error,index)=>{
      if(count>3){
        throw errors
      }
      return count+1
    },0)
  )
})

)
obs8$.subscribe(
value =>{
  console.log('value 2',value)
},
err =>{
console.error("error",err.message)
},
()=>{
  console.log('complete')
})

/*

throttleTime VS auditTime VS debounceTime ?

throttleTime
 وبعد كدة يرجع يسمع تانى ignore يسمع منى اول حاجة وبعد كدة يطنش او يعمل

auditTime
 بيستنى الوقت اللى مديهولوة وبعد كدة يسمع منى

debounceTime
 هو بيفضل يسمع لحد ما خلص كتابة وبعد كدة يستنى الوقت اللى مديهولة وبعد كدة يرجع يشتغل
*/

const cities = [
  "rome",
  "madrid",
  "paris",
  "brussels",
  "eindhoven",
  "berlin",
  "copenhagen",
  "stockholm"
];
const filterCities = value =>
      cities.filter(city => city.indexOf(value) !== -1)
const input = document.querySelector("input");
const suggestions = document.querySelector("#suggestions");

fromEvent(input,'keyup').pipe(
  // value وبعد كدة target استقبلت ايفنت بقولة دور على حاجة اسمها
  pluck('target','value'),
  // throttleTime(2000), // هياخد اول حرف ويعمل فلتر علية وباقى الحروف لا
  auditTime(2000), //بيستنى ثانيتين وبعد كدة يسمع منى
  map(value =>{
     console.log(`value ${value}`)
    return filterCities(value)
  }),
  map(filterCities => filterCities.map(city => `<li>${city}</li>`).join(''))
  ).subscribe(html => (suggestions.innerHTML = html));
  /*
  audit
  تانى observable بس بناء على  observable لنفس داتا اللى طالعة لنفس ال ignore لو عايزة اعمل
  throttle

  debounce

  */
  fromEvent(document, 'click')
  .pipe(
    audit(() => ajax('https://jsonplaceholder.typicode.com/todos/1'))
  )
  .subscribe(console.log) // اول لما الركوست يتم هيعرض يعنى بيتجاهل الكلك لحد ما الركوست يتم

  fromEvent(document, 'click')
  .pipe(
    throttle(() => ajax('https://jsonplaceholder.typicode.com/todos/1'))
  )
  .subscribe(console.log) //للداتا اللى بعد كدة ignore  بيستقبل اول داتا وبعمل

  fromEvent(document, 'click')
  .pipe(
    debounce(() => ajax('https://jsonplaceholder.typicode.com/todos/1'))
  )
  .subscribe(console.log)
// يخلص  يبدء الاوبزرفابل يشتغل واما يخلص يطبعلى احدث حاجة يعنى طول ما بعمل كلك مش هيبعت داتا ولما اوقف الكلك يبعت داتا emition بعد ما ال  source observable لداتا اللى طالعة من  ignore هيفضل يعمل

  /*
   of , from
   observable الاتنان بياخدوا داتا ويحولوها ل
    flating الفرق بينهم هو ال
   of ==> argument بتاخد اتنان
   from ==> one argument
  */
 of([1,2,3]).subscribe(console.log) // [1,2,3] ==> يعنى يحط الاقواس flating عمل
 from([1,2,3]).subscribe(console.log) // 1 2 3 ==> يعنى شايل الاقواس flating مش عامل

 of('angular','string').subscribe(console.log) //string  وبعد كدة هينزل سطر ويحط angular
 from('angular army').subscribe(console.log) // a n g u l a r   a r m y

 from(['angular army','string 2']).subscribe(console.log) // string 2  وبعد كدة هينزل سطر ويحط  angular army
 // asyncScheduler ==>  يعنى يشتغل اسنكورنس
 from(['angular army','string 3'],asyncScheduler).subscribe(console.log) // string 3  وبعد كدة هينزل سطر ويحط  angular army
 from(Promise.resolve('some data 1'),asyncScheduler).subscribe(console.log) // some data 1
 of(Promise.resolve('some data 2'),asyncScheduler).subscribe(console.log) // ZoneAwarePromise {__zone_symbol__state: true, __zone_symbol__value: "some data 2"} ==> Promise مقدرش يتعامل مع ال of مع ال
 /*
 map
   للداتا يعنى بتاخد داتا وبتعمل عليها اى شغل انا عاوزة وبترجع الداتا الجديدة transform بتعمل
  next step وتبعتها لل
  ______________________
   tap
  عشان تعرف استقبلت اية debug بستخدمها فى ال
 sideEffect بتاخد منى حاجة وبتعامل معها ك
 complete وفنكشن success فبتستقبل فنكشن ايرور وفنكشن
 */
  fromEvent(document,'click').pipe(
    tap((event:MouseEvent)=>{
      console.log('in tap',event)
    },
    map((event:MouseEvent)=>{
      event.clientX
    })
    )
  ).subscribe(console.log)

  interval(1000)
  .pipe(
    map(value => {
      if (value > 2) throw new Error("over 2");
      return value;
    }),
    tap(
      (value: number) => console.log("in tap", value),
      err => console.log("err", err.message)
    )
  ).subscribe(console.log)
  /*
  share ==> واحدة بس instance عشان يتاكد ان طالع منة Observable راكب على  Observable دا
  */
  const request = this.getPosts();
  //Share operator is an important rxjs operator to make multicasting on an observable

  // share هنا عمل اتنان صب اسكرايب يعنى بعت اتنان ريكوست فالحل  فى
  this.doSomething(request)
  request.subscribe()
  /*
  take
  بعرض جزء معين من الداتا
  takeLast()
  بتعرض من الاخر
  takeWhile
  */
   of(1,2,3,4,5).pipe(take(3)).subscribe(console.log) // هتعرض اول 3
   of(1,2,3,4,5).pipe(first()).subscribe(console.log) // take(1) هتعرض اول 1 وبالظبط زى
   of(1,2,3,4,5).pipe(takeLast(3)).subscribe(console.log) // هتعرض اخر 3 قيم
   of(1,2,3,4,5).pipe(last()).subscribe(console.log) //هتجيب اخر عنصر
   let counter=0
   of(1,2,3,4,5).pipe(tap(count =>{
      console.log("count is",count)
      counter++
   }),takeWhile(()=>counter<4)).subscribe(console.log)

/*
mergeMap & flatMap
nesting loop يعنى على طريقة اللوب كأنى بعمل mapping ببعض بس على طريقة ال Observables بيدمجوا اتنان
اللى عايزة equation الاولانى وبعد كدة اعمل ال observable لوب على ال
واحد observable فى الاخر ك merge لكل دة وبعد كدة يتعملة  flat التانى وبعد كدة تعمل observable لل
*/

// nesting loop بيشتغل ك
const letters$ = of('x', 'y', 'z'); // obs 1
    const numbers$ = of(1, 2, 3); // obs 2

    const combined = letters$.pipe(
      mergeMap(letter => {
        return numbers$.pipe(map(numberEl => letter + numberEl));
      })
    );
    combined.subscribe(console.log); // x1 x2 x3 y1 y2 y3 z1 z2 z3

  /*
  concat
  على الاول واول لما  subscribe وتبدء تعمل  array of observable بتاخد concatation بتعمل
  يدخل على التانى ويعمل  صب اسكرايب علية وهكذا complete يعمل
  */

    const obs1$ = of("a", "b", "c").pipe(delay(3000));
    const obs2$ = of(1, 2, 3)
    // .pipe(
    // delay(5000) هيستنى 5 ثوانى وبعد كدة هيجيب الداتا
    //  مش هتكمل وهيطبع الايرور concat ال throw Error عمل observable لو فى
    //   tap(() => {
    //     throw new Error("something went wrong");
    //   }),
    //   catchError((error, caught$) => {
    //     console.error('error is ',error)
    //     return EMPTY;
    //   })
    // );
    const concatData = concat(obs1$, obs2$, obs1$); // array of observable بديها
    concatData.subscribe(
      value => console.log(value), //a b c 1 2 3 a b c complete
      err => console.log("err is ", err),
      () => console.log("complete")
    )
    /*
    forkJoin
    promise.all() بتعادل
   promise.all() ==>
    معين دى بتستناهم كلهم وبعد كدة بتاخد اكشن timing  وكل واحد شغال ب promise لو عندى كذا
  بعتها observable بتعمل نفس الحاجةودى بتعمل صب اسكرايب على المحصلة النهائية وبترجع اخر حاجة كل forkJoin ال
  بتعمل صب اسكريب على واحد واحد concat بعكس ال
  */
    const obs3$ = of("a", "b", "c").pipe(delay(3000));
    const obs4$ = of([1, 2, 3]).pipe(
      tap(() => {
         // هنا لما اشغل الايرور دة هيقف ومش هيطبع حاجة
        // throw new Error("something went wrong");
      })
    )
    const concatData2 = forkJoin(obs3$, obs4$, obs3$); // ["c",[1,2,3],"c"] ==> هياخد اخر حاجة من كل حاجة
    concatData2.subscribe(
      value => console.log("value2 is ", value),
      err => console.log("err is ", err),
      () => console.log("complete")
    )
   /*
   Ajax
  observable اللى بتعمل operators من ال
  فى انجولار  HttpClient استخدمة زى ال
   كامل response هيجيب ال
   getJSON بس  يبقى عن طريق ال response لو انا عايزة اجيب ال
  ajax.getJSON('https://httpbin.org/delay/2')
   */
  const obs$ = ajax({
    url: 'https://httpbin.org/delay/2',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'rxjs-custome-header': 'Angular Army'
    },
    body: {
      rxjs: 'Hello World!'
    }
  }).pipe(tap(userResponse => console.log('response is ', userResponse)));
  obs$.subscribe()
  /*
  bindCallback
  reactive فنكشن عايز تخلية callback لو عندى كود قديم كلة
  من الفنكشن observable بطلع
  */

  const someFunction = (x, y, callBack) => { // callBackFn فنكشن عادية بتاخد
    callBack(x, y)
  }

  const boundSomeFunction = bindCallback(someFunction); // بترجع فنكشن
  // بعد اول رن يرنها complete  بيعمل  observable ال
  boundSomeFunction('my name', 'my age').subscribe(data =>
  // callbackFn واقدر ارن الداتا اللى فيها ب observable لما برن الفنكشن ببتحول ل
    console.log('data is ', data)
  )
  /*
  combineLatest
 obseravble يعنى بتاخد اكتر من  source بتاخد اكتر من operator من ال
  واحدة obseravble وبتطلع
   بترتيب وتدمجهم مع بعض فى اراى obseravble بتاخد الداتا من كل
   يشتغلوا يعنى لو واحد فيهم واخد  observable مش بتشتغل غير لما الاتنين  combineLatest
  وقت بعد التانى هيشتغل لما التانى يبدء
   */
   const obs9$ = interval(1000).pipe(take(3)); // 0 1 2
   const obs11$ = interval(1000).pipe(take(5)); // 0 1 2 3 4
   const combinedObs$ = combineLatest(obs9$, obs11$);
   combinedObs$.subscribe(
    console.log, // [0,0] [1,0] [1,1] [2,1] [2,2] [2,3] [2,4] complete
    () => {},
    () => {
      console.log('complete');
    }
  )
  // مش هتشتغل combineLatest للداتا بتاعتة فال  emit فمش هيعمل complete عمل Observable لو عندى
  const obs12$ = new Observable(observer => {
      observer.complete();
    });
    const obs13$ = interval(1000).pipe(take(5));
    obs2$.subscribe(x => console.log('obs 2 ', x));
    const combinedObs1$ = combineLatest(obs12$, obs13$);
    combinedObs1$.subscribe(
      console.log, // complete
      () => {},
      () => {
        console.log('complete');
      }
    );

    const movies = [
      { id: 1, name: 'movie 1' },
      { id: 2, name: 'movie 2' },
      { id: 3, name: 'movie 3' }
    ];
    const user = { name: 'user', favoriteMovieIds: [2] };
    const movies$ = new BehaviorSubject(movies);
    const user$ = new BehaviorSubject(user);
    combineLatest(movies$, user$)
      .pipe(
        map(([movies, user]) =>
          movies.filter(movie => user.favoriteMovieIds.includes(movie.id))
        )
      )
      .subscribe(console.log);
    setTimeout(() => {
      user.favoriteMovieIds.push(3);
      user$.next(user);
    }, 3000)

    this.clicks$.subscribe();
     /*
    withLatestFrom
لداتا push هو اللى يعمل source observable  بس لازم ال  combineLatest نفس ال
    */
const clicks11$ = fromEvent(document, 'click');
const data11$ = ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1');
clicks11$.pipe(withLatestFrom(data11$)).subscribe(console.log) //لما يعمل كلك هيجيب احدث حاجة من الاتنين اوبزرفابل

  /*
      combineAll - concatAll - mergeAll
     observable جو observable يعنى لو عندى  inner observable ل flating بيعملوا
     دول بيطلعوا الداتا الداتا اللى جو
     */
     interval(1000)
     .pipe(take(15))
     .subscribe(seconds => {
       console.log('seconds ', seconds + 1);
     });
   //
   const outer$ = of(1000, 5000);
   const combined$ = outer$.pipe(
     map(val => interval(val).pipe(take(2))),
     //combineLatest ==> observable او اراى بتطلع احدث حاجة من كل pairs وحدة ثم بياخد احدث حاجة ويكون  value ل  emmit دى كل واحد فيهم على الاقل عمل  observable ولازم على الاقل ال observables بتاخد
     //combineAll() // combineLatest وبتستخدم جواها  complete تعمل outer observable عشان تطلع الداتا لازم ال
     //concatAll() // complete الاول يخلص تدخل على التانى يعنى فى حالة تتابع مش محتاجة تعملobservable ال inner observable على flating  بتعمل
    // mergeAll() // اول لما بيوصل يعنى اللى يوصل يشتغل علطولobservable بترن ال
    mergeAll(1) // واحدة يعنى مش هيشغل التانى غير لما الاول يخلص دا فى حالة انى مديها واحد interval فى observable ودا معناة ان عايزة اشغل كام concarent value بتاخد
    )
   combined$.subscribe(console.log)

/*
    timer
    interval بتتاخر ثم تشتغل و
    emit بتاخد حاجتين هتشتغل بعد اد اية والقيمة اللى هتعملها
    */
     /* const timer$ = timer(3000, 1000).pipe(take(3));
    timer$.subscribe(console.log); // 0 1 2 */

    /*
    const range$ = range(0, 10); // Creates an Observable that emits a sequence of numbers within a specified range.
    range$.subscribe(console.log); // هتطبع الاعداد من صفر الى 9 */
    /*
    generate
    بس على  اكبر range بيعمل نفس شغل  range نسخة مطورة لل
    generate(initial,condition,iterater هتذيد بأية iterate يعنى ال , result selector الشكل اللى عايزاة يطلع فى الاخر)

     const generate$ = generate(
      0,
      x => x < 3,
      x => x + 1,
      x => 'page number ' + x
    );
    generate$.subscribe(console.log); */

    const guestUser = true
    /*
    iif
    if condition على observable
    */
    const isGusetUser$ = iif(
      () => guestUser, // condition
      of('guset user'), // اتحقق condition لو ال
      of('something went wrong') // متحققش condition لو ال
    )
    isGusetUser$.subscribe(console.log);
    /*
    merge
    مجرد ما الحاجة توصل تنعرض علطول
    observable مش شرط بترتيب ال
    هيشتغلوا بالترتيب concat اما فى ال
    */
    const catsUrl = 'https://loremflickr.com/100/100/cat'
    const dogsUrl = 'https://loremflickr.com/100/100/dog'
    const elephantUrl = 'https://loremflickr.com/100/100/elephant'

    const cats$ = interval(2000).pipe(take(5), mapTo(catsUrl));
    const dogs$ = interval(3000).pipe(take(5), mapTo(dogsUrl));
    const elephant$ = interval(4000).pipe(take(5), mapTo(elephantUrl));
     // 2 ==> هنا يعنى شغل اول اتنان وبعد كدة التالت
    const merged$ = merge(cats$, dogs$, elephant$, 2);
    merged$.subscribe(url => this.posts.push(url));
   /*
   buffer
   لشوية داتا وبعد كدة يقدر يتعامل معاهم  save بيعمل cash ال
   observable بتاخد
   ______________
   bufferWhen
   selectorFn بس بياخد  buffer نفس ال
   _________________
   bufferTime
   يتجاهل لمدة اد اية
   ____________
   bufferCount
   Event يتجاهل كام
   */

    // interval(1000).subscribe(console.log);

    setTimeout(() => {
      this.start$.next();
    }, 3000);
    setTimeout(() => {
      this.stop$.next();
    }, 6000);
    // تخلص يعنى بعد 3 ثوانى start دى اللى  subject هيتجاهل الكلك دة لحد مال
    fromEvent(document, 'click')
      .pipe(buffer(this.start$))
      .subscribe(console.log)

    fromEvent(document, 'click')
      .pipe(bufferWhen(()=>this.start$))
      .subscribe(console.log)

    fromEvent(document, 'click')
      .pipe(bufferTime(3000))
      .subscribe(console.log);

      fromEvent(document, 'click')
      .pipe(bufferCount(3))
      .subscribe(console.log);

      // يبدء يتجاهل امتى وينتهى امتى
    fromEvent(document, 'click')
      .pipe(bufferToggle(this.start$, () => this.stop$))
      .subscribe(console.log);
  /*
  exhaust
 للباقى ignore  واحد وبتعمل inner observable بتخلينى اتعامل مع
  ___________________
  exhaustMap ==> exhaust + map

  استخدمهم فى اية ؟
  observable لو عندى لوجن اسكرين والكلك علية يطلع باكشن
 */
  const click1$ = fromEvent(document, 'click');
  const higherOrder1$ = click1$.pipe(
    map(event => interval(1000).pipe(take(4))),
    // 0 1 2 3 ==>   وتجاهل الباقى inner observable استقبل ال
    exhaust()
  )

  higherOrder1$.subscribe(console.log);

  const click$ = fromEvent(document, 'click');
    const higherOrder$ = click$.pipe(
      exhaustMap(event => interval(1000).pipe(take(4)))
    );
    higherOrder$.subscribe(console.log);

    /*
    expand
     نفس الركرجن
    */
    const fetchData = this.fetchDataButton.pipe(
    //  ارقام حولة لاسترنج interval يعنى لو عندى stream الى stream بيحول من
      mapTo(1), // واحد دا الرقم اللى هيبدء بية
      expand((index: number) => (index !== 3 ? of(index + 1) : EMPTY)),
      tap((index: number) => console.log("index is ", index)),
      mergeMap((index: number) =>
        ajax({
          url: `https://jsonplaceholder.typicode.com/todos/${index}`
        })
      )
    )

    fetchData.subscribe(console.log)

    /*
    groupBy
   بس كلهم راجعين فى نفس الاراى groups لو عندى داتا راجعة من السرفير الداتا عبارة عن
        groups بتقسم الداتا دى ل groupBy
   */

    const courses$ = of<Course>(
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'Parcel' },
      { id: 2, name: 'webpack' },
      { id: 1, name: 'TypeScript' },
      { id: 4, name: 'NgRx' },
      { id: 4, name: 'RxJs' },
      { id: 3, name: 'TSLint' }
    )
    courses$
      .pipe(
        groupBy((course: Course) => course.id),  // id بيعمل فلتر بناء على ال
        /*
         دى هترجع
        GroupedObservable {_isScalar: false, key: 1, groupSubject: Subject, refCountSubscription: GroupBySubscriber}
        GroupedObservable {_isScalar: false, key: 2, groupSubject: Subject, refCountSubscription: GroupBySubscriber}
        GroupedObservable {_isScalar: false, key: 4, groupSubject: Subject, refCountSubscription: GroupBySubscriber}
        GroupedObservable {_isScalar: false, key: 3, groupSubject: Subject, refCountSubscription: GroupBySubscriber}
        */
        tap(console.log),
        mergeMap((coursesGroup$: GroupedObservable<number, Course>) =>
          coursesGroup$.pipe( // عشان يمسكهم جروب جروب
            // cur ==> current value اللى بلف بيها
            // [...acc, cur] ==> cur وهيذود ال split acc
            reduce((acc: Array<Course>, cur: Course) => [...acc, cur], []),
            map((arr: Array<Course>) => {
              return { // key , value عشان يضيف كلمة
                key: arr[0].id,
                value: [...arr]
              };
            }),
            /*
           {key: 1, value: Array(2)}  Array(2) ==>  {id: 1, name: "JavaScript"} {id: 1, name: "TypeScript"}
           {key: 2, value: Array(2)}  Array(2) ==>  {id: 2, name: "Parcel"} {id: 2, name: "webpack"}
           {key: 4, value: Array(2)}  Array(2) ==>   {id: 4, name: "NgRx"} {id: 4, name: "RxJs"}
           {key: 3, value: Array(1)}  Array(1) ==>  {id: 3, name: "TSLint"}
            */
            tap((data: GroupCourses) => console.log(data))
          )
        )
      )
      .subscribe(console.log)
      /*
      reduce - scan - mergeScan
      reduce
      mathmatical operator
   فنكشن بستخدمها فى التجميع accumaltor Function بيستخدم
          observable لو عايزة اجمع داتا  موجودة جو
        seat اسمها optional وحاجة
      ____________________
      scan
      transfromation operator
         accumaltor Function بيستخدم
 optional value اللى هى ال  seat اسمها optional وحاجة
 observable او على observable بستخدمها لو عايزة اعمل تجميع جو
      _____________________
      mergeScan


      */
      const interval$ = interval(1000).pipe(take(4));
       //scan
      const count5 = interval$.pipe(
        scan((acc: number, value: number) => {
          console.log(`acc is ${acc} - value is ${value}`);
            /*
      initial value فى حالة انى مش حاطة
        acc is 0 value is 1
        acc is 1 value is 2
        acc is 3  value is 3
        acc is 6 value is 4
         ______________________
         وليكن 5 initial value فى حالة انى  حاطة
         acc is 5 value is 1
        acc is 6 value is 2
        acc is 8  value is 3
        acc is 11 value is 4
      */
          return acc + value;
        })
      );

      count5.subscribe(console.log) // 0 1 3 6
     // reduce
      const count1 = interval$.pipe(
        reduce((acc: number, value: number) => {
          /*
           وليكن 5 initial value فى حالة انى  حاطة
         acc is 5 value is 1
        acc is 6 value is 2
        acc is 8  value is 3
        acc is 11 value is 4
          */
          console.log(`acc is ${acc} - value is ${value}`);
          return acc + value;
        }, 5)
      );
      count1.subscribe(console.log) // 11
      // mergeScan ==> observable داتا اللى هترجع هترجع ك
      const count2 = interval$.pipe(
        mergeScan((acc: number, value: number) => {
          console.log(`acc is ${acc} - value is ${value}`);
          return of(acc + value);
        }, 5)
      )
      count2.subscribe(console.log)
      /*
      pairwise
       observable على  connect بتعمل
       previousState,currentState لل  push وبيعمل
     تقارن الستات ببعض مثلا الاوبجكيت اتغير عايز القديم منة او الجديد
        __________________________
      startWith()
  علية انة يبدء بالقيمة دى connect اللى بعمل  observable لل force بعمل
       BehaviourSubject لل initial emit لو عايزة استفيد من ال
      */
      this.nameSubject
      .pipe(pairwise())
      .subscribe(([previousState, currentState]: Array<string>) => {
        /*
        prev state is null
        curr state is القيمة اللى هيدخلها فى الانبت
        */
        console.log(`prev state ${previousState} curr state is ${currentState}`);
      })

      this.nameSubject
      .pipe(startWith(null), pairwise()) // startWith(null) ==> null عشان اخلية يبدء ب
      .subscribe(([previousState, currentState]: Array<string>) => {
        if (previousState === null) {
          console.log('first data');
        } else {
          console.log(
            `prev state is ${previousState} - curr state is ${currentState}`
          )
        }
      })
      /*
      partition
  ويطلع الداتا المهمة والداتا اللى مش مهمة filter ويطبق علية الفنكشن  observable بياخد
  condition اللى موجود فى الفنكشن فلتر وبيجيب الداتا اللى ما حققتش ال condition يعنى الداتا اللى حققت ال
    */
      const users$ = ajax.getJSON('https://jsonplaceholder.typicode.com/users');
      // عشان الاراى اللى موجودة اشيل الاقواس منها from استخدم
      users$.subscribe((userData: Array<any>) => this.filterData(from(userData)));
    /*
    window
    وفية شوية داتا  window كل واحد فيهم اسمة  observables ل  source observable بتقسم ال
    window open ==>
    يعنى الصندوق مفتوح اقدر اخد منة داتا
    window live ==>
    الصندوق مفتوح لكن مش معنى كدا انى اقدر اخد منة داتا ممكن اخد داتا منة وممكن لا
    window close ==> يعنى صندوق اتقفل مقدرش اخد منة داتا
    */
   interval(1000)
      .pipe(take(9))
      .subscribe(value=>console.log('in timeline',value))
    const data$ = fromEvent(document, 'click')
    data$
      .pipe(
        // window كل 3 ثوانى البيانات اللى اتعرضت فيها كدا
        // window(interval(3000).pipe(take(3))),
        // windowTime(1000), // يعنى الوقت اللى اقدر اخد منة داتا لمدة ثانية اقدر اخد منة داتا window live دا ال
        // windowTime(1000,4000), // يعنى الوندوا مفتوحة  اربع ثوانى بس اقدر استغل منها اول ثانية بسwindow open دا ال creation interval ودا optional دا paramter تانى
        // windowTime(1000,4000,2), //اللى طالعة max event يعنى  max window size ودا optional parameter  تالت
        // windowCount(2), // يعنى عند 2 كلك يفتح وندوا جديدة  window size
        // windowCount(2,4), // ل 4 كلك يعنى عند الكلك 4 هيفتح وندوا جديدة skip هعمل parameter تانى
        // windowToggle( //اول واحد الوندوا هتفتح امتى وتانى الوندوا هتقفل امتى وتانى برمتر بيستخدم الداتا اللى راجعة من اول برمترparameter دى امتى يعنى بتاخد اتنان  window تستقبل داتا امتى و اقفل ال  window يعنى افتح ال
        //   interval(1000).pipe(tap(x => console.log('x is ', x))), // 0 1 2
        //   i => (i === 3 ? interval(1000) : EMPTY)
        // ),
        windowWhen(() => interval(1000)), // window شبة
        // tap(_ => console.log('===========  New Window  ===========')), // Window عن Window عشان يفصل
        take(3),
        mergeAll()
      )
      .subscribe(x => console.log('clicked', x))
/*
count()
 اد اية next بتاعى عمل  observable بتعد معايا ال
*/
fromEvent(document, 'click')
      .pipe(
        takeUntil(interval(3000)),
         //تبدء تعد وبعد 3 ثوانى يطلع عمل كلك كام مرة count لمدة 3 ثوانى اعمل كلك قبل ما buffer عمل
        count((ev: MouseEvent) =>(ev.target as HTMLElement).innerText === 'click me')
        ).subscribe(console.log)

  /*
  skip
 لاية cancel بيستقبل داتا بيحدد يستقبل اية ويعمل observable لو عندى
  skipLast
  من الاخر skip هيعمل
  skipUntil
  يشتغل observable بتفضل تعمل اسكب لحد ما ال
  skipWhile
  على اساسة تشتغل condition بتاخد
  */

   range(1,5).pipe(skip(2)).subscribe(console.log) // لاول اتنان skip بتعمل
   range(1,5).pipe(skipLast(2)).subscribe(console.log) // من الاخر يعنى اسكب ل 4 و 5 skip بتعمل
   const click8$ = fromEvent(document, 'click');
   interval(1000).pipe(skipUntil(click8$)).subscribe(console.log) // هيفضل يعمل اسكب لحد ما اضغط كلك

   of('x', 'y', 'z')
      .pipe(skipWhile(i => i < 'z')) // z ==> يبقى بفالس يبدء تشتغل condition لما ال
      .subscribe(console.log)

  /*
  distinct
   مقارنة داتا بحيث يبقى عندى داتا فى اوبزرفابل بحيث اعرف اطلع اللى مش متكرر

  distinctUntilChanged
  اهم حاجة الفليو اللى فاتت متكونش نفس اللى بعدها

  distinctUntilKeyChanged
  */

 // لما يجى يدخل فى التكست فيلد مش هيدخل نفس الحاجة مرتين
 this.nameSubject1.pipe(distinct((value:Person)=>value.name)).subscribe(console.log)

 this.nameSubject1.pipe(distinctUntilChanged((value1:Person,value2:Person)=>value1.name === value2.name)).subscribe(console.log)
 of(4,1,1,1,2,2,3,2,4,5,4).
 pipe(distinctUntilChanged((value1:number,value2:number)=>value1 === value2)).
 subscribe(value=>console.log("distinctUntilChanged",value)) //4 1 2 3 2 4 5 4

 of(
    { id: 1, name: 'x' },
    { id: 1, name: 'x' },
    { id: 1, name: 'y' },
    { id: 1, name: 'y' },
    { id: 1, name: 'x' },
    { id: 1, name: 'z' }
  )
    .pipe(distinctUntilKeyChanged('name'))
    .subscribe(console.log)// x y x z ==> احسن بيرقب الكى بيحط الكى فى اول برمتر وتانى برمتر وتالت برمتر الحاجتين اللى عايز يقارنهم syntax بس ب distinctUntilChanged بيحقق نفس ال
  /*
  elementAt
   observable للايلمينت واحد من select لو انا عارفة ترتيب الداتا جو  اوبزرفابل عشان اقدر اعمل

  ignoreElements
  امتى complete للايرور امتى او throw مش مهم الداتا اللى جواة لكن مهم يعمل observable لو عندى
 */
   // elementAt
     of(1, 2, 3,4)
      .pipe(elementAt(3)) //
      .subscribe((value)=>console.log("elementAt",value)); // 4 ==> هترجع العنصر اللى الاندكس بتاعها 3
      of(1, 2, 3)
      .pipe(elementAt(3,2)) // تانى برمتر لو ملقتيش اول برمتر يرجع تانى برمتر
      .subscribe((value)=>console.log("elementAt",value)); // 2 ==> هيرجع تانى برمتر لانة ملقاش اول برمتر
       fromEvent(document, 'click')
      .pipe(elementAt(2))
      .subscribe(console.log);  // mouse event بعد 3 كلك ال  console هيطبع فى ال

    // filter
    /* of(1, 2, 3, 4, 5)
      .pipe(filter(value => value % 2 === 0))
      .subscribe(console.log); */

    // ignoreElements
    of(1,2,3,4,5,6)
      .pipe(ignoreElements()) // مش هيطلع ايرور ولا هيطبع ايرور complete هيعمل
      .subscribe(
        () => {
          console.log;
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('complete');
        }
      )
   /*
   sample
  لداتا وبتجيب احدث حاجة push بيعمل observable وبتعمل كونكت على observable بتاخد
  sampleTime
   لو عايزة اشتغل بوقت
   */
    const clicks$ = fromEvent(document, 'click');
    const seconds1$ = interval(1000);
    seconds1$.pipe(sample(clicks$),take(3)).subscribe(console.log) // هيجيب احدث حاجة موجودة
    const seconds$ = interval(1000);
    seconds$.pipe(sampleTime(2000), take(3)).subscribe(console.log) // بعد كل ثانيتين هيطلع احدث حاجة
    /*
    single
   وبتعمل اتشك على حاجتين يا الاوبزرفابل دة عمل اكشن واحد بس ياما الاوزرفابل دة طلع شوية داتا منها observable على connect بتعمل
   انا بدهالوة predict function يتساوى  single item
   */
// success لحاجة واحدة بس هيطبع push لكن لو غير ال 5 دى لواحد يبقى كدة هيعمل faild لاكتر من حاجة هيطلع push هيعمل
     range(1,5)
    .pipe(single())
    .subscribe(
      () => console.log('success'),
      () => console.log('failed')
    )
    range(1,5) // success
    .pipe(single(i => i === 3)) // predict function انا ادتوة
    .subscribe(
      () => console.log('success'),
      () => console.log('failed')
    )
    fromEvent(document,'click')
    .pipe(take(1),single()) // success ==> failed لو خليت الواحد اتنان اول كلك مش هيطلع حاجة تانى كلك هيطلع
    .subscribe(
      () => console.log('success'),
      () => console.log('failed')
    )
    /*
    delay - delayWhen
    بيعملوا صب اسكريب على اوبزرفابل
   بتاعة الداتا  emition بيأخروا عملية ال
    delay ==> Date Of Time بيأخرها
    delayWhen ==> observable بيأخرها ب
    */

    interval(1000)
    .pipe(take(5))
    .subscribe(console.log);

  const myDate = new Date(2020, 0, 12, 2, 14, 40);
     of('some data')
    .pipe(delay(2000)) // بعد ثانيتين الداتا هتيجى
    .subscribe(console.log);

    of('some data')
    .pipe(delay(myDate)) // اما الوقت دة يعدى هتيجى داتا
    .subscribe(console.log);

  // delaywhen
  of('some data')
      // بعد ثانيتين الداتا هتيجى
    .pipe(delayWhen(() => interval(2000)))
    .subscribe(console.log)
    of('some data')
    .pipe(delayWhen(() => interval(2000),interval(1000))) // تتاخر اد اية subscribe يعنى عملية ال subscribtion delay بعد ثانيتين الداتا هتيجى تانى برمتر هو ال
    .subscribe(console.log)

    /*
    meterialize - dematerialize
     debug بيستخدموا فى ال
    meterialize ==> Notification زى الايرور يعنى بتطلعهم كلهم تايب واحد  next بتطلع ال
    */

    const letters5$ = of('a', 13, 'b', 'c'); // notification انها بتطلع الايرور ك materialize دى هتطلع ايرور فدور ال
    letters5$
      .pipe(
        map((letter: string) => letter.toUpperCase()),
        materialize(), // emition as notification بتعمل كل
        map((notification: Notification<any>) => //اللى طلعت notification عشان اتعامل مع ال
          notification.hasValue ? notification: new Notification('N','error is happen',new TypeError(notification.error.message)) //kind , value, error بتاخد ال
        ),
        dematerialize() //الصحيح بتعها emition ويرجع ال notification بياخد materialize عكس
      ).subscribe(console.log)

      /*
      timeInterval - timeout - timeoutWith - timestamp

       timeInterval ==>
       اللى قبلها emition وال emition اهم حاجة او الحاجة اللى بتحققها التايم بتاع اخر

       timeout ==>
      unsubscribe بيتعملة observable بيقف وال stream اللى خارجة لو محصلتش خلال فترة زمنية معنيةاو محصلتش خلال تاريخ معين ال emition بتقيس المسافة بين ال

      timeoutWith ==>
       تانى observable فى الوقت دة اعمل صب اسكريب على fail حصلة observable لو ال

       timestamp ==>
       الاكشن اللى انت عملتة حصل امتى
       */

      const clicks9$ = fromEvent(document, 'click');
    // timeInterval
    clicks9$.pipe(timeInterval()).subscribe(console.log);

    // timeout
    clicks9$
      .pipe(timeout(1000)) // ما بين كل كلك وتانية ثانية لو الوقت خلص يطلع ايرور
      .subscribe(console.log, err => console.log('error time out', err));
      // timeout with date
     clicks9$
      .pipe(timeout(new Date(2020, 0, 13, 3, 57, 15))) // دة يجى خلاص date بتاعى لسة مجاش خلاص اول لما ال date طول ما ال
      .subscribe(console.log, err => console.log('error time out', err));

    // timeoutWith
    clicks9$
      .pipe(timeoutWith(1000, interval(1000))) //date لو الوقت عدى من غير كلك هيبدء فى الاوبزرفابل التانى وممكن احط  mouseEvent طول ما بعمل كلك خلال ثانية هيطبع
      .subscribe(console.log, err => console.log('error time out', err));

    // timestamp

    clicks9$
      .pipe(
        timestamp(),
        map((timeValue: Timestamp<any>) => new Date(timeValue.timestamp))
      ).subscribe(console.log, err => console.log('error time out', err))

    /*
    toArray - defaultIfEmpty - isEmpty - every - find - findIndex
    toArray ==>
    اللى حصلت emitions يطلع اراى بال complete يعمل observable لما ال observable على connect بيعمل
    defaultIfEmpty ==>
     بتشوف لو الاوبزرفابل فاضى هتبعت حاجة predicate function بيستحدم
    isEmpty ==>
    بتطلع ترو او فالس لو ترو يعنى فاضى لو فالس يعنى مش فاضى condition مجرد
    every ==>
    condition وبتعمل اتشك لو كل الداتا حققت ال observable على connect بتعمل
    find ==>
     condition بيرجع اول جاجة حققت المعادلة او ال element  ببحث عن
    findIndex ==> لو عايزة الاندكس
   */
    /** toArray **/
     fromEvent(document, 'click')
      .pipe(take(5), toArray())
      .subscribe(console.log);  // اللى حصلت emitions هيطلع اراى بال complete لما اعمل كلك خمس مرات كدة هو عمل
    /***** defaultIfEmpty / isEmpty *****/
      EMPTY.pipe(
      defaultIfEmpty('no stream'),
      isEmpty()
    ).subscribe(console.log);
    /***** every *****/
      const data2 = [
      { name: 'x', age: 26 },
      { name: 'y', age: 26 },
      { name: 'z', age: 29 }
    ];
    from(data2)
      .pipe(every(x => x.hasOwnProperty('age')))
      .subscribe(console.log);
    /***** find / findIndex *****/
    const data = [
      { name: "x", age: 22 },
      { name: "x", age: 26 },
      { name: "z", age: 29 }
    ];
    from(data)
      .pipe(findIndex(x => x.name === "x"))
      .subscribe(console.log)


   /*
   Hot Observables
مش لازم صب اسكريب الداتا كدة كدة هيتعامل معاها يعنى هو بيستقبل داتا بغض نظر هتعمل صب اسكريب امتى
subject بتوعوا مثال ال subscriber مع كل  instance ل share بيعمل
هناك احنا بنعمل صب اسكريب بس عشان استقبل الداتا next مش لازم اعمل صب اسكريب علية هو كدة كدة اقدر اعمل subject يعنى فى ال
subject اللى هتيجى بعد كدة لكن كدة كدة بيستقبل داتا والداتا مش طالعة من جو ال
وكلهم هيسمعوا نفس الداتا subject من instance وممكن اعمل كذا
_____________________
  Cold Observables
   لازم اعمل صب اسكريب عشان ابعت الركوست http عشان اجيب الداتا والداتا بتطلع من اوبزرفابل زى ال  subscribe لازم
 observable  والداتا طالعة من ال
 لتنان اكشن هحتاج اعمل fromEvent واحد يعنى مثلا لو حبيت اعمل  instance ل share  وبيعمل
   على باتون مثلا fromEvent و document على fromEvent
____________________
   warm Observables
  Hot Observables وال Cold Observables واخد حتة من ال
 واخد انة بيعمل شير لنفس الانستنس Hot Observables من ال
   واخد انة مش بيتعامل مع اى داتا غير لما يعمل صب اسكريب يعنى لازم يعمل صب اسكريب عشان الداتا ترجع  Cold Observables من ال
*/

   const source1=range(1,1).pipe(map(value=>Date.now()))
   // cold observable الداتا اللى طالعة فى كل صب اسكريب فيهم غير التانية فكدا مفيش شير للانستنس فدا كدة اسمة
   source1.subscribe(value => {
     console.log("in obs 1",value)
   })
   source1.subscribe(value => {
    console.log("in obs 2",value)
  })
// warm observable ل cold observable ازاى نحول ال
    const source$ = interval(1000).pipe(
      publish()
    ) as ConnectableObservable<any>;
    // الاتنين هيرجعوا نفس الفاليو
    source$.subscribe(value => {
      console.log('in obs 1', value);
    });
      source$.subscribe(value => {
        console.log('in obs 2', value);
      });
    source$.connect()  // وبيعمل هاندل للعملية دى source observable بيعمل كونكت على ال
    const source2$ = interval(1000).pipe(
      take(3),
// اللى هو بدورة بيطلع انستنس واحد من الداتا ConnectableObservable لا تعمل كونكت على observable على ال connect directly بتخلى الصب اسكريب دى متعملش
      // publish(),
      // publishLast(), // لو عايز اخر فاليو حتى بعد ما يخلص
      // publishReplay(2), // عشان يجبلى اخر اتنان فليو حتى لو خلص
      publishBehavior(8), // 8 بتاعى ال stream هيحط فى بداية ال
      /*
    ??  ازاى source$.connect() دى بتغنى عن ال  refCount
    طالما فى على الاقل صب اسكريب واحد هيفضل subscribers بيستخدم كونكت جواة بيعمل تراك لكل connect مبنى فوق  refCount
    source عامل صب اسكريب على ال
    */
      refCount(),
      // share() refCount() وال publish() بتغنى عن  ال
    ) as ConnectableObservable<any>
    // hot observable كدة اتحول ل
    source2$.subscribe(value => {
      console.log('in obs 1', value)
    })
    setTimeout(()=>{
      source2$.subscribe(value => {
        console.log('in obs 2', value)
      })
    },5000) // هيستقبل اخر داتا موجودة عندى لان بعد خمس ثوانى هيكون خلص publishLast() دا عشان
  } // end ngOnInit
  filterData(userData$: Observable<any>) {
    const [filtered$, nonFiltered$] = partition(userData$,(user: any) => {
      return user.id % 2 === 0
  })
    filtered$.subscribe(filteredData =>
      console.log('in filter ', filteredData) // condition هيرجع الداتا اللى حققت ال
    );
    nonFiltered$.subscribe(nonFilteredData =>
      console.log('in non filter ', nonFilteredData) // condition هيرجع الداتا اللى محققتش ال
    );
  }

 /*
   defer
   صندوق متقدرش تعرف اية اللى جواة
   جديد observable لكل  refresh observable وكل ما تعمل صب اسكريب بيرجع subscribe غير لما تعمل
   */
   @ViewChild('button', { static: true }) buttonEl: ElementRef<HTMLButtonElement>;
   // مش معروف عنة حاجة لحد ما عمل صب اسكريب defer اللى جو
   clicks$ = defer(() =>
   fromEvent(this.buttonEl.nativeElement, 'click').pipe(
     tap(() => console.log('clicked'))
   )
 )
 //وهيوقف random دا هياخد اول قيمة
 obs1$ = interval(1000).pipe(
   //switchMapTo ==> of عشان اعرف بعد كل ثانية استخدم of الى  interval بيحول من
   switchMapTo(of(Math.floor(Math.random() * 10))),
   take(10)
 );
 // جديدة ما يعرفش اللى فاتت random الجديد بياخد observable جديد ال  observable مع كل ثانية بتعمل
 obs2$ = interval(1000).pipe(
   switchMapTo(defer(() => of(Math.floor(Math.random() * 10)))),
   take(10)
 )

  doSomething(obs: Observable<any>) {
    obs.subscribe();
  }
  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(share());
  }




}


