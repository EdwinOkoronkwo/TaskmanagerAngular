import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { avoidWord, prohibited } from '../../custom-validator';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Subscription } from 'rxjs';
import { Itask } from '../../interfaces/itask';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  priority_level = new Set(['Low', 'Medium', 'High']);
  progress_level = new Set(['Pending', 'Started', 'Completed']);
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId!: number;
  taskSubscription!: Subscription;
  tasks!: Itask[];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {
    this.taskForm = formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          // avoidWord,
          // prohibited(/peter/),
          // prohibited(/god/),
        ],
      ],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      task_date: ['', [Validators.required]],
      priority_level: ['', [Validators.required]],
      progress_level: ['', [Validators.required]],
    });
    // const taskId = this.route.snapshot.paramMap.get('id');
    // if (taskId) {
    //   this.isEditMode = true;
    //   this.taskId = +taskId;
    // }

    this.taskSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.taskId = parseInt(id);
        }
      }
    );

    this.taskSubscription = this.taskService.getTasks().subscribe((results) => {
      this.tasks = results;
      // console.log(this.tasks);
    });

    if (this.taskId) {
      this.taskSubscription = this.taskService
        .getTask(this.taskId)
        .subscribe((result) => {
          console.log(result);
          this.taskForm.patchValue(result);
        });
    }
  }

  onSubmit() {
    this.isEditMode ? this.updateTask() : this.createTask();
    //console.log(this.taskForm.value);
  }

  createTask() {
    const formData = this.taskForm.value;

    //Http call
    if (formData) {
      this.taskSubscription = this.taskService
        .createTask(formData)
        .subscribe((result) => {
          console.log(result);
          alert('Task was created successfully');
          this.taskForm.reset(); //Clear web form data
        });
    }
  }

  updateTask() {
    const formData = this.taskForm.value;

    //Http call
    this.taskSubscription = this.taskService
      .updateTask(this.taskId, formData)
      .subscribe((result) => {
        console.log(result);
        alert('Task was updated successfully');
        this.taskForm.reset(); //Clear web form data
      });
  }

  ngOnDestroy() {
    this.taskSubscription && this.taskSubscription.unsubscribe();
  }

  // Getter
  get titleFormControl() {
    return this.taskForm.get('title');
  }

  get descriptionFormControl() {
    return this.taskForm.get('description');
  }

  get categoryFormControl() {
    return this.taskForm.get('category');
  }

  get taskDateFormControl() {
    return this.taskForm.get('task_date');
  }

  get priorityLevelFormControl() {
    return this.taskForm.get('priority_level');
  }

  get progressLevelFormControl() {
    return this.taskForm.get('progress_level');
  }
}
