import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HandleErrorService} from './handle-error.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   headers: HttpHeaders;
  constructor(private http: HttpClient,private HandleErrorService: HandleErrorService){
    const headers = {guset: 'true', language: 'en'};
    this.headers = new HttpHeaders(headers);
  }
  /*
   Use the HttpClient.get() method to fetch data from a server.
   The asynchronous method sends an HTTP request, and returns
   an Observable that emits the requested data when the response is received.
   The return type varies based on the observe and responseType values that
   you pass to the call.
  */
  /*
   progress event ==> بتاع الركوست progress  بقدر اتابع ال
  */
  doGet(){
    // const req = new HttpRequest('GET', `${environment.apiRoot}/get`,
    //                           {reportProgres: true}
    //                           );
      // return this.http.get(`${environment.apiRoot}/get`)
     // لو عايزة اعمل
     // get ب queryParams
     // لانة عرف كل حاجة جو الركوست request واحط get هشيل
    //  return this.http.get(`${environment.apiRoot}/get`,{
    //                          params: {page:'20'},
    //                          headers:this.headers
    //                         })
    // return this.http.request(req);
     }
  doDelete(){
    // return this.http.delete(`${environment.apiRoot}/delete`, {
    //                          params: {page: '10'},
    //                          headers: this.headers
    // });
  }
  doPost() {
    // {age:'20'} ==> ال body (الداتا اللى هنبعتها)
    // return this.http.post(`${environment.apiRoot}/post`, {age: '20'}, {
    //                          params: {page: '10'},
    //                          headers: this.headers
    // }).pipe(catchError(this.HandleErrorService.logError)); // لو فى ايرور هينفذ دى
  }
  doPut() {
    // update
    // {age:'20'} ==> داتا اللى هيتعدل
    // return this.http.put(`${environment.apiRoot}/put`, {age: '20'}, {
    //                          params: {page: '10'},
    //                          headers: this.headers
    // });
  }
  /*
JSONP
api itself supports jsonp
only use it for get requests
make a jsonp request by calling the request function
*/

  /* GET heroes whose name contains search term */
  // useJSONP(term: string): Observable<any>{
  // return this.http.jsonp(`${environment.apiRoot}?${term}`, 'callback').pipe(
  //   catchError(this.HandleErrorService.logError)) // then handle the error

  // }

}

