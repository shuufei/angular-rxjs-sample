import { Component, Input, OnInit } from '@angular/core';
import { insert, remove, RxState, stateful } from '@rx-angular/state';
import { combineLatest, Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

type FilterCondition = 'completed' | 'all' | 'todo';
type TodoItem = { id: string; title: string; completed: boolean };
type State = {
  title: string;
  items: TodoItem[];
  filterCondition: FilterCondition;
};

@Component({
  selector: 'app-rxangular',
  templateUrl: './rxangular.component.html',
  styleUrls: ['./rxangular.component.scss'],
  providers: [RxState],
})
export class RxangularComponent {
  @Input()
  set title(title: string) {
    this.onChangedInputTitle$.next(title);
  }

  readonly state$ = this.state.$;
  readonly title$ = this.state.select('title');
  readonly items$ = this.state.select('items');
  readonly filterCondition$ = this.state.select('filterCondition');
  readonly filteredItems$ = combineLatest([
    this.items$,
    this.filterCondition$,
  ]).pipe(
    stateful(
      map(([items, condition]) => {
        switch (condition) {
          case 'todo':
            return items.filter((v) => !v.completed);
          case 'completed':
            return items.filter((v) => v.completed);
          case 'all':
            return items;
        }
      })
    )
  );

  readonly onAdd$ = new Subject<void>();
  readonly onRemove$ = new Subject<Pick<TodoItem, 'id'>>();
  readonly onChangedFilterCondition$ = new Subject<FilterCondition>();
  readonly onChangedInputTitle$ = new Subject<string>();

  constructor(private state: RxState<State>) {
    this.state.connect('title', this.onChangedInputTitle$);
    this.state.connect('items', this.onAdd$, (currentState) =>
      insert(currentState.items, {
        id: uuidv4(),
        title: uuidv4().slice(0, 5),
        completed: false,
      })
    );
    this.state.connect('items', this.onRemove$, (currentState, { id }) =>
      remove(currentState.items, { id }, 'id')
    );
    this.state.connect('filterCondition', this.onChangedFilterCondition$);
    this.state.hold(this.items$, (items) => {
      this.postItems(items);
    });
    this.state.hold(
      merge(this.onAdd$, this.onRemove$, this.onChangedFilterCondition$),
      console.log
    );
    this.state.set({
      items: [
        { id: uuidv4(), title: 'todo0', completed: false },
        { id: uuidv4(), title: 'todo1', completed: true },
        { id: uuidv4(), title: 'todo2', completed: false },
        { id: uuidv4(), title: 'todo3', completed: true },
        { id: uuidv4(), title: 'todo4', completed: false },
        { id: uuidv4(), title: 'todo5', completed: true },
      ],
      filterCondition: 'all',
      title: '',
    });
  }

  postItems(items: State['items']): void {
    console.log('-- post items', items);
    // 送信処理
  }
}
