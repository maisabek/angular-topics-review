import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {BindingComponent} from './binding/binding.component';
import {ComponentInteractionComponent} from './component-interaction/component-interaction.component';
import {SendComponent} from './component-interaction/send/send.component';
import {ReceiveComponent} from './component-interaction/receive/receive.component';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {ViewchildchildrenComponent} from './viewchildchildren/viewchildchildren.component';
import {DirectivesComponent} from './directives/directives.component';
import {PipeComponent} from './pipe/pipe.component';
import {FormsComponent} from './forms/forms.component';
import {DependencyInjectionComponent} from './dependency-injection/dependency-injection.component';
import {AnimationComponent} from './animation/animation.component';
import {HttpclientComponent} from './httpclient/httpclient.component';
import {NgxComponent} from './ngx/ngx.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {SideComponent} from './side/side.component';
import {RoutingComponent} from './routing/routing.component';
import {ProductDetailsComponent} from './routing/product-details/product-details.component';
import { ActivateGuards } from './guards/activate.guard';
import { childrenGuard } from './guards/children.guard';
import { deactivateGuards } from './guards/deactivate.guard';
import {resolveGuard} from './guards/resolve.guard';
import {LoadGuard} from './guards/load.guard';
import {RoleGuard} from './guards/role.guard';
import { InputComponent } from './input/input.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import {ParentComponent} from './change-detection/parent/parent.component';
import { NgrxComponent } from './ngrx/ngrx.component';
import { DesignPatternComponent } from './design-pattern/design-pattern.component';
import { SubjectComponent } from './subject/subject.component';
import { OperatorsComponent } from './operators/operators.component';
import { DecoratorComponent } from './decorator/decorator.component'
import {PolymorphismComponent} from './polymorphism/polymorphism.component'
import {IntervalComponent} from '../app/operators/interval/interval.component';
const routes: Routes = [
  // pathMatch:'full'  لو عندى باص بشكل دة
  // لو عندى باص بشكل دة
  //  user/name/title
  // هيعمل اتشك على
  // user/name
  // اما لو كتبت pathMatch:'full'
  // هيعمل اتشك على كل ال url

{path: '', redirectTo: 'binding', pathMatch: 'full'},
{path: 'binding', component: BindingComponent, canActivate: [ActivateGuards]},
{path:'decorator',component:DecoratorComponent},
{path:'polymorphism',component:PolymorphismComponent},
{path: 'componentInteraction', component: ComponentInteractionComponent,
// canActivateChild:[childrenGuard],
children: [
  {path: '', redirectTo: 'send', pathMatch: 'full'},
  {path: 'send', component: SendComponent},
  {path: 'receive', component: ReceiveComponent}
]},
// './lifecycle/lifecycle.module#LifecycleModule'
{path: 'Lifecycle',
loadChildren: () => import('./lifecycle/lifecycle.module').then(m => m.LifecycleModule),
canActivate: [RoleGuard],
data: {role: 'admin'}
// canLoad:[LoadGuard]
// {preloadingStrategy:PreloadAllModules}
// لو استخدمت دى استخدم معها
// canActivate وليس
// canLoad
},
{path: 'view', component: ViewchildchildrenComponent},
{path: 'directives', component: DirectivesComponent},
{path: 'pipe', component: PipeComponent},
{path: 'forms', component: FormsComponent},
{path: 'dependencyInjection', component: DependencyInjectionComponent},
{path: 'routing', component: RoutingComponent},
{path: 'routing/:id', component: ProductDetailsComponent,
canDeactivate: [deactivateGuards],
// productKey => الكى اللى بسمع بية الداتا جوة الكمبونت
resolve: {productKey: resolveGuard}
},
{path: 'animation', component: AnimationComponent},
{path: 'httpclient', component: HttpclientComponent},
{path: 'input', component: InputComponent},
{path: 'typescript', component: TypescriptComponent},
{path: 'ngx', component: NgxComponent},
// هيعرض الsidecomponent مع كل الكمبونت
// {path:'',component:SideComponent,outlet:'sidecomponent'},

{path: 'structuralDirectives', component: SideComponent, outlet: 'sidecomponent'},
  // لو كتب فى الباص اى حاجة غير اللى كتبنها يروح للكمبونت دى
  // wield card بتسمى
// {path:'**',component:NotfoundComponent}
{path: 'changeDetection', component: ChangeDetectionComponent,
children: [
  {path: '', component: ParentComponent}

]},
{path:'ngrx',component:NgrxComponent},
{path:'DesignPattern',component:DesignPatternComponent},
{path:'subject',component:SubjectComponent},
{path:'operator',component:OperatorsComponent},
{path:'interval',component:IntervalComponent}
];

/*
RouterModule
جواة اتنان ميثود هما
 forRoot() و forChild()
الاتنان بيعملوا امبلمنت من
ModuleWithProviders
 دا انترفاس وانت بتتعامل مع الموديل بيساعدك
 تحدد انهى بروفايدر انت مجتاج تستخدمها
 return لما تعمل
من الحاجة اللى بطبق الانترفس دة
جواة اقدر احددال
ngModule: Type<T>
providers?:provider[]
دا اللى بيدلة السرفيس يعنى اخليلة سماح يشوف السرفس دى
___________________
forRoot() ندتها باسم الكلاس عشان هى استاتك
*/
@NgModule({

/*
preloadingStrategy ==>
   دى
  connect with lazyLoading
  دى بتسيب الابلكشن يعمل لود للحاجات المهمة وبعدان يعمل لود
   للموديل اللى فاضلة ودا بنستفاد منة فى حاجتين
    بتاع الابلكشن بيكون اسرع start بتاع initial time ال
   ولما يجى يدخل على الموديل مش محتاج اعملة لود لان معمولة لود قبل كدة

__________

forRoot() ==> sets the LocationStrategy to the PathLocationStrategy
which makes it the default strategy. You also have the option of switching
 to the HashLocationStrategy with an override during the bootstrapping process.
_____________

 {enableTracing: true}    debugging purposes only

*/
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
