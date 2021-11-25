import { Component, OnInit } from '@angular/core';
import { toggleFade, toggleByKeyframe, toggleByVoid, toggleByEnterAndLeave, multipleTransition } from '../shared/animation/toggle.fade';
import {popUp} from '../shared/animation/popUp';
import {routingAnimation} from '../shared/animation/routing';
@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [toggleFade, toggleByVoid,
    toggleByEnterAndLeave, multipleTransition,
    popUp, toggleByKeyframe, routingAnimation]
})
export class AnimationComponent implements OnInit {
   isLogin: boolean;
   openPopup: boolean;
  constructor() {
    this.isLogin = true;
    this.openPopup = false;
  }

  ngOnInit() {
  }

}
