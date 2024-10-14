import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // عايزين نعمل العملية العكسية من
  // *ngIf
  // يعنى لو جاى ترو هيخفى لو جاى فالس يظهر
  hasView = false;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef){}
              
  // هيستقبل الانبت اللى جايلة هنا
  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) { // جاى فالس هيظهر
     this.viewContainer.createEmbeddedView(this.templateRef)
     this.hasView = true
    } else if (condition && this.hasView) {// جاى ترو هيخفى
      this.viewContainer.clear()
      this.hasView = false
    }
  }
}
