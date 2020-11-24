import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveSandboxComponent } from './reactive-sandbox.component';

describe('ReactiveSandboxComponent', () => {
  let component: ReactiveSandboxComponent;
  let fixture: ComponentFixture<ReactiveSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
