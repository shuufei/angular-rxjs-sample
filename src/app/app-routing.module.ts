import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    path: '**',
    redirectTo: '/reactive-todo',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
