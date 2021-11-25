import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPatternComponent } from './design-pattern.component';

describe('DesignPatternComponent', () => {
  let component: DesignPatternComponent;
  let fixture: ComponentFixture<DesignPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
