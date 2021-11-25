/*
Interceptor
دى زى البوابة اى حد هيدخل هيعدى عليها واى حد هيخرج هيعدى عليها
بستفاد منة
http client لو عندى كذا
 على مدار الابلكشن وفى لوجك محتاج احطة فيهم كلهم
 اللوجك دة المفروض الف عليهم واحطة بايدى
بنستفاد من الانترسبتور هنا ان احط
 اللوجيك دة فى الانترسبتور وكدا كدا هيلف عليهم كلهم
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
 export class HeadersInterceptor implements HttpInterceptor {
 /*
  http responce بتحول الركوست لابوزيرفابل الى فى نهاية بيرجع
  _______________________
  next ==>
  chain لو عندى اكتر من انترسبيتور موجودين فنعتبر بوابة بتسلم لبوابة يعنى فايدة النكست انها بتسلم من انترسبيتور لانترسبيتور لحد مال
  httpClientBackendHandlerبتاعتى تخلص ولما يخلص اخر حاجة هتسلم ل
   يعنى دة اخر هاندلر بيعدى علية الركوست وهو اللى بيبعت الركوست للسرفير وبيستقبل الرسبيونس
 */
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        clone() ==>
          url يعنى اخد نسخة عشان ال
         فلازم اخد نسخة منة عشان اقدر اعدل علية readonly بيكون
        */
        const myToken = '';
        const modifiedUrl = req.clone({
        url: req.url.replace('http', 'https'),
        headers: req.headers.set('Authorization', myToken)
        });
        console.log('in interceptor : ', req, next, 'modifiedUrl : ', modifiedUrl);
        return next.handle(modifiedUrl)
    }
 }
