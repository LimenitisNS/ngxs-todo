import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {TodoType} from "../store/todo.type";
import {RemoveTodo} from "../store/todo.action";
import {TodoState} from "../store/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  constructor(private store: Store) {}

  @Select(TodoState.getTodos)
  todos$!: Observable<TodoType[]>;

  handleRemoveTodo(id: string) {
    this.store.dispatch(new RemoveTodo(id))
  }

}
