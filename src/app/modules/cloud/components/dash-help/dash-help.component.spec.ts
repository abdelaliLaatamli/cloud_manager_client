import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHelpComponent } from './dash-help.component';

describe('DashHelpComponent', () => {
  let component: DashHelpComponent;
  let fixture: ComponentFixture<DashHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
