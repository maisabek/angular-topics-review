// AsyncValidatorFn هيتعامل مع سرفر

import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay, map } from 'rxjs/operators';

// مش دايما الفالديشن بيكون عندى فى البروجكيت
export function usernameValidator(): AsyncValidatorFn {
    // ValidationErrors تقربيا بيعادل {[key:string]:boolean}
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return checkUsername().pipe(
            map(res => {
              return res.title === control.value ? {userNameExist: true} : null;
            })
        )
    }
    function checkUsername(): Observable<any> {
        return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').
        // pipe(delay(1000)) كأن السرفير متاخر
        pipe(delay(1000));
    }
}
