import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAccountsComponent } from './dash-accounts.component';

describe('DashAccountsComponent', () => {
  let component: DashAccountsComponent;
  let fixture: ComponentFixture<DashAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
