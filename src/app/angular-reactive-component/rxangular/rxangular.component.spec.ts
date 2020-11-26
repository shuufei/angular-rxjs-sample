import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxangularComponent } from './rxangular.component';

describe('RxangularComponent', () => {
  let component: RxangularComponent;
  let fixture: ComponentFixture<RxangularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxangularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
