import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Post{
  userId:number
  id:number
  title:string
  completed:boolean
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
  isLogin(){
    return true
  }
  isAuth(userName:string,password:number):boolean{
    if(userName && password){
     return true
    }else
    return false
  }
  getPost(postId:number):Observable<Post>{
   return this.http.get<Post>(`https://jsonplaceholder.typicode.com/todos/${postId}`).pipe(
     map((data)=>{
       return {...data,hello:'world'} //hello:'world' رجع الداتا ذيادة عليها 
     })
   )
  }
}
