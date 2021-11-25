// feature module
// مجموعة حاجات  ريلاتف مع بعضها

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceService} from '../services/service.service';

// لو ندات الموديل دة جو ال
// app.module
// الابلكشن كلة هيعرف يتعامل مع السرفيس دى
// طب لو عايزة ال
// app.module
// يشوف سرفيس معينة موجودة هنا مش كل السرفيس عن طريق
// ModuleWithProviders
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // providers:[ServiceService]
})
export class CoreModule{
  static forRoot(): ModuleWithProviders {
    return {
             ngModule: CoreModule,
             providers: [ServiceService]
           };
  }

}
// هنا خليت سرفيس معينة تبقى الروت شايفها
// ممكن احسن الشكل عن طريق انى اكنبة فى ميثود جوة الكلاس
// ونادى على الميثود جوة ال app.module
// export const moduleWithprovider:ModuleWithProviders={
//  ngModule:CoreModule,
//  providers:[ServiceService]
// }
