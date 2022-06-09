import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiURL: string = 'http://localhost:5000'; 
  constructor(private httpClientObj: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const url = this.apiURL+ "/tasks";
    return this.httpClientObj.get<Task[]>(url);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = this.apiURL+ `/tasks/${task.id}`;    
    return this.httpClientObj.delete<Task>(url);

  }

  toggleTask(task: Task): Observable<Task> {    
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = this.apiURL+ `/tasks/${task.id}`;
    return this.httpClientObj.put<Task>(url, task, headerOptions);
  }

  addTask(task: Task): Observable<Task>{
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = this.apiURL+ `/tasks`;
    return this.httpClientObj.post<Task>(url, task, headerOptions);
  }

}
