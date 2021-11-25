import { AnimationDriver } from "@angular/animations/browser"
import { HttpClient } from "@angular/common/http"
import { LoginService } from "./services/login.service"
import { TestServiceService } from "./test-service.service"

describe('check for is auth',()=>{
let auth=new TestServiceService()
// TestServiceService قبل كل تيست اعمل انستنس جديد من ال 
beforeEach(()=>{
    auth=new TestServiceService()
})
//بعد كل تيست 
afterEach(()=>{
localStorage.removeItem('token')
})

it('must return true if there is a token in localStorage',()=>{
 localStorage.setItem('token','hello world')
 expect(auth.isAuth()).toBeTruthy()
})

fit('must return false if there is no token in localStorage ',()=>{
    localStorage.setItem('token','hello world')
    expect(!auth.isAuth()).toBeFalsy()
})
// spy ==>بيها  test  عشان نعمل fake بنستخدمة عشان نعمل اى حاجة 
it('getting fake data using spy',()=>{
    /*
    createSpyObj ==>
    optional ودا بيبقى spy بتاع ال base name  بتاخد ال 
    method fake وبتاخد ال 
    */
    const mySpy=jasmine.createSpyObj('',['isAuth'])
    // mySpy.isAuth.and.returnValue(new LoginService() + 'x')
    // wrong data ==> عشان لو حصل حاجة غلط
    expect(mySpy.isAuth()).toBe('my data','wrong data')
})

})






