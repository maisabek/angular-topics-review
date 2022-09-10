import { Component, OnInit, OnDestroy } from '@angular/core';
import {formatDate,DatePipe} from '@angular/common';
import {ajax} from 'rxjs/ajax';
import {registerLocaleData} from '@angular/common';
import localAr from '@angular/common/locales/ar-EG';
import { Subscription, Observable } from 'rxjs'
registerLocaleData(localAr);
@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss'],
  providers:[DatePipe]
})
export class PipeComponent implements OnInit, OnDestroy {
  constructor(private datePipe:DatePipe) {

    // don't make any logic here
    console.log(formatDate(this.date, 'yyy-M-EE-a-h-H-m-s', 'en-US'));
    // with Async
    this.getPromise().then((msg: string) => {
      this.promiseData = msg
    });
    // without Async
    this.promiseAsync = this.getPromise();
    this.getData();
    this.observableAsync = this.getObservable();
    // custom pipe
    this.data = [
      {name: 'mark', age: 23, speed: 15},
      {name: 'john', age: 25, speed: 45},
      {name: 'doe', age: 29, speed: 85}
    ];
    // هنا بعد 3 ثوانى مش هيحصل تغير فى الداتا وال
    // pipe
    // مش هتجمع
    // لازم اخليها
    // impure
    setTimeout(() => {
       this.data.push({name: 'max', age: 2, speed: 1});
    }, 3000)
  }
  users: any = {name: 'ma', age: 12};
  name = 'hello';
  date = new Date();
  userImage: string;
  placeholder = 'https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com';
  data: any;
  // async pipe
  promiseData: string;
  promiseAsync: Promise<string>;
  observableData: any[];
  subscripition: Subscription;
  observableAsync: Observable<any>;
  ngOnInit() {}
  getPromise() {
    console.log(this.datePipe.transform(this.date,'dd-mm-yyy'))
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          resolve('promise complete');
        });
    });
  }

  getObservable() {
   return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1');
  }
  getData() {
  this.subscripition = this.getObservable().subscribe((data: any[]) => {
     console.log('data', data);
     this.observableData = data;
   });
  }
  ngOnDestroy() {
    this.subscripition.unsubscribe();
  }
}
