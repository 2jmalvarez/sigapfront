import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformeAPComponent } from './form-informe-ap.component';

describe('FormInformeAPComponent', () => {
  let component: FormInformeAPComponent;
  let fixture: ComponentFixture<FormInformeAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInformeAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInformeAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
