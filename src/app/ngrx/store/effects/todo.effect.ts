/*
effects ==> api بتمكنا من التعامل مع ال
service class عبارة عن effects
عشان اسطبة
npm install --save "@ngrx/effects"

             dispatch                listen
component  ============>comp action <============ effect
  |                                               |     |
  |                                when responce  |     |call api
  |                                received       |     |
  | watch                                         |     |
  |                                 dispatch      |     |
  |                                  action       |
  |                                               |
 state                                            |
  ^                                               |
  |                                               |
  |update                                         |
  |                             listen            |
  |============ reducer ======================>  effect action
*/
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { LOAD, SuccessAction, failedAction } from '../actions/todo.action';
import {mergeMap, map , catchError} from 'rxjs/operators'
import { of } from 'rxjs';
/*
pipe()
بتاخد مجموعة من الميثود بطبقها على الاويزرفابل بتاعى وفى النهاية بترجعلى اوبزرفابل
_________________________
createEffect() ==> observable بتاخد فنكشن و لازم ترجع , effect عبارة عن اوبزرفابل
__________________________
mergeMap() ==> عشان الفنكشن بايب بتحتاج اوبراتور مينفعش اديها اللينك اللى فية الداتا علطول
عشان اعمل فنكشن وترجع اوبزرفابل
___________________________
ofType(LOAD) ==> عشان اشوف نوع الاكشن
_________________________
@Injectable() عشان اقدر اعرف حاجات جوة الكلاس
*/
@Injectable()
export class TodosEffect {
       constructor(private http:HttpClient, private actions : Actions){}
    //   createEffect()
   //   عشان يراقب الاكشن
  // todoEffect = createEffect(() => this.actions.pipe(
 //    ofType(LOAD),
//     mergeMap(() => this.http.get('https://jsonplaceholder.typicode.com/todos')
//         //لمفروض هيعمل اكشن api لما يجيب الداتا من ال
//      .pipe(
//        map((data) => new SuccessAction(data)), // succedAction لو نجح فى انة يجيب الداتا كدة هيحولة للاكشن اللى هو
//              of() عشان تحولة لابزروفابل
//              catchError((err) => of(new failedAction(err))) // falidAction ودى لو منجحش هيروح لل
//         ))
//     ))
}
