import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing'
import { LoginService } from './login.service'
interface Post {
  userId:number
  id:number
  title:string
  completed:boolean
}
describe('LoginService', () => {
  beforeEach(
    () => TestBed.configureTestingModule({})
    );

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService)
    expect(service).toBeTruthy()
  });
  let LoginService:LoginService
  
  beforeEach(()=>{
    TestBed.configureTestingModule({
     imports:[HttpClientModule,HttpClientTestingModule]
    })
  })
  //DoneFn ==> هتشتغل لما الداتا كلها ترجع فى حالة ان بجيب داتا من سرفر
  it('should get the data successfully',(done:DoneFn)=>{
    LoginService.getPost(1).subscribe((post:Post)=>{
      console.log('data is ',post)
      expect(post.id).toEqual(1)
      done()
    })
  })
// Mock Data ==> fake ان الحاجة اللى راجعة نفس الحاجة الexpect من عندى و fake بعمل حاجة 
let httpMock:HttpTestingController
const postMock={
  userId:1,
  id:2,
  title:'my title',
  completed:false
}
it('getPost() must get data as expected',()=>{

  LoginService.getPost(1).subscribe((data:Post)=>{
    console.log('data is',data)
    expect(data).toEqual(postMock)
  })

  //expectOne ==> بشوفها اتنفذ ولا لا url بديها 
  const req=httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/1`)
  // post ولا get بيشوف الميثود اللى بعتة بيها الركوست هل هى 
  expect(req.request.method).toEqual('POST')
  //انا بأمر الركوست دة يرجع الداتا الفاك بتاعتى
  req.flush(postMock)
  //بتعمل اتشك ان مفيش اى ركوستات متعلقة
  httpMock.verify()
})

})