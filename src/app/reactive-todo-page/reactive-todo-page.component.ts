import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

type FilterCondition = 'completed' | 'all' | 'todo';
type TodoItem = { id: string; title: string; completed: boolean };

@Component({
  selector: 'app-reactive-todo-page',
  templateUrl: './reactive-todo-page.component.html',
  styleUrls: ['./reactive-todo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveTodoPageComponent implements OnInit, OnDestroy {
  // Todoリスト
  readonly items$ = new BehaviorSubject<TodoItem[]>([
    { id: uuidv4(), title: 'todo0', completed: false },
    { id: uuidv4(), title: 'todo1', completed: true },
    { id: uuidv4(), title: 'todo2', completed: false },
    { id: uuidv4(), title: 'todo3', completed: true },
    { id: uuidv4(), title: 'todo4', completed: false },
    { id: uuidv4(), title: 'todo5', completed: true },
  ]);

  // フィルタ条件
  readonly filterCondition$ = new BehaviorSubject<FilterCondition>('all');

  // フィルタされたTodoリスト
  readonly filteredItems$ = combineLatest([
    this.items$,
    this.filterCondition$,
  ]).pipe(
    map(([items, condition]) => {
      // フィルタの実行
      switch (condition) {
        case 'todo':
          return items.filter((v) => !v.completed);
        case 'completed':
          return items.filter((v) => v.completed);
        case 'all':
          return items;
      }
    })
  );

  readonly onAdd$ = new Subject();
  readonly onRmove$ = new Subject<{ id: TodoItem['id'] }>();
  readonly onDestroy$ = new Subject();

  constructor() {
    this.onAdd$
      .pipe(withLatestFrom(this.items$), takeUntil(this.onDestroy$))
      .subscribe(([, items]) => {
        const newItem = {
          id: uuidv4(),
          title: uuidv4().slice(0, 5),
          completed: false,
        };
        this.items$.next([...items, newItem]);
      });

    this.onRmove$
      .pipe(withLatestFrom(this.items$), takeUntil(this.onDestroy$))
      .subscribe(([{ id }, items]) => {
        const itemsAfterRemove = items.filter((v) => v.id !== id);
        this.items$.next(itemsAfterRemove);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
