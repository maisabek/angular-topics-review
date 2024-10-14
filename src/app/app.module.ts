import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BindingComponent } from './binding/binding.component';
import { ComponentInteractionComponent } from './component-interaction/component-interaction.component';
import { ViewchildchildrenComponent } from './viewchildchildren/viewchildchildren.component';
import { DirectivesComponent } from './directives/directives.component';
import { PipeComponent } from './pipe/pipe.component';
import { FormsComponent } from './forms/forms.component';
import { APP_CONFIG, DependencyInjectionComponent } from './dependency-injection/dependency-injection.component';
import { AnimationComponent } from './animation/animation.component';
import { HttpclientComponent } from './httpclient/httpclient.component';
import { NgxComponent } from './ngx/ngx.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SideComponent } from './side/side.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingComponent } from './routing/routing.component';
import { ProductDetailsComponent } from './routing/product-details/product-details.component';
import { SendComponent } from './component-interaction/send/send.component';
import { ReceiveComponent } from './component-interaction/receive/receive.component';
// import { CoreModule } from './modules/core/core.module';
import { ActivateGuards } from './guards/activate.guard';
import { childrenGuard } from './guards/children.guard';
import { deactivateGuards } from './guards/deactivate.guard';
import { resolveGuard } from './guards/resolve.guard';
import {SharedModule} from './shared/shared.module';
import {ParentComponent} from './change-detection/parent/parent.component';
import { ChildComponent } from './change-detection/child/child.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceService } from './modules/services/service.service';
import { ProductService } from './modules/services/product.service';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { DefaultImage } from './pipe/customPipes/defaultImage.pipe';
import { SumPipe } from './pipe/customPipes/sum.pipe';
import { directive } from './directives/directive';
import { RandomColorsDirective } from './directives/random-colors.directive';
import { UnlessDirective } from './directives/unless.directive';
import { SvgComponent } from './svg/svg.component';
import { InputComponent } from './input/input.component';
import { TypescriptComponent } from './typescript/typescript.component';
import {HttpModule} from './httpclient/module/core/http.module';
import { HeadersInterceptor } from './httpclient/interceptors/headers.interceptors';
import { HTTP_INTERCEPTORS, HttpClient,HttpClientJsonpModule } from '@angular/common/http';
import { httpInterceptorProviders } from './httpclient/interceptors';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { UnitTestingComponent } from './unit-testing/unit-testing.component';
import { HighLightDirective } from './unit-testing/high-light.directive';
import { TitleCasePipe } from './unit-testing/title-case.pipe';
import { NgrxComponent } from './ngrx/ngrx.component';
// import { StoreModule } from '@ngrx/store';
// import { counterReducer } from './ngrx/store/reducers/counter.reducer';
// import { reducers } from './ngrx/store/store';
// import { EffectsModule } from '@ngrx/effects';
// import { TodosEffect } from './ngrx/store/effects/todo.effect'
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { DesignPatternComponent } from './design-pattern/design-pattern.component';
import { SubjectComponent } from './subject/subject.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { PolymorphismComponent } from './polymorphism/polymorphism.component';
import { IntervalComponent } from './operators/interval/interval.component';
import { OperatorsComponent } from './operators/operators.component';
const x = 5;
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BindingComponent,
    ComponentInteractionComponent,
    ViewchildchildrenComponent,
    DirectivesComponent,
    PipeComponent,
    FormsComponent,
    DependencyInjectionComponent,
    AnimationComponent,
    HttpclientComponent,
    NgxComponent,
    NotfoundComponent,
    SideComponent,
    RoutingComponent,
    ProductDetailsComponent,
    SendComponent,
    ReceiveComponent,
    ParentComponent,
    ChildComponent,
    DynamicFormComponent,
    TemplateDrivenFormComponent,
    DefaultImage,
    SumPipe,
    directive,
    RandomColorsDirective,
    UnlessDirective,
    SvgComponent,
    InputComponent,
    TypescriptComponent,
    ChangeDetectionComponent,
    IntroductionComponent,
    UnitTestingComponent,
    HighLightDirective,
    TitleCasePipe,
    NgrxComponent,
    DesignPatternComponent,
    SubjectComponent,
    OperatorsComponent,
    DecoratorComponent,
    PolymorphismComponent,
    IntervalComponent
  ],
  imports: [
    /*
     مدمج مع الانجولار module هو
     حيث يوفر هدا الموديول عدد من الخدمات المحددة لمنصة المتصفح
    NgIf والتي تعرف بـ (if) يتضمن تعليمات شائعة مثل تعليمة الشرطية
      (foreach,for) وتعليمة الحلقات
      NgFor والتي تعرف  بـ
      "platform-browser" يتواجد بالمكتبة المكتبة التي تم تعريفها في
     */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientJsonpModule,
    // StoreModule.forRoot(reducers),     //Reducer عشان اعرف الابلكشن ان دة
    // EffectsModule.forRoot([TodosEffect]),
    //instrument() ==> devTools عشان اظبط اعددات ال
    // StoreDevtoolsModule.instrument({
    //اقصى عدد من الاكشن اللى تتحط فى الهستورى ممكن اديها رقم ولو عدد الاكشن ذاد هيمسح من القديماو فالس والفالس هنا معنها اى عدد
    // maxAge: false
    // }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        // deps ==>اللى هتحتاجها عشان تعمل انجيكت للفنكشن اللى راجعة  dependancesدى اراى بتقول لانجلر اعمل انجيكت على ال
        deps: [HttpClient]
      }
    })
    // CoreModule.forRoot()
  ],
  providers: [ActivateGuards, childrenGuard, deactivateGuards,
    // ServiceService,
   // بدل ما اكتب اسم السرفيس ممكن اكتب كدة
   // هنا اعتبر ان اسم الكلاس هو نفسة اسم التوكين
   // useClass بتعمل نيو انستنس من السرفيس ( provider definition object )
   //provide holds the token
  //  [{provide:ServiceService,useClass:ServiceService}],
   // هنا هينفذ ال ProductService
   // لكن بنفس اسم كلاس
   // ServiceService
  //  [{provide:ServiceService,useClass:ProductService}],
   ProductService,
   httpInterceptorProviders,
  //  useExisting استخدم نفس الانستنس متعملش كريات لوحدة جديدة
  // [{provide:ServiceService,useExisting:ProductService}],
  [{ provide: APP_CONFIG, useValue: 'HERO_DI_CONFIG' }],
 // useValue استخدم الفاليو دى بدل اللى عندك
 [{provide: ServiceService, useValue: {value : 'll'}}],
//
//  [{provide:ServiceService,useFactory:() =>{
//   return x>5? new ServiceService():new ProductService();
//  }}]


  ],
  bootstrap: [AppComponent],
  entryComponents:[ReceiveComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  // .json ==> extension يتاعة الفايلات
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
