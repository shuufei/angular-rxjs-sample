import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

export type State = {
  id: number;
};

@Component({
  selector: 'app-late-subscriber',
  templateUrl: './late-subscriber.component.html',
  styleUrls: ['./late-subscriber.component.scss'],
})
export class LateSubscriberComponent implements OnInit {
  // state$ = new Subject<State>();
  state$ = new ReplaySubject<State>(1);

  @Input()
  set state(value: State) {
    this.state$.next(value);
  }

  constructor() {}

  ngOnInit(): void {}
}
