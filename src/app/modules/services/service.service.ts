import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
/*
providedIn ==> الوسيط بين الانجكتور وبين السرفيس وبتاخد 3 قيم
root ==> اللى هيتعامل مع السرفيس هو الروت انجكتور
_________________________________________
@Injectable({providedIn:'root'}) <===لية من الافضل اننا نستخدم الشكل دة
النسخة 6 من انجلر نزل فيتشر جديد
tree checkable provider
دى الطريقة اللى بنعرف فيها السرفيس من غير ما نأثر على ال
proformance
___________________
tree checkable
 بمعنى ان فى استيب فى ال
build process
بتشيل الكود اللى ملوش اى استخدام من الكود بايذ بتاعى
الشكل دة لية ميزتان؟؟
عملنا رجيستر للسرفيس
tree checkable واستخدمنا ال
*/
// @Injectable ==> app.module لما البروجكيت يرن هيعمل انجكيت للسرفيس جو ال
//means that the ServiceService is visible throughout the application
// @Injectable({providedIn: 'root'})
export class ServiceService {
  value: Subject<string> = new Subject();
  constructor() {
    // this.value='hello'
   }
  login() {
    return 'hello'
  }
   // Observable string sources
   private missionAnnouncedSource = new Subject<string>();

   // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  
   // Service message commands
   announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
}
