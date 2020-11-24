import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  ConnectableObservable,
  interval,
  Subject,
  Subscription,
} from 'rxjs';
import {
  map,
  multicast,
  pluck,
  publish,
  publishReplay,
  refCount,
  share,
  shareReplay,
  takeUntil,
  tap,
} from 'rxjs/operators';

type State = {
  id: number;
  title: string;
};

@Component({
  selector: 'app-reactive-sandbox',
  templateUrl: './reactive-sandbox.component.html',
  styleUrls: ['./reactive-sandbox.component.scss'],
})
export class ReactiveSandboxComponent implements OnInit, OnDestroy {
  // Async Pipe
  readonly onClicked = new Subject();
  readonly clickEvent$ = this.onClicked.pipe(map(() => new Date()));

  // Mulicast
  readonly stateForUniMulti = new Subject<State>();
  readonly titleUnicast$ = this.stateForUniMulti.pipe(
    pluck('title'),
    tap((v) => console.log('--- unicast tap'))
  );
  readonly titleMulticast$ = this.stateForUniMulti.pipe(
    pluck('title'),
    tap((v) => console.log('=== multicast tap')),
    share()
  );

  // Hot / Cold
  // readonly stateForHotCold = new Subject<State>();
  readonly stateForHotCold = new BehaviorSubject<State>({ id: 0, title: '' });
  readonly titleCold$ = this.stateForHotCold.pipe(
    pluck('title'),
    tap((v) => console.log('--- cold tap'))
  );
  readonly titleHot$ = this.stateForHotCold.pipe(
    pluck('title'),
    tap((v) => console.log('=== hot tap')),
    // publish()
    // publishReplay(1)
    share()
    // shareReplay(1)
  );

  // Subscription Manage
  readonly subscription = new Subscription();
  readonly onDestroy$ = new Subject();

  constructor() {
    this.initUnicastMulticast();
    this.initHotCold();
    this.initSubscriptionManage();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onDestroy$.next();
  }

  publishUnniMultiState(): void {
    // publish state
    this.stateForUniMulti.next({
      id: 0,
      title: `Title Unicast / Multicast`,
    });
  }

  private initUnicastMulticast(): void {
    // Unicast
    this.titleUnicast$.subscribe((title) =>
      console.log(`title unicast subscribe 1: `, title)
    );
    this.titleUnicast$.subscribe((title) =>
      console.log(`title unicast subscribe 2: `, title)
    );

    // Multicast
    this.titleMulticast$.subscribe((title) =>
      console.log(`title multicast subscribe 1: `, title)
    );
    this.titleMulticast$.subscribe((title) =>
      console.log(`title multicast subscribe 2: `, title)
    );
  }

  publishHotColdState(): void {
    // publish state
    this.stateForHotCold.next({
      id: 0,
      title: `Title Hot / Cold`,
    });
  }

  private initHotCold(): void {
    this.publishHotColdState();
    // (this.titleHot$ as ConnectableObservable<string>).connect();
    // this.titleHot$.subscribe();
    this.titleCold$.subscribe((title) =>
      console.log(`title cold subscribe 1: `, title)
    );
    this.titleHot$.subscribe((title) =>
      console.log(`title hot subscribe 1: `, title)
    );
    this.titleHot$.subscribe((title) =>
      console.log(`title hot subscribe 2: `, title)
    );
  }

  private initSubscriptionManage(): void {
    interval(3000)
      .pipe(
        tap((v) => console.log(`interval: ${v}`)),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
    // this.subscription.add(intervalSubscription);
  }
}
