import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private _SharedService:SharedService){}
  value:any
  fileredElem:any
   cities:any=[
    {name:"ABC",age:12},
    {name:"CDF",age:2},
    {name:"ERT",age:1}
   ]
   ngOnInit(){
   this.getData()
    const input=document.querySelector("input")
    fromEvent(input,'keyup').pipe(
      pluck("target","value"),
      map((res)=>{
       return this.filtered(res)
      })
    ).subscribe()

   }
   filtered(value){
   this.fileredElem=this.allData.filter((res:any)=>res.Name.toLowerCase().indexOf(value) !== -1 || res.Name.indexOf(value) !== -1 || res.Name.toUpperCase().indexOf(value) !== -1)
    }
   allData:any
   subscription:Subscription
   getData(){
     this.subscription=this._SharedService.getData().subscribe((res)=>{
     this.allData=res[2].data
     })
   }
   ngOnDestroy(){
    this.subscription.unsubscribe()
   }

}
