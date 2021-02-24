import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Task} from '../../classes/task';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.scss']
})
export class TaskSaveComponent implements OnChanges{

  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  @Input() task: Task = new Task();
  @Output() savedTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deletedTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() hideDialog: EventEmitter<any> = new EventEmitter<any>();
  taskForm: FormGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      done: new FormControl(),
      date: new FormControl(),
      deleted: new FormControl()
    }
  )
  private dialogRef: MatDialogRef<any>;
  @ViewChild('saveTaskDialog') dialogElement: TemplateRef<any>;
  public errors: Map<string, string> = new Map<string, string>();

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.task.isFirstChange()) {
      if (this.task && changes.task) {
        this.taskForm.patchValue(this.task);
        this.dialogRef = this.dialog.open(this.dialogElement);
        this.dialogRef.afterClosed().subscribe(() => {
          this.hideDialog.emit();
        })
      }
    }
  }

  saveTask() {
    this.taskService.saveTask(this.taskForm.getRawValue()).subscribe(savedTask => {
        this.savedTask.emit(savedTask);
        this.dialogRef.close();
      },
      (error => {
        for(let key of Object.keys(error.error.validationErrors)){
          let control = this.taskForm.get(key);
          control.setErrors({incorrect: true});
          control.markAsTouched();
          this.errors.set(key, error.error.validationErrors[key]);
        }
      }))
  }

  deleteTask(){
    this.taskService.deleteTask(this.taskForm.getRawValue().id).subscribe(response => {
      if(response){
        this.savedTask.emit(response);
      }else {
        this.deletedTask.emit(this.task.id);
      }
      this.dialogRef.close();
    },
      () => {})
  }

  restoreTask(){
    this.taskForm.get('deleted').setValue(false);
    this.taskService.restoreTask(this.taskForm.getRawValue()).subscribe(savedTask => {
      this.savedTask.emit(savedTask);
      this.dialogRef.close();
    },
      () => {})
  }
}
