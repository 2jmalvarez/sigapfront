import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGenComponent } from './tabla-gen.component';

describe('TablaGenComponent', () => {
  let component: TablaGenComponent;
  let fixture: ComponentFixture<TablaGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
