import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashInstancesComponent } from './dash-instances.component';

describe('DashInstancesComponent', () => {
  let component: DashInstancesComponent;
  let fixture: ComponentFixture<DashInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
