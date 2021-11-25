/*
Error Handling
فية httpClientممكن الركوست ميوصلش ممكن التوكن مش هو او اليوزر ملوش اكسس على البايج دى جو ال
 httpErrorResponse
بيعمل هاندل للايرور
*/

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }
  logError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.log('client side error', error);
    } else {
      console.log('server side error', error);

    }
    return throwError('there is something went wrong');
  }
}
