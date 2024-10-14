import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductDetailsComponent } from '../routing/product-details/product-details.component';
import { Observable } from 'rxjs';
// ProductDetailsComponent بيحتاج ياخد اسم الكمبونت اللى هيعمل عليها دى اكتف
// هيعمل انترفيس ويحطة بدل الكمبونت
export interface canComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
export class deactivateGuards implements CanDeactivate<canComponentDeactivate> {
  canDeactivate(component: ProductDetailsComponent,
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('deactivate guard')
    // if(window.confirm('upload in progress , are you sure you want to leave')){
    //     return true;
    // }
    // return false;
    if (window.confirm('upload in progress , are you sure you want to leave')) {
      // return component.canDeactivate?component.canDeactivate():true
      return true;
    }
    return component.canDeactivate();
  }
}
