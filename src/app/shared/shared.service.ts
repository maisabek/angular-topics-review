import { HttpClient } from "@angular/common/http";
import { Injectable,EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class SharedService{
// activatedEmitter=new EventEmitter<boolean>()
activatedEmitter=new Subject<boolean>()
constructor(private http:HttpClient){
  this.getData().pipe(tap((res:any) =>this.activatedEmitter.next(res[2].data))).subscribe()
}

getData():Observable<any>{
 return this.http.get("assets/progs.json")
}
}
