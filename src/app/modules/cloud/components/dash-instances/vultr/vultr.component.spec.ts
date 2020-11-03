import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VultrComponent } from './vultr.component';

describe('VultrComponent', () => {
  let component: VultrComponent;
  let fixture: ComponentFixture<VultrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VultrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VultrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
