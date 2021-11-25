import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

export class errorHandler implements HttpInterceptor {
    // بدل ما يعمل كاتش للايرور عند كل ركوست
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
   console.log('in error handler')
     // pipe() ==> اللى دخل الركوست property تدخل جو الركوست وتتعرف على ال
   return next.handle(req).pipe(
        catchError((err) => {
            console.log('error is', err);
            return of(err);  // عشان يرجع اوبزرفبل يكمل سكة الاوبزرفبل الموجودة
        })
    );
}
}
