import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { LoginService } from './services/login.service';

import { UnitTestingComponent } from './unit-testing.component'
import { User } from './user';
//  اوصف المشكلةاللى عايزين نعمل ليها تيست
// بتاخد استرنج وفنكشن
// الاسترنج المشكلة بشكل عام والفنكشن جواة المشاكل الصغيرة
// skip معنها describe قبل x لو حط
describe('click on hello world function',()=>{
// المفروض اية اللى يحصل التيستات الصغيرة
// skip معنها it قبل x لو حط
it('must return Hello World 1',()=>{
  const unitTestingComponent=new UnitTestingComponent()
//هتوقع اية اللى هيحصل
expect(unitTestingComponent.hello()).toBe('Hello')
})
//يعنى هينفذ دى بس ومش مهم الباقى focus يبقى f  لو حط
fit('must return Hello World 2',()=>{
  const unitTestingComponent=new UnitTestingComponent()
  expect(unitTestingComponent.hello()).toBe('Hello World')
})
let component:AppComponent
//ComponentFixture ==> هلف على الكمبونت دى
let fixture:ComponentFixture<AppComponent>
let LoginService:LoginService
// LoginService=TestBed.inject(LoginService)
let unitTestingComp:UnitTestingComponent
let userMock:User
let unitTestingFixture:ComponentFixture<UnitTestingComponent>
//عايز يعمل ديبج على الايلمينت
let submitEl:DebugElement
let emailEl:DebugElement
let passwordEl:DebugElement

  // نغلف الكمبونت دى بالتمبليت بتعها
  fixture=TestBed.createComponent(AppComponent)
  //عشان اخد انستنس من الكمبونت دى
  component=fixture.componentInstance

beforeEach(()=>{
  //TestBed ==> كتيرة جدا tools بتوفر
  // configureTestingModule ==> testing بعمل موديل شبة الموديل اللى عندنا بس دة
  TestBed.configureTestingModule({
    declarations:[],
    providers:[
      /*
      بدل ما يعمل
  unitTestingFixture.detectChanges()
   automtic دى هتعملها
      */
      {provide:ComponentFixtureAutoDetect,useValue:true}
    ]
  })

   it('should create app component',()=>{
     expect(component).toBeTruthy()
   })
   it('should have title unit testing',()=>{
     expect(component.title).toEqual('unit-testing')
   })
   it('can Login',()=>{
    //  expect(component.canLogin('h',1234)).toBeTruthy()
    //  expect(component.canLogin('',456)).toBeFalsy()
   })
   unitTestingComp=new UnitTestingComponent()
   userMock={
     email:'test@test.com',
     password:'jjjj'
   }
   unitTestingFixture=TestBed.createComponent(UnitTestingComponent)
   unitTestingComp=unitTestingFixture.componentInstance
   //query() ==> element عشان اعمل كاتش لل platform بتشتغل مع اى
   submitEl=unitTestingFixture.debugElement.query(By.css('button'))

   emailEl=unitTestingFixture.debugElement.query(By.css('input[type=email]'))
   passwordEl=unitTestingFixture.debugElement.query(By.css('input[type=password]'))
  })

it('#login() should toggle isLoggedIn',()=>{
  //'false at first' ==> رسالة هتنطبع
  expect(unitTestingComp.isLoggedIn).toBe(false,'false at first')

  unitTestingComp.login(userMock.email,userMock.password)
  expect(unitTestingComp.isLoggedIn).toBe(true,'true after click login')
  unitTestingComp.login(userMock.email,userMock.password)
  expect(unitTestingComp.isLoggedIn).toBe(false,'false after second click')
})

it('#login() should toggle loginState() message',()=>{
expect(unitTestingComp.loginState).toMatch(/out/)
unitTestingComp.login(userMock.email,userMock.password)
expect(unitTestingComp.loginState).toMatch(/in/)
})

it('setting isLoggedIn to true must disabled submit button',()=>{
unitTestingComp.isLoggedIn=true
unitTestingFixture.detectChanges() //عشان يعمل ابدات للفيو
expect(submitEl.nativeElement.disabled).toBeTruthy()
})

it('submit Data must emit email and password correctly',()=>{
let user:User
emailEl.nativeElement.value=userMock.email
passwordEl.nativeElement.value=userMock.password
submitEl.triggerEventHandler('click',null)
unitTestingComp.submitData.subscribe((data:User)=>{user=data})
expect(user.email).toBe(userMock.email)
expect(user.password).toBe(userMock.password)
})

it('testing on binding',()=>{
  const h5:HTMLElement=unitTestingFixture.nativeElement.querySelector('h5')
  unitTestingFixture.detectChanges()
  console.log(h5)
  expect(h5.textContent).toContain(unitTestingComp.title)
})
})
