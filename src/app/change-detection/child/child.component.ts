import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  //  automatic change detection  بتعطل ال
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
  constructor(private _ChangeDetectorRef: ChangeDetectorRef) {
    // بيفصل الفيو كامل من الترى يعنى متعملش اتشك هنا
    this._ChangeDetectorRef.detach();
    setTimeout(() => {
      this._ChangeDetectorRef.detectChanges();
       // tree يعنى يعمل اتشك هنا يعنى يرجع الفيو تانى اللى انفصل من
      this._ChangeDetectorRef.reattach();
       /*
       حصل عندى detect change بحطها عشان اتاكد ان مفيش
      يعنى مفيش حاجة اتغيرت بعد ما ثبت الفيو بتعها
       */
      this._ChangeDetectorRef.checkNoChanges();
    }, 3000);
 }
  @Input() names: any;
  list: string[] = [];
  refresh() {
   /*
  detectChanges()
  هيعمل ابدات حتى بعد ما انجلر
  بتعها change detection تخلص ال
  بمعنى
   امسك التغير شوف فى تغير ولا لا بيعمل
   اتشك على الفيو دة وعلى ال
  بتوعة children
   وبدل ما يعمل
   new reference
   اللى هى الظريقة دى
  this.names=[...this.names,name]
   */
    this._ChangeDetectorRef.detectChanges();
  }
  ngOnInit() {
    // هنا الريفرنس بتاعى ثابت متغيرش
    // this.names.subscribe((name:string)=>{
    //   this.list=[...this.list,...name]
      /*
     من اول الكمبونت لحد الروت flag  بتعمل زى
     check بتقول لانجلر اعمل path يعنى بتعمل زى
     من اول الكمبونت دى لحد الروت
     يعنى من اول لما ال صب اسكريب يشتغل
        change detectionومن قبل ما ال
      اعمل الباص دة
     */
    //   this._ChangeDetectorRef.markForCheck()
    // })
  }
}
