import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itask } from '../../interfaces/itask';
import { TaskComponent } from '../task/task.component';
import { TasksService } from '../../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, HttpClientModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks!: Itask[];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe((results) => {
      this.tasks = results;
    });
  }

  // deleteStudent(taskId: number) {
  //   console.log(taskId);
  //   const index = this.tasks.findIndex((task) => {
  //     return task.id === taskId;
  //   });

  //   this.tasks.splice(index, 1);
  // }

  onDeleteTask(taskId: number) {
    console.log(taskId);
    const index = this.tasks.findIndex((task) => {
      return task.id === taskId;
    });

    //this.tasks.splice(index, 1);
    this.tasks.filter((task) => taskId !== index);
    this.tasksService.deleteTask(taskId).subscribe((result) => {
      console.log('task was deleted');
      window.alert('Task was deleted successfully');
      this.ngOnInit();
    });
  }
}
