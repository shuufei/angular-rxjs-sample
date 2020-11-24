import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularReactiveComponentComponent } from './angular-reactive-component.component';

describe('AngularReactiveComponentComponent', () => {
  let component: AngularReactiveComponentComponent;
  let fixture: ComponentFixture<AngularReactiveComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularReactiveComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularReactiveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
