import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFourKeysComponent } from './account-four-keys.component';

describe('AccountFourKeysComponent', () => {
  let component: AccountFourKeysComponent;
  let fixture: ComponentFixture<AccountFourKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFourKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFourKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
