import { Component, OnInit } from '@angular/core';
// import {Store} from '@ngrx/store'
// import { DecreamentAction, IncreamentAction } from './store/actions/counter.action';
// import { LoadTodosAction } from './store/actions/todo.action';
// import { nSelector } from './store/reducers/counter.reducer';
@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})
export class NgrxComponent implements OnInit {
  
  // count:any=0
  // constructor(private store:Store<any>) {
    //select(nSelector) عشان ينادى على السيلكتور
    //عشان اراقب التغير اللى بيحصل فى الستات كدة الكمبونت بتراقب الستات
   //  this.store.select(nSelector).subscribe((data:any) => {
   //data.counter.n هحط داتا بس لان هنا استخدم سيلكتور
  //    this.count=data
  //   console.log(data)
  // })

  //  }

  ngOnInit():void {}

  // increase(){
  //   dispatch ==> هى اللى بتشغل الاكشن
  //   //payload ==> لما الاكشن يحصل  reducer القيمة اللى مررها ل
  //   //{type:'increament',payload:1} ==>  ممكن اشيل دة واحط اوبجكيت من الكلاس
  //  this.store.dispatch(new IncreamentAction(1))
  // }
  // decrease(){
  //   this.store.dispatch(new DecreamentAction(2))
  // }
  load(){
    // this.store.dispatch(new LoadTodosAction())
  }


}
