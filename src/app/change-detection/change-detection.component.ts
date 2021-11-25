import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss']
})
export class ChangeDetectionComponent implements OnInit {
  constructor(){}
  ngOnInit(){}

   /*
 Change Detection Strategy
  ui بياخد الستات بتاعة الابلكشن ويحولها ل
 يعنى مثلا لو عندى زرار لما اضغط علية ياخد اللى كتابتة فى التكست فيلد ويعرضة
  ليها نظريتان
  اشيل البايج كلها ورندر بياج جديدة اسرع ما الف فى دوم معقد
  يقارن الستات دى مع الستات القديمة واعملك ريندر للفروقات بس
   _________________________________
  لما اعمل كلك على باتون ال
  change detection  الستات بتتغير وعلية
  بتشتغل ويعمل ريندر للابلكشن
  الستات بتتغير ب 3 حاجات
  event بتاع الكلك وصبميت
  server side
  الحاجات اللى فيها تايمر زى
  setTimeOut() setInterval()
__________________________
 بتعها change detector كل كمبونت عندها ال
 اى ايفنت بتحصل الانجلر بتلف على كل الكمبونت
 اللى عندها عشان تعمل اتشك لو فى اى تغيرات
 bottom لل top من
 _________________________
 لو انا عايزة انجلر تعمل اتشك عند جزء معين والباقى لا
  عن طريق ال
  changeDetection:ChangeDetectionStrategy.OnPush
  automatic change detection  بتعطل ال
  child على ال
*/

}
