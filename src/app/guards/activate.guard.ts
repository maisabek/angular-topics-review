  /*
     guards
     Use route guards to prevent users from 
     navigating to parts of an app without authorization
      بيتعامل معاملة السرفيس وهيرجع ترو لو
      اليوزر يقدر يدخل وفالس لو اليوزر ميقدرش يدخل
      وممكن يرجع برومس او اوبزرفابل
________________________
     route guards type ??
     1-  canActivate لو تقدر تمشى فى الطريق دة ولا لا
     2-  activateChild
      تقدر تدخل تعمل اكسس على ال اتشيلد ولا لا بغض النظر عن حالة البيرنت
     3-  deActivate
      تقدر تطلع من الطريق دة ولا لا اللى هو عايز تطلع من غير ما تعمل سيف
     4-  resolve لو عايز تجيب داتا قبل ما تدخل الكمبونت
     5- load
*/
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
export class ActivateGuards implements CanActivate {
    // localStorage.getItem('auth')
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('guards', next, state);
        if (state.url === '/binding'){
          return true;
        }
        return false;
    }
}
