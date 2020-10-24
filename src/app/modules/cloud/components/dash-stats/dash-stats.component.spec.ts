import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStatsComponent } from './dash-stats.component';

describe('DashStatsComponent', () => {
  let component: DashStatsComponent;
  let fixture: ComponentFixture<DashStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
