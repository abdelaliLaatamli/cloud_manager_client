import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashParamsComponent } from './dash-params.component';

describe('DashParamsComponent', () => {
  let component: DashParamsComponent;
  let fixture: ComponentFixture<DashParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
