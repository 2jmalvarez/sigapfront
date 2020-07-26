import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TEAuditoriasComponent } from './t-e-auditorias.component';

describe('TEAuditoriasComponent', () => {
  let component: TEAuditoriasComponent;
  let fixture: ComponentFixture<TEAuditoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TEAuditoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TEAuditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
