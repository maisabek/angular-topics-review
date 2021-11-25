import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifecycleRoutingModule } from './lifecycle-routing.module';
import {LifecycleComponent} from './lifecycle.component';

@NgModule({
  declarations: [
    LifecycleComponent
  ],
  imports: [
    CommonModule,
    LifecycleRoutingModule
  ]
})
export class LifecycleModule { }
