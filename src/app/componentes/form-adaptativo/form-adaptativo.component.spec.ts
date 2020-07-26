import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdaptativoComponent } from './form-adaptativo.component';

describe('FormAdaptativoComponent', () => {
  let component: FormAdaptativoComponent;
  let fixture: ComponentFixture<FormAdaptativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAdaptativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdaptativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
