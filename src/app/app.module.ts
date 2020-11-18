import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { ReactiveTodoPageComponent } from './reactive-todo-page/reactive-todo-page.component';

@NgModule({
  declarations: [AppComponent, TodoPageComponent, ReactiveTodoPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
