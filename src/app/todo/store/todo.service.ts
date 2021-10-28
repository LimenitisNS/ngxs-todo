import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoType} from "./todo.type";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TodoType[]>('http://localhost:3001/todos')
  }

  add(payload: string) {
    return this.http.post<TodoType>('http://localhost:3001/todos', {
      title: payload
    })
  }

  remove(payload: string) {
    return this.http.delete(`http://localhost:3001/todos/${payload}`)
  }

  checked(id: string, payload: boolean) {
    return this.http.put<TodoType>(`http://localhost:3001/todos/${id}`, {
      isChecked: payload
    })
  }
}
