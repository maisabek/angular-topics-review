import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  constructor(private _ChangeDetectorRef: ChangeDetectorRef) {}
  data: string;
  names: string[] = ['x', 'y', 'z'];
  @ViewChild('myChild', {static: true}) myChild;
  // names:BehaviorSubject<string[]|string>=new BehaviorSubject(['x','y','z'])
  addName(name: string) {
    this.names.push(name)
    /*
    this.names.push(name)
    الطريقة دى اسمها
    mutation او update
    لما بكتب
    changeDetection:ChangeDetectionStrategy.OnPush
    child عند ال
    لكن مش هتسمع عند الاتشيلد push هتعمل
     لان انجلر شايفة نفس الريفرنس اللى مبعتولها
     لازم عشان اعمل دة تشوف الريفرنس جديد عن طريق
    this.names=[...this.names,name]
    ___________________________
    this.names=[...this.names,name]
    جديدة خالص names ومع كل مرة names جو ال name بيحط ال
    ودى اسمها
    new reference
  
   ...this.names ==> النسخة القديمة منها
   name ==> القيمة الجديدة اللى جاية
   جديدة names يعنى فى كل مرة بيعمل
  */
    // this.names=[...this.names,name]

    /*
 BehaviorSubject<string[]|string> من نوع names لو ال
    */
    // this.names.next(name)
  }
  ngOnInit() {
    console.log(this.myChild.refresh());
  }

}
