import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itask } from '../../interfaces/itask';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: Itask;
  @Output() deleteEvent = new EventEmitter();

  constructor(private taskService: TasksService, private router: Router) {}

  ngOnChanges(value: SimpleChanges) {
    console.log('change');
  }

  // weatherPage() {
  //   this.router.navigate([`../weather/weather-list`]);
  // }

  onDelete() {
    const result = window.confirm('Do you really want to delete this task?');
    if (result) {
      this.deleteEvent.emit(this.task.id);
    }
  }
}
