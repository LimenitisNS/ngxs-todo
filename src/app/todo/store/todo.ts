import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddTodo, CheckTodo, FilterTodo, RemoveTodo, SearchTodo, getTodos} from "./todo.action";
import { TodoType } from "./todo.type";
import { TodoFilter } from "./todoFilter.enum";
import {TodoService} from "./todo.service";
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
  static getFilteredBySearchString(state: TodoStateModel){
    return state.todos.filter(
      item => item.title.toUpperCase().includes(state.search.toUpperCase())
    )
  }

  @Selector([TodoState.getFilteredBySearchString])
  static getTodos(state: TodoStateModel, filtered: TodoType[]) {
    switch (state.filter) {
      case TodoFilter.All: {
        return filtered
      }
      case TodoFilter.COMPLETE: {
        return filtered.filter(
          item => item.isChecked
        )
      }
      case TodoFilter.NOT_COMPLETE: {
        return filtered.filter(
          item => !item.isChecked
        )
      }
      default: {
        return filtered
      }
    }
  }

  @Action(getTodos)
  async get(context: StateContext<TodoStateModel>) {
    this.todoService.get().subscribe((result) => {
      context.patchState({
        todos: result,
      })
    })
  }

  @Action(AddTodo)
  async add(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    context.patchState({
      search: ''
    })

    this.todoService.add(action.payload).subscribe((result) => {
      state.todos.push(result)

      context.patchState({
        todos: state.todos,
      })
    })
  }

  @Action(RemoveTodo)
  remove(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    this.todoService.remove(action.payload).subscribe(() => {
      context.patchState({
        todos: state.todos.filter(item => item.id !== action.payload)
      })
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

    const index = state.todos.findIndex(item => item.id === action.payload)
    const item = state.todos[index]

    this.todoService.checked(action.payload, !item.isChecked).subscribe((result) => {
      console.log(result)

      state.todos[index] = result

      context.patchState({
        todos: state.todos
      })
    })
  }

  @Action(FilterTodo)
  filter(context: StateContext<TodoStateModel>, action: FilterTodo) {
    context.patchState({
      filter: action.payload
    })
  }
}


