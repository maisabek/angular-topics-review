import { Injectable } from '@angular/core';
import {ajax} from 'rxjs/ajax';

// اللى بيميز كلاس عن التانى هو الديكروتر
// الكلاس دة ممكن يتعملة انجيكت جو اكتر من كمبونت

@Injectable()
/*
ProductService ==>
dependancy injection token دا اللى الانجكتور بيدور عليها عشان يعرف يتعامل
*/
export class ProductService {
  value: string;
  constructor() {
    this.value = 'ProductService';
  }
  getProduct(id: string) {
    return ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
