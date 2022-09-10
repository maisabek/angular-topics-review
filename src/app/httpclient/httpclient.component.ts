import { Component, OnInit, HostListener } from '@angular/core';
import {ApiService} from './http/api.service';
import {interval, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-httpclient',
  templateUrl: './httpclient.component.html',
  styleUrls: ['./httpclient.component.scss']
})
// crud  ==> c (create) , r (read) , u (update) , d (delete)
export class HttpclientComponent implements OnInit {
  isOffline: boolean
  subscribtion:Subscription
  // window:offline ==> offline دى window  هل ال
  @HostListener('window:offline', ['$event'])
  isWindowOffline(event){
    console.log('offline ? ', event);
  }
  constructor(private ApiService: ApiService) {}
  ngOnInit(){
   /*
   push VS pull Protocols
   data preducer ==>
    للداتا وانا مستنى الداتا دى push بينتج الداتا يعنى زم ما بجيب داتا من سرفير هو بيعمل
   data consumer ==>
   هو اللى بيرن الداتا وبيستقبل الداتا بيحدد امتى هيستقبل الداتا وازاى هيستقبلها
   للداتا  اللى موجودة داخل الفنكشن pull عمل  data consumer يعنى

   ____________

    function VS Observable
    Observable ==>
    call شبة ال  Observable على ال  subscribe وبعمل argument شبة الفنكشن اللى مش بتستقبل
    argument على الميثود اللى مش بتاخد
      مش بيتاثر  side effect على الفنكشن دى ال trigger لو عملت اكتر من
         ممكن ارجع منة اكتر من مرة Observable ال
    function ==>
     return واحدة مينفعش يبقى ليها اكتر من ال  return الفنكشن ملهاش غير
    */
    console.log('before observable')
     const auth$=new Observable(subscriber =>{
       subscriber.next('https://fakestoreapi.com/products/1')

     })

     auth$.subscribe(message => {
       console.log("observable 1",message)
       // هترجع اللينك مش الداتا اللى جو اللينك observable 1 in observable
     })

     auth$.subscribe(message => {
      console.log("observable 2",message)
      //  هترجع اللينك مش الداتا اللى جو اللينك observable 2 in observable
      setTimeout(()=>{
        console.log('observable 3')
      },3000)
    })

    console.log('after observable')

    const obs$=new Observable(function subscribe(observer){
      observer.next('new stream 1')
      observer.error('error') //لو حصل ايرور مش هيدخل على السطر اللى بعدية
      observer.complete() //  مش هيستقبل حاجة تانية يعنى مش هينفذ اللى بعدة complete ولو حصل
      observer.next('new stream 2')
    })
     obs$.subscribe( // عشان يشتغل Observableعلى ال  subscribe لازم اعمل
      //  console.log //ممكن اعمل هاندل للايرور دة
     (next)=>{console.log('next',next)},  // success
     (error)=>{console.log('error',error)},  // complete عشان فى فوق ايرور معملش
     ()=>{console.log('complete')}  // complete
      )
      //__________________________________________________________
         // هيطبع من زيرو ل مالانهاية وكل ثانية يطبع رقم اللى بعدة
   this.subscribtion=interval(1000).subscribe(console.log)
     // unsubscribe اعمل interval عشان اوقف ال
     setTimeout(()=>{
       this.subscribtion.unsubscribe()  //   دة هيوقف بعد 5 ثوانى interval ال
     },5000)

    /*
    Promise VS Observable
    Observable : Event stream
     بتاعة بيبعت داتا هيفضل يستقبلها source بمعنى طول ما ال
     وتقدر تعمل علية عمليات كتير
     subscribe وتقدر تستخدمة فى اكتر من مكان بأنك تعمل
     unsubscribe فاى تغير فى الداتا بيجلك وعشان توقفة بتعمل
     ؟؟؟؟ observable امتى استخدم ال
       على داتا معينة فى اى تغير فيها listen لما اكون عايزة
     ___________
     Promise : one time response
     غير داتا  source يعنى بيستقبل الداتا مرة واحدة بس يعنى لو
     مرة مش هيقدر يستقبل اى تغير تانى  fire طالما حصلة  promise  ال
     ؟؟؟؟ Promise امتى استخدم ال
     بستخدمة لما بقى عايزة اعرف الداتا اول مرة بس
     promise الافضل انى استخدم http request زى مثلا
      معاة لان الداتا جت مرة ومش هتيجى تانى

    _________

    The RxJS Observable interface provides the toPromise() method
    that can be used to get a promise from the Observable.

    RxJS provides the toPromise() operator which converts an Observable to a promise
    so you can
    work with the HttpClient methods using promises instead of Observables. We have previously
    seen that with an example:
    private fetchData(){
    const promise = this.httpClient.get(this.apiUrl).toPromise();
    console.log(promise);
    promise.then((data)=>{
      console.log("Promise resolved with: " + JSON.stringify(data));
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    })

    */
    const myPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve('dog');
        resolve('cat')
        resolve('bird');
      }, 100)
    })

  myPromise.then(result => {
    console.log('promise: ', result);
  })

  const myObservable = new Observable(observer => {
    setTimeout(() => {
      observer.next('dog')
      observer.next('cat')
      observer.next('bird')
    }, 100)
  })

  const subscription = myObservable
    // .filter(result => result === 'bird')
    .subscribe(result => {
      console.log('observable: ', result);
    });

  subscription.unsubscribe();
  }

  doGet() {
    // this.ApiService.doGet().subscribe((res)=>{
    //   console.log('res',res)
    // })
    // promise نفس الكود لكن بال
    // this.ApiService.doGet().toPromise().then((res)=>{
    //   console.log('res',res)
    // })

    // this.ApiService.doGet().subscribe((event: HttpEvent<any>) => {
    //     console.log('event is', event)
    //     // progress event <== عشان يعمل
    //     switch (event.type){
    //       case HttpEventType.DownloadProgress:
    //         console.log(`${Math.round(event.loaded / 1024)} KB loaded`);
    //         break
    //     }
    // })
  }
  doDelete() {
    // this.ApiService.doDelete().subscribe((res) => {

    //   console.log('res', res);
    // });
  }
  doPost(){
    // this.ApiService.doPost().subscribe((res) =>{
    //   console.log('res', res);
    // })
  }
  doPut() {
    // this.ApiService.doPut().subscribe((res) => {

    //   console.log('res', res);
    // });
  }
  }





