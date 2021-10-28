import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {TodoType} from "../store/todo.type";
import {TodoState} from "../store/todo";
import {getTodos} from "../store/todo.action";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(TodoState.getTodos)
  todos$!: Observable<TodoType[]>;

  ngOnInit() {
    this.store.dispatch(new getTodos())
  }
}
