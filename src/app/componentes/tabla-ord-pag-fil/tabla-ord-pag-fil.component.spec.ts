import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdPagFilComponent } from './tabla-ord-pag-fil.component';

describe('TablaOrdPagFilComponent', () => {
  let component: TablaOrdPagFilComponent;
  let fixture: ComponentFixture<TablaOrdPagFilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOrdPagFilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOrdPagFilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
