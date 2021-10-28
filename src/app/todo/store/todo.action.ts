import {TodoFilter} from "./todoFilter.enum";

export class AddTodo {
  static readonly type = '[Todo] Add'

  constructor(public payload: string) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove'

  constructor(public payload: string) {}
}

export class SearchTodo {
  static readonly type = '[Todo] Search'

  constructor(public payload: string) {}
}

export class CheckTodo {
  static readonly type = '[Todo] Check'

  constructor(public payload: string) {}
}

export class FilterTodo {
  static readonly type = '[Todo] Filter'

  constructor(public payload: TodoFilter) {}
}

export class getTodos {
  static readonly type = '[Todo] Get'
}
