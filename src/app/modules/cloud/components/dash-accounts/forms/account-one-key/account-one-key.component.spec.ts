import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOneKeyComponent } from './account-one-key.component';

describe('AccountOneKeyComponent', () => {
  let component: AccountOneKeyComponent;
  let fixture: ComponentFixture<AccountOneKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOneKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOneKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
