import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './headers.interceptors';
import { errorHandler } from './errorHandler.interceptor';
// app.module هنادى علية جوة ال
export const httpInterceptorProviders = [
/*
HTTP_INTERCEPTORS ==>
 بيعبر عن اراى من الانترسيبتور فمكن استخدمة عشان اعمل اكتر من انترسيبتور
____________
multi ==>
استخدمها ك HTTP_INTERCEPTORS لازم اذودة عشان اقول لانجلر ان
يعنى هعمل انجكيت للارى مش سنجل فاليو multi provider
boolean يعنى كل ركوست هينبعت عبارة عن
___________
Interceptor هتتنفذ بالترتيب
*/

{provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
{provide: HTTP_INTERCEPTORS, useClass: errorHandler, multi: true}
]
