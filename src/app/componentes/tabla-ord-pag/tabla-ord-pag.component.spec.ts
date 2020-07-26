import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdPagComponent } from './tabla-ord-pag.component';

describe('TablaOrdPagComponent', () => {
  let component: TablaOrdPagComponent;
  let fixture: ComponentFixture<TablaOrdPagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOrdPagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOrdPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
