import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddTodo, CheckTodo, FilterTodo, RemoveTodo, SearchTodo} from "./todo.action";
import { TodoType } from "./todo.type";
import { TodoFilter } from "./todoFilter.enum";

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
export class TodoState {
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
  add(context: StateContext<TodoStateModel>, action: AddTodo) {
    const state = context.getState()

    const newTodo: TodoType = {
      id: Math.random().toString(36).substr(2),
      title: action.payload,
      isChecked: false
    }

    state.todos.push(newTodo)

    context.patchState({
      todos: state.todos,
      search: ''
    })
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


