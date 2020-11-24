import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateSubscriberComponent } from './late-subscriber.component';

describe('LateSubscriberComponent', () => {
  let component: LateSubscriberComponent;
  let fixture: ComponentFixture<LateSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
