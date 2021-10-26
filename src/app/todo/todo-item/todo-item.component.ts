import {Component, Input} from '@angular/core';
import {TodoType} from "../store/todo.type";
import {CheckTodo, RemoveTodo} from "../store/todo.action";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent{
  @Input() todo!: TodoType

  constructor(private store: Store) {}

  handleRemoveTodo(id: string) {
    this.store.dispatch(new RemoveTodo(id))
  }

  handleCheckTodo(id: string): void {
    this.store.dispatch(new CheckTodo(id))
  }
}
