import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddTodo, RemoveTodo} from "./todo.action";
import { TodoType } from "./todo.type";

export class TodoStateModel {
  todos!: TodoType[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: []
  }
})
export class TodoState {
  @Selector()
  static getTodos(state: TodoStateModel) {
    console.log(23123213)
    return state.todos
  }

  @Action(AddTodo)
  add(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    const newTodo: TodoType = {
      id: Math.random().toString(36).substr(2),
      title: action.payload
    }

    state.todos.push(newTodo)

    context.patchState({
      todos: state.todos
    })
  }

  @Action(RemoveTodo)
  remove(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    context.patchState({
      todos: state.todos.filter(item => item.id !== action.payload)
    })
  }
}
