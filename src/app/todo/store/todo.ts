import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddTodo, CheckTodo, FilterTodo, RemoveTodo, SearchTodo} from "./todo.action";
import { TodoType } from "./todo.type";
import { TodoFilter } from "./todoFilter.enum";
import {TodoService} from "./todo.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

export class TodoStateModel {
  todos!: TodoType[];
  search!: string;
  filter!: TodoFilter;
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
    search: '',
    filter: TodoFilter.All
  }
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Selector()
  static getTodos(state: TodoStateModel) {
    switch (state.filter) {
      case TodoFilter.All: {
        return state.todos.filter(
          item => item.title.toUpperCase().includes(state.search.toUpperCase())
        )
      }
      case TodoFilter.COMPLETE: {
        return state.todos.filter(
          item => item.title.toUpperCase().includes(state.search.toUpperCase()) && item.isChecked
        )
      }
      case TodoFilter.NOT_COMPLETE: {
        return state.todos.filter(
          item => item.title.toUpperCase().includes(state.search.toUpperCase()) && !item.isChecked
        )
      }
      default: {
        return state.todos.filter(
          item => item.title.toUpperCase().includes(state.search.toUpperCase())
        )
      }
    }
  }

  @Action(AddTodo)
  async add(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    context.patchState({
      search: ''
    })

    this.todoService.addTodo(action.payload).pipe(tap((result) => {
      console.log(result)
      state.todos.push(result)

      context.patchState({
        todos: state.todos,
      })
    }))
  }

  @Action(RemoveTodo)
  remove(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    context.patchState({
      todos: state.todos.filter(item => item.id !== action.payload)
    })
  }

  @Action(SearchTodo)
  search(context: StateContext<TodoStateModel>, action: SearchTodo) {
    context.patchState({
      search: action.payload
    })
  }

  @Action(CheckTodo)
  check(context: StateContext<TodoStateModel>, action: CheckTodo) {
    const state = context.getState()

    state.todos.map(item => {
      if(item.id === action.payload) {
        item.isChecked = !item.isChecked
      }

      return item
    })

    context.patchState({
      todos: state.todos
    })
  }

  @Action(FilterTodo)
  filter(context: StateContext<TodoStateModel>, action: FilterTodo) {
    context.patchState({
      filter: action.payload
    })
  }
}


