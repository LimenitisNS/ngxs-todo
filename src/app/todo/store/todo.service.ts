import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoType} from "./todo.type";

const URL = 'http://localhost:3001/todos'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TodoType[]>(URL)
  }

  add(payload: string) {
    return this.http.post<TodoType>(URL, {
      title: payload
    })
  }

  remove(id: string) {
    return this.http.delete(`${URL}/${id}`)
  }

  checked(id: string, payload: boolean) {
    return this.http.put<TodoType>(`${URL}/${id}`, {
      isChecked: payload
    })
  }
}
