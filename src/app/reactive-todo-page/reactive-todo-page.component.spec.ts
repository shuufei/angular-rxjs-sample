import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTodoPageComponent } from './reactive-todo-page.component';

describe('ReactiveTodoPageComponent', () => {
  let component: ReactiveTodoPageComponent;
  let fixture: ComponentFixture<ReactiveTodoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveTodoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveTodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
