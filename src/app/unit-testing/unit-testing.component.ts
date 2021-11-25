import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {LoginService} from './services/login.service'
import { User } from './user';
@Component({
  selector: 'app-unit-testing',
  templateUrl: './unit-testing.component.html',
  styleUrls: ['./unit-testing.component.scss']
})
export class UnitTestingComponent implements OnInit {
  isLoggedIn:boolean
  title:string='hello world'
  @Output() submitData:EventEmitter<User>
  constructor() {
  this.isLoggedIn=false
  this.submitData=new EventEmitter<User>()
  }

  ngOnInit() {}
  hello(){
    return 'Hello World'
  }
  welcome(){
    return 'welcome'
  }
  login(email:string,password:string):void{
    this.isLoggedIn= !this.isLoggedIn
    this.submitData.emit({email,password})
  }
  get loginState():string{
    return `user is ${this.isLoggedIn ? 'logged in':'not logged in'}`
  }

  

}
