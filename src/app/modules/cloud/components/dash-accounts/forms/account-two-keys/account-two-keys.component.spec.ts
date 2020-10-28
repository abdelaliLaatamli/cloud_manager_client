import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTwoKeysComponent } from './account-two-keys.component';

describe('AccountTwoKeysComponent', () => {
  let component: AccountTwoKeysComponent;
  let fixture: ComponentFixture<AccountTwoKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTwoKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTwoKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
