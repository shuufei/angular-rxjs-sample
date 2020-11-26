import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

type FilterCondition = 'completed' | 'all' | 'todo';
type TodoItem = { id: string; title: string; completed: boolean };

type State = {
  title: string;
  items: TodoItem[];
  filterCondition: FilterCondition;
};

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnDestroy {
  @Input()
  set title(title: string) {
    this.onChangedInputTitle$.next(title);
  }

  private readonly stateSubject = new BehaviorSubject<State>({
    title: '',
    items: [
      { id: uuidv4(), title: 'todo0', completed: false },
      { id: uuidv4(), title: 'todo1', completed: true },
      { id: uuidv4(), title: 'todo2', completed: false },
      { id: uuidv4(), title: 'todo3', completed: true },
      { id: uuidv4(), title: 'todo4', completed: false },
      { id: uuidv4(), title: 'todo5', completed: true },
    ],
    filterCondition: 'all',
  });
  readonly state$ = this.stateSubject
    .asObservable()
    .pipe(distinctUntilChanged(), shareReplay(1));
  readonly title$ = this.state$.pipe(
    pluck('title'),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly items$ = this.state$.pipe(
    pluck('items'),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly filterCondition$ = this.state$.pipe(
    pluck('filterCondition'),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly filteredItems$ = combineLatest([
    this.items$,
    this.filterCondition$,
  ]).pipe(
    map(([items, condition]) => {
      switch (condition) {
        case 'todo':
          return items.filter((v) => !v.completed);
        case 'completed':
          return items.filter((v) => v.completed);
        case 'all':
          return items;
      }
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  // Events
  readonly onAdd$ = new Subject<void>();
  readonly onRemove$ = new Subject<{ id: TodoItem['id'] }>();
  readonly onChangedFilterCondition$ = new Subject<FilterCondition>();
  readonly onChangedInputTitle$ = new Subject<string>();
  private readonly onDestroy$ = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {}
}
