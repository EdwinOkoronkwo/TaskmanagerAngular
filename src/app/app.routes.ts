import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskComponent },
  { path: 'create-task', component: TaskFormComponent },
  { path: 'edit-task/:id', component: TaskFormComponent },
  // { path: 'teachers', component: TeachersComponent },
  // { path: '**', component: NotfoundComponent },
];
