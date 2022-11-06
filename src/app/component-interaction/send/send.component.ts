import { Component, ViewEncapsulation, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {ReceiveComponent} from '../receive/receive.component';
import { BehaviorSubject } from 'rxjs';
import {ServiceService} from '../../modules/services/service.service'
@Component({
  /*
  selector :
  This property specifies the CSS Selector, where our template will be inserted into the HTML.
  The CSS Selector in our code is app-root
  */
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
    /*
    metadata array
   بتوعها children متشافة هنا بس وعلى مستوى ال
  */
  providers: [ServiceService],
  encapsulation: ViewEncapsulation.Emulated
  /*
  ViewEncapsulation.None ==> child وال parent على مستوى ال css global بيخلى ال
  styles from the component propagate back to the main HTML and
  therefore are visible to all components on the page.
  ___________
  ViewEncapsulation.Emulated بيشتغل بالاسكوب يعنى الديفلت
  styles from the main HTML propagate to the component.
  ___________
  ViewEncapsulation.ShadowDom
  is a technology not supported by all browsers where
  each element has it's kind of own shadow dom behind it,
  where you then could assign styles to each element
  بتاعة style ادى لكل الايلمينت ال
  and that is the default behavior of view encapsulation in angular
  _________
 ViewEncapsulation.Native
 styles from the main HTML do not propagate to the component.
 
 ShadowDom استبدلت ب Native يعنى ال ShadowDom نفس ال
 This is called "ShadowDom" instead of "Native" now
 the functionality is the same though
 _______
  Dom (document object modle)
 html اللى هو البروزر بيقوم بانشائة عند طلب اى صفحة وهو بيمثل كل العناصر الموجودة فى ال
*/
})
export class SendComponent implements OnInit {
  data = 'jj';
constructor(private _ChangeDetectorRef: ChangeDetectorRef,private ServiceService:ServiceService) {}
  dataFromChild: string

  // two data binding مثال على ال
    title = '';
    @ViewChild(ReceiveComponent, {static: true}) mychild: ReceiveComponent
  ngOnInit() {
        console.log(this.mychild.setTitle(' send component'))
    }
    history: string[] = [];
    missions = ['Fly to the moon!',
                'Fly to mars!',
                'Fly to Vegas!'];
    nextMission = 0;

    announce() {
      const mission = this.missions[this.nextMission++];
      this.ServiceService.announceMission(mission);
      this.history.push(`Mission "${mission}" announced`);
      if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
    }

    // <!-- binding to custom properties -->
    serverElements=[{type:'server',name:'Testserver',content:'just a test!'}]
}
