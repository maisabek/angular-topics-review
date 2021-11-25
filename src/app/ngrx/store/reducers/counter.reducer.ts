// import { createFeatureSelector, createSelector } from "@ngrx/store"
// import { CustomAction } from "../store"

// let initialState={
//     n:0
// }

// /*
// Action
// payload انترفاس جوة اتنان بروبيرتى التايب وال 
// */
// /* 
// counterReducer
// new state وبيرجع update بياخد الستات وبيعملها 
//  بياخد الستات NgRxاو ال store ال 
// دى ويحطها مكان الستات اللى شغال عليها 
// */

// /*
// reducer عشان يعرف الابلكشن بتاعى ان دة ال 
//   ونادى على  app.module بروح فى ال 
// StoreModule.forRoot({counter:counterReducer})
// counter ==> reducer بدى اسم لل
// counterReducer ==> اسم الفنكشن

//  بدورة بيحقق الستات المسئول عنها reducer كل 
// */

// export const INCREAMENT='increament'
// export const DECREAMENT='decreament'
// export function counterReducer(state = initialState,action: CustomAction) {
//     switch(action.type){
//         case INCREAMENT:
//             return {
//               n: state.n + action.payload
//             }
//         case DECREAMENT:
//             return {
//                n:state.n - action.payload
//             }
//         default:
//             return state
//     }  
// }

// /*
// selector
// فنكشن بتاخد الستات وبترجع جزء من الستات
// _____________
// counter ==>reducer اسم ال 
// ___________________
// select() دة بيروح عند الكمبون ويستخدم  selector وعشان يستخدم ال 
// */
// //n عشان اجيب قيمة ال
// let counterFS=createFeatureSelector<any>('counter')
// export let nSelector=createSelector(counterFS,state => state.n)
