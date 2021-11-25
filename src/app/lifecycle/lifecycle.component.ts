import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChange, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.scss']
})
export class LifecycleComponent implements  OnInit ,DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
// Life Cycle Hooks
// دورة حياة الكمبونت من اول لما يتعملها كريات لحد ما يحصلها ديستروى
// اول حاجة
// ngOnChanges
// ngOnInit
// ngDoCheck
// AfterContentInit
// AfterContentChecked
// AfterViewInit
// AfterViewChecked
// OnDestroy
x: string;
@ViewChild('myInput', {static: true}) input: ElementRef<HTMLInputElement>
/*
A constructor
is a special function of the class that is responsible for initializing the variables of the class.
TypeScript defines a constructor using the constructor keyword. A constructor is a function and
hence can be parameterized. The this keyword refers to the current instance of the class.
*/

constructor() {}
ngOnChanges(changes: SimpleChange) {
    // بتراقب التغيرات اللى بتحصل على الانبت
    /*
     called after a bound input property changes this may actually be executed
     multiple times alse always called whenever on of our bound input properties
     changes mean propeties decorated with @input so whenever these properties
     received new values
    */

        console.log("OnChanges :",changes)
    console.log('OnChanges : ', this.x);
    console.log('myInput : ', this.input.nativeElement.value);
  }
  ngOnInit() {
    /*
    called once the component is initialized
    it has not been added to the Dom yet so to say,it has not
    been displayed yet but angular finished the basic initialization our properties
    can now be accessed and initialized
    ngOnInit will run after constructor ==> ngOnInit قبل ال constructor
     init بترن مرة واحدة بس لما الكمبونت يتعملها
    يعنى كريات بنستخدمها عشان نعمل ال
     initalization
    بعد الكونستركتور ما يشتغل

    Initialize the directive or component after
    Angular first displays the data-bound properties and sets
    the directive or component's input properties
    */
    console.log('OnInit : ', this.x);
    console.log('myInput : ', this.input.nativeElement.value);

  }
  ngDoCheck(){
    //will also run multiple times and will be executed alot
    // بتشتغل مع
    // change detection
    // فى تغير الحق اعملة ريندر
    /*
     change detection
     is the system by which angular determines whether something changed on the
     template of a component or inside of a component i should say
     it has to check on certain triggering events like you clicked somewhere or a timer
     fired or an observable was resolved
     change detection on angular works pretty great and doesn't cost alot of preformance

     */
    console.log('DoCheck : ', this.x);
    console.log('myInput : ', this.input.nativeElement.value)
  }
  ngAfterContentInit() {
    // called after content (ng-content) has been projected into view
    // this is called whenever the content which is projected via ng-content has been initialized
     // content بيشتغل مرة واحدة بس بعد ما
     //  يتعملة انشيات
     // الكونتت دة اسمة
     // content projection

     console.log('AfterContentInit : ', this.x);
     console.log('myInput : ', this.input.nativeElement.value)
  }
  ngAfterContentChecked(){
    // called every time the projected content has been checked
    // change detection + content projection
    console.log('AfterContentChecked : ', this.x);
    console.log('myInput : ', this.input.nativeElement.value);

  }
  ngAfterViewInit() {
        // لما الفيو يظهر كامل
        // fully initilazed for the component
        // called after the component's view (and child views) has been initialized
        console.log('AfterViewInit : ', this.x);
        console.log('myInput : ', this.input.nativeElement.value);
  }
  ngAfterViewChecked() {
    // fully initilazed + change detection
    // called every time the view (and child views) have been checked
    console.log('AfterViewChecked : ', this.x)
    console.log('myInput : ', this.input.nativeElement.value)
  }
  ngOnDestroy() {
   // لما الكمبونت ينتهى
   // called once the component is about to be destroyed
   console.log('Destroy : ', this.x);
   console.log('myInput : ', this.input.nativeElement.value);
  }

}
