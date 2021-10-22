import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TodoModule { }
