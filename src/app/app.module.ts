import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { ReactiveTodoPageComponent } from './reactive-todo-page/reactive-todo-page.component';
import { ReactiveSandboxComponent } from './reactive-sandbox/reactive-sandbox.component';
import { LateSubscriberComponent } from './components/late-subscriber/late-subscriber.component';
import { Step0Component } from './angular-reactive-component/step0/step0.component';
import { FinalComponent } from './angular-reactive-component/final/final.component';
import { AngularReactiveComponentComponent } from './angular-reactive-component/angular-reactive-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxangularComponent } from './angular-reactive-component/rxangular/rxangular.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    ReactiveTodoPageComponent,
    ReactiveSandboxComponent,
    LateSubscriberComponent,
    Step0Component,
    FinalComponent,
    AngularReactiveComponentComponent,
    RxangularComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
