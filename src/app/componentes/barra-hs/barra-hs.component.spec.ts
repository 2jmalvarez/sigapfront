import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraHSComponent } from './barra-hs.component';

describe('BarraHSComponent', () => {
  let component: BarraHSComponent;
  let fixture: ComponentFixture<BarraHSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraHSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraHSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
