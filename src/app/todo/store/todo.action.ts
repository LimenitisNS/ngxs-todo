export class AddTodo {
  static readonly type = '[Todo] Add'

  constructor(public payload: string) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove todo'

  constructor(public payload: string) {}
}
