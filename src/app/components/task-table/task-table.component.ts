import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../classes/task';
import {MatTable} from '@angular/material/table';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit{


  constructor() { }

  @ViewChild(MatTable) table: MatTable<any>;
  @Input()tasks: Observable<Task[]>;
  @Output() taskSelect: EventEmitter<Task> = new EventEmitter<Task>();
  displayedColumns: string[] = ['title', 'description', 'done', 'date'];
  today: Date = new Date();
  innerWidth: number;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  selectTask(task: Task){
    this.taskSelect.emit(task);
  }

}
