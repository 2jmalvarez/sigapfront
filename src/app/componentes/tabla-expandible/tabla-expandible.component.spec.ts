import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaExpandibleComponent } from './tabla-expandible.component';

describe('TablaExpandibleComponent', () => {
  let component: TablaExpandibleComponent;
  let fixture: ComponentFixture<TablaExpandibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaExpandibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaExpandibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
