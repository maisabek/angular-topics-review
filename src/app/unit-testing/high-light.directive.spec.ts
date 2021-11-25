import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighLightDirective } from './high-light.directive';
import { UnitTestingComponent } from './unit-testing.component';

describe('test on highlight directive', () => {
  let comp:UnitTestingComponent
  let fixture:ComponentFixture<UnitTestingComponent>
  let titleEl:DebugElement
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[HighLightDirective,UnitTestingComponent]
    })
    fixture=TestBed.createComponent(UnitTestingComponent)
    comp=fixture.componentInstance
    titleEl=fixture.debugElement.query(By.css('.my-title'))
  })
  it('onhover background must be yellow', () => {
    titleEl.triggerEventHandler('mouseover',null)
    fixture.detectChanges()
    expect(titleEl.nativeElement.style.backgroundColor).toBe('yellow')
  })
})
