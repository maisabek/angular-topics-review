import { Component } from '@angular/core';
import {ServiceService} from './modules/services/service.service';
import {routingAnimation} from './shared/animation/routing';
import {LoginService} from '../app/unit-testing/services/login.service'
export interface student{
  name:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation]
})
export class AppComponent implements student {
  title = 'angular-practises';
  // private _ServiceService: ServiceService,private LoginService:LoginService
  constructor() {
    this.name="jjj"
      setTimeout(() => {
      // _ServiceService.value='welcome'
    }, 4000);

}
  name: string;
// test() {
//   this._ServiceService.login();
// }
// canLogin(userName:string,password:number):boolean{
//   return this.LoginService.isAuth(userName,password)
// }
}
