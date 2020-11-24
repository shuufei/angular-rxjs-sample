import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

type FilterCondition = 'completed' | 'all' | 'todo';
type TodoItem = { id: string; title: string; completed: boolean };

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.scss'],
})
export class Step0Component implements OnInit {
  @Input() title = '';

  // Todoリスト
  items: TodoItem[] = [
    { id: uuidv4(), title: 'todo0', completed: false },
    { id: uuidv4(), title: 'todo1', completed: true },
    { id: uuidv4(), title: 'todo2', completed: false },
    { id: uuidv4(), title: 'todo3', completed: true },
    { id: uuidv4(), title: 'todo4', completed: false },
    { id: uuidv4(), title: 'todo5', completed: true },
  ];

  // フィルタされたTodoリスト
  filteredItems: TodoItem[] = [];

  // フィルタ条件
  filterCondition: FilterCondition = 'all';

  constructor() {
    this.executeFilter(); // フィルタ実行
  }

  ngOnInit(): void {}

  executeFilter(): void {
    switch (this.filterCondition) {
      case 'todo':
        this.filteredItems = this.items.filter((v) => !v.completed);
        break;
      case 'completed':
        this.filteredItems = this.items.filter((v) => v.completed);
        break;
      case 'all':
      default:
        this.filteredItems = this.items;
        break;
    }
  }

  changeFilterCondition(condition: FilterCondition): void {
    this.filterCondition = condition;
    this.executeFilter(); // フィルタ実行
  }

  add(): void {
    this.items = [
      ...this.items,
      {
        id: uuidv4(),
        title: uuidv4().slice(0, 5),
        completed: false,
      },
    ];
    this.executeFilter(); // フィルタ実行
  }

  remove(id: string): void {
    this.items = this.items.filter((v) => v.id !== id);
    this.executeFilter(); // フィルタ実行
  }
}
