import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itask } from '../interfaces/itask';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Itask[]>('http://localhost:5000/tasks');
  }

  createTask(formData: any) {
    return this.http.post<Itask>('http://localhost:5000/tasks', formData);
  }

  getTask(taskId: number) {
    return this.http.get<Itask>(`http://localhost:5000/tasks/${taskId}`);
  }

  updateTask(taskId: number, formData: any) {
    return this.http.put<Itask>(
      `http://localhost:5000/tasks/${taskId}`,
      formData
    );
  }

  deleteTask(taskId: number) {
    return this.http.delete<Itask>(`http://localhost:5000/tasks/${taskId}`);
  }
}
