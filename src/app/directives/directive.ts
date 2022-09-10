/*
directive
هو خاصية تضاف على العنصر فى الصفحة , تقوم بالتحكم فى طريقة عمله وعرضه فى الصفحة
 used to manipulate the DOM . you can change the appearance, behavior or
 a layout of a DOM element. It also helps you to extend HTML.
 -------
 directive are instructions in the dom
 ____________
 Angular offers two kinds of built-in directives:
 attribute directives and structural directives.
 ________________________
directive لية 3 انواع
1-components  (directive with a template)
components are kind of such instructions in the dom once we place the selector
of our component somewhere in our template at this point we're instructing angular
to add the content of our component template and the business logic in our typescript
code in this place where we use the selector

Component directives are used in main class. They contain the detail of how the
component should be processed, instantiated and used at runtime.
 دى ديراكتف بتمبلت يعنى ديراكتف ذيادة علية فيو
 اى حاجة اقدر اعملها فى الديكترف اقدر اعملها
 base فى الكمبونت مش العكس يعنى الديكرتف هو ال
الديكترف لما يبقى لية فيو يبقى كمبونت
________________________
2- structrcul directive
start with  * sign
بتغير فى الدوم بتعمل انزرت فى الدوم وريموف من دوم زى
*ngFor *ngIf
________________________
3-attribute directive
؟؟ attribute directive لية بيسمى
because they really just look like normal html attributes without a star basically
__________
used to change the look (Change the appearance\behavior of an element)
ودى خاصة بالابيرنس والبهفيور
لو عندى فنكشن وعايزة انديها فى اكتر من مكان
ngClass Directive: The ngClass directive is used to add or remove CSS classes to an HTML element.
ngStyle Directive: The ngStyle directive facilitates you to modify the style of an HTML element using the expression.
 You can also use ngStyle directive to dynamically change the style of your HTML element.
*/
import {Directive, ElementRef, Renderer, HostListener, Input, HostBinding} from '@angular/core';
@Directive({
    /*
    technically the selector of a directive can be configured just like the selector
    of a component so you could alse use css class or the elements style but again
    typically use the attribute style
    _________
    [] لية حاطط الاقواس دى
    css match rules بيستخدم selector لان
    */
    selector: '[appDirective]'
})
export class directive{
// Attribute Directive
constructor(private elementRef: ElementRef, private render: Renderer) {
elementRef.nativeElement.style.backgroundColor = 'green';
//دى فرقت عن اللى فوق ان لو حبيت ارن على حاجة غير البروزر يعنى بلات فورم تانية زى الاندرويد رندر دى هتصرف وتنادى على الفنكشن المناسبة
render.setElementStyle(elementRef.nativeElement, 'backgroundColor', 'yellow');
}
// فى حالة ان عايزة الهوست او الكمبونت هى اللى تبعت اللون
@Input() highLightColor: string
// دى معناها ان الانبت هو نفس الديكرتف
@Input('appDirective') LightColor: string
@Input() defaultColor: string;

// بقدر اتحكم فى ال
// property  بتاعة parent
@HostBinding('class.active') isHovering: boolean // عايزة اشوف الكلاس دة عامل هوفر ولا لا
@HostListener('mouseover') onMouseOver() {
    console.log('mouse over');
    this.highLight(this.defaultColor);
    this.isHovering = true;
}
@HostListener('mouseleave') onMouseLeave() {
    console.log('mouse leave');
    //  this.highLightColor || 'red'  ===> يعنى لو الهايت لايت كالر مجاش ينفذ الاحمر
    this.highLight(this.highLightColor || 'red');
    this.isHovering = false;
}
highLight(color: string) {
this.render.setElementStyle(this.elementRef.nativeElement, 'backgroundColor', color);
}

}
