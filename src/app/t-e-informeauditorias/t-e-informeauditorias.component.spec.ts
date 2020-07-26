import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TEInformeauditoriasComponent } from './t-e-informeauditorias.component';

describe('TEInformeauditoriasComponent', () => {
  let component: TEInformeauditoriasComponent;
  let fixture: ComponentFixture<TEInformeauditoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TEInformeauditoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TEInformeauditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
