import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Task} from '../../classes/task';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnChanges{


  constructor() { }

  @ViewChild(MatTable) table: MatTable<any>;
  @Input()tasks: Task[];
  @Output() taskSelect: EventEmitter<Task> = new EventEmitter<Task>();
  displayedColumns: string[] = ['title', 'description', 'done', 'date'];
  today: Date = new Date();
  innerWidth: number;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.tasks = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tasks.currentValue && !changes.tasks.firstChange && this.innerWidth > 576){
      this.table.renderRows();
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  selectTask(task: Task){
    this.taskSelect.emit(task);
  }

}
