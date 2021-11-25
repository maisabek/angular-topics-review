import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ProductService} from '../modules/services/product.service';
import { Observable, EMPTY, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// Resolve<any>
// any => نوع الداتا اللى راجعة
@Injectable({providedIn: 'root'})
export class resolveGuard implements Resolve<any> {
    constructor(private ProductService: ProductService) {}
    /*
    الداتا جت تعدى مجتش يبتدى يتصرف مع السرفر
    يعنى يعتبر زى حيطة قبل ما يدخل الكمبونت
    */
    resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const pageId = next.paramMap.get('id');
        return pageId ? this.ProductService.getProduct(pageId).pipe(
            catchError(() => {
                return of('no data');
            })
        ) : EMPTY
    }

}
