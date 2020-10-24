import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTasksComponent } from './dash-tasks.component';

describe('DashTasksComponent', () => {
  let component: DashTasksComponent;
  let fixture: ComponentFixture<DashTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
