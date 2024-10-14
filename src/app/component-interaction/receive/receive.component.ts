import { Component, OnInit, Input, Output, EventEmitter,
   ContentChildren, QueryList, ContentChild, ElementRef,AfterContentInit,
   ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
// import { SendComponent } from '../send/send.component';
import { NgxComponent } from 'src/app/ngx/ngx.component';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit,OnChanges,AfterContentInit {
  /*
    the exclamation mark [!]
    indicates that the id property will be initialized before it's accessed
  */
  @Input() id!: number
  @Input() message
  @Input() set receiveData(name: string) {
   this.myTitle = name
  }
 constructor() {}
  // الداتا بتمشى من البارينت لل اتشيلد
  // @Input() receiveData:string
  // receiveData لو عايزة هنا فى الكمبونت دى انادى على الانبت دة ب اكس ولكن هيبعت فى
  // Assigning an Alias to custom properties
  @Input('receiveData')  x: string;

   /*
   set عن طريق refactor لو بعت الداتا ومحتاج اعدل فى الداتا دى اعملها
  _________________________
   receiveData ==> دا اللى هيجى , name ==> دا اللى هستخدمة عندى
   */

  myTitle: string;
    // EventEmitter ===> يعنى نبعت ايفنت من الاتشيلد للبيرنت
  @Output() output: EventEmitter<string> = new EventEmitter<string>();

  // two data binding مثال على ال
  @Input() title = ''
  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>()
  /*
     لو عايز اعرض اللى جو ال
    <ng-content></ng-content>
    NgxComponent عايز منها ال
    NgxComponent هنا لو عندى اكتر من
    NgxComponent هيعرض اول
    ContentChildren ولو عايزة اعرضهم كلهم عن طريق
  */
  @ContentChild(NgxComponent, {static: true}) subChild: NgxComponent;

  @ContentChildren('itemref') contentChildern: QueryList<ElementRef>;
  setTitle(title: string) {
    console.log('receive componen' + title);
  }
  push() {
    // emit() ==> الميثود اللى ببعت بيها الداتا
    this.output.emit('my title with eventEmitter');
  }
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      console.log("changedProp : ",changedProp)

      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      }else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }

    this.changeLog.push(log.join(', '));
    console.log("changeLog",this.changeLog)
  }

  ngOnInit() {
    console.log('subChild in ngOnInit', this.subChild);
  }
  ngAfterContentInit() {
    console.log('subChild in ngAfterContentInit', this.subChild);
    this.contentChildern.forEach(element => {
      console.log("itemref = ",element.nativeElement.innerText);
    });
  }

  //  binding to custom properties
 @Input() element:{type:string,name:string,content:string}

}
