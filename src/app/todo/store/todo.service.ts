import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoType} from "./todo.type";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  addTodo(payload: string) {
    console.log(6594)
    return this.http.post<TodoType>('http://localhost:3001/todos', payload);
  }
}
