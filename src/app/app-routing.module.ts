import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularReactiveComponentComponent } from './angular-reactive-component/angular-reactive-component.component';
import { FinalComponent } from './angular-reactive-component/final/final.component';
import { Step0Component } from './angular-reactive-component/step0/step0.component';
import { ReactiveSandboxComponent } from './reactive-sandbox/reactive-sandbox.component';
import { ReactiveTodoPageComponent } from './reactive-todo-page/reactive-todo-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoPageComponent,
  },
  {
    path: 'reactive-todo',
    component: ReactiveTodoPageComponent,
  },
  {
    path: 'sandbox',
    component: ReactiveSandboxComponent,
  },
  {
    path: 'angular-reactive-component',
    component: AngularReactiveComponentComponent,
  },
  {
    path: 'angular-reactive-component/step0',
    component: Step0Component,
  },
  {
    path: 'angular-reactive-component/final',
    component: FinalComponent,
  },
  {
    path: '**',
    redirectTo: '/reactive-todo',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
