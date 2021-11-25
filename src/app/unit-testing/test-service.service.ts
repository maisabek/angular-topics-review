import { Injectable } from '@angular/core';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor() { }
  private loginService:LoginService
  isAuth():boolean{
    // return !!localStorage.getItem('token')
    return this.loginService.isLogin()
  }
}
