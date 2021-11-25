import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {
  @HostBinding('style.background-color') bgColor:string
  @HostListener('mouseover') onMouseOver(){
    this.bgColor='yellow'
  }
  @HostListener('mouseout') onMouseOut(){
    this.bgColor='blue'
  }
  constructor() { }

}
