import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentLang: string;
  // يعنى اللينك الاكنف
  constructor(public activerout: ActivatedRoute,
              public translate: TranslateService) {
    console.log(this.activerout);
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }
  ngOnInit() {}
  // عشان لما يعمل رفريش ميغيرش اللغة اللى هو اختارها
  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
  }
}
