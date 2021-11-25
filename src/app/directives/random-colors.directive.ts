import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appRandomColors]'
})
export class RandomColorsDirective {
  // عايز كل ما يكتب حرف فى التكست فيلد اللون يتغير رندم
  possibleColors = ['red', 'green', 'blue', 'yellow', 'violet']
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostListener('keydown') setColor() {
    const colorIndex = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorIndex];
  }
  constructor(){}
}
