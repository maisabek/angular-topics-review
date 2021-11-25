import { Component, Inject, OnInit } from '@angular/core'
import {ServiceService} from '../modules/services/service.service'
import {Title, Meta} from '@angular/platform-browser'
import { InjectionToken } from '@angular/core'
// You can define and use an InjectionToken object for choosing a provider token for non-class
// dependencies.
export const APP_CONFIG = new InjectionToken<ServiceService>('ServiceService');
@Component({
  selector: 'app-dependency-injection',
  templateUrl: './dependency-injection.component.html',
  styleUrls: ['./dependency-injection.component.scss'],
   /*
   كدة بقى الانجكتور للكمبونت دى بس اى تغير هيحصل فى الكمبونت دى بس
  providers:[ServiceService]
  viewProviders:[ServiceService]
  */
})
export class DependencyInjectionComponent implements OnInit{
/*
dependency
كلاس بيعتمد على كلاس فى الشغل بتاعة يعنى
كلاس واخد اوبجكيت من كلاس تانى يعنى بيعتمد علية
dependency injection
هيبعت للكونستركتور اوبجكيت من الكلاس تانى
*/
constructor(@Inject(APP_CONFIG) config: ServiceService,
  private ServiceService: ServiceService
          ,private _Title: Title,
            private meta: Meta) {
console.log('title', _Title.getTitle());
_Title.setTitle('hello');
setTimeout(() => {
  // لو عايزة اعدل على الميتا داتا
  this.meta.addTag({name: 'twitter:card', content: 'hello'});
  // this.ServiceService.value='welcome'
}, 4000)
config.login()
}

/*
حقن الاوبجكيت جوة الفنكشن لان فى الكونستركتور كل ما هيحتاج ياخد اوبجكيت من دة
هيحتاج ياخد اوبجكيت من التانى لانة جوة الكونستركتور
*/
public driver;
public setUser(_driver: driver) {
  this.driver = _driver;
}
  ngOnInit(){}
}
class driver {
  driverPrinter(text) {
   console.log(`i'm printing ${text}`);
  }
}

