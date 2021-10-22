import { Component } from '@angular/core';
import {Store} from "@ngxs/store";
import {AddTodo} from "../store/todo.action";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  constructor(private store: Store) {}

  itemTitle = ''

  handleAddTodo(): void {
    this.store.dispatch(new AddTodo(this.itemTitle))
    this.itemTitle = ''
  }
}
