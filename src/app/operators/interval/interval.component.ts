import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval,Observable,Subscription } from 'rxjs';
@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit, OnDestroy{
   subscribeOperation:Subscription
  constructor() { }
  ngOnInit() {
/*
بتفضل شغالة حتى لو اتنقلت لبايج تانية ولو رجهت للبايج دى تانى هيبدء من الأول واللى كان شغال بيكمل
وهكذا كل اما اخرج وادخل تانى يبدء عد من الاول واللى كان شغال بيفضل شغال فكدا فى اهدار للميمورى
 فكدة destroy من ال unsubscribe فلازم يعمل
 prevent memory leaks because we 're not keeping old subscription
*/
this.subscribeOperation=interval(1000).subscribe((res)=>{
       console.log("count = ",res)
    })

// interval manuallyعشان ابنى ال
// create() ==> create new observable عشان اعمل
/*
observer ==> is a part that is interested in being informed about new data , about errors ,
about the observable being complated
غير لما يحل الأيرورcomplate لو فى ايرور حصل مش هيعمل
*/
let count=0
const customIntervalObservable=Observable.create((observer)=>{
setInterval(()=>{
observer.next(count) // next() emit a new value
if(count === 2){
  observer.complete()  //   2  يعنى يقف عند ال
}
// if(count > 3){
//   observer.error(new Error('error'))
// }
count++
},1000)
})
this.subscribeOperation=customIntervalObservable.subscribe((res)=>{

console.log("res = ",res)
},(error) =>{
console.log("error",error)
alert(error.message)
},() =>{
  console.log("complated") // unsubscribeمش محتاج يعمل

})
}
ngOnDestroy(){
  this.subscribeOperation.unsubscribe()
}

}
