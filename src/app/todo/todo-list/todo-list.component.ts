import { Component } from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {TodoType} from "../store/todo.type";
import {TodoState} from "../store/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Select(TodoState.getTodos)
  todos$!: Observable<TodoType[]>;
}
