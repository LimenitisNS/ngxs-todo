import { Component } from '@angular/core';
import {Store} from "@ngxs/store";
import {AddTodo, FilterTodo, SearchTodo} from "../store/todo.action";
import {TodoFilter} from "../store/todoFilter.enum";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  todoFilter = TodoFilter;

  itemTitle = ''

  constructor(private store: Store) {}

  handleAddTodo(): void {
    this.store.dispatch(new AddTodo(this.itemTitle))
    this.itemTitle = ''
  }

  handleInputEvent(event: Event): void {
    const input = event.target as HTMLInputElement
    if(input) {
      this.store.dispatch(new SearchTodo(input.value))
    }
  }

  handleFilterTodos(filter: TodoFilter) {
    this.store.dispatch(new FilterTodo(filter))
  }
}
