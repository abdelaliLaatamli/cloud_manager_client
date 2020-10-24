import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProvidersComponent } from './dash-providers.component';

describe('DashProvidersComponent', () => {
  let component: DashProvidersComponent;
  let fixture: ComponentFixture<DashProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
