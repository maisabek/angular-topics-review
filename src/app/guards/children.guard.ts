import { CanActivateChild } from '@angular/router';

export class childrenGuard implements CanActivateChild {
 canActivateChild() {
     console.log('children guard');
     return true;
 }
}
