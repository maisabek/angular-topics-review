import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ngx',
  templateUrl: './ngx.component.html',
  styleUrls: ['./ngx.component.scss']
})
export class NgxComponent implements OnInit {
/*
ودى مكتبة ngx-translate عن طريق ال multi language ازاى نخلى الابلكشن بتاعنا
real time بتشتغل فى ال
الخاص بالانجولار محتاج يعمل ريلود للابلكشن كلةI18n  ولكن ال
اشهر منها ngx-translate ف
ب install  هعملها
npm i @ngx-translate/core --save
app.moduleوهعملها امبورت  فى ال
    TranslateModule.forRoot()
  هيعمل  loader وبعد كدة هنسطب
ب translate لود للملفات بتاعة ال
npm install @ngx-translate/http-loader --save

  */
 Login_by: {en: string, ar: string};
  constructor(public translate: TranslateService) {}
  ngOnInit() {
    this.Login_by = {
      en: 'Login with facebook',
      ar: 'تسجيل دخول بواسطة الفيس بوك'
    };
    this.translate.onLangChange.subscribe(() => {
      console.log(this.translate);
    });
  }




}
