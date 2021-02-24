import {Component, EventEmitter, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../classes/task';
import {Observable} from 'rxjs';
import {TaskFilter} from '../../classes/task-filter.enum';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private router: Router,
              public translateService: TranslateService) { }

  tasks: Task[] = [];
  displayTasks: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  currentTask: Task;
  taskFilter: TaskFilter = 0;
  currentLang: string = this.translateService.currentLang;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => task.date = new Date(task.date));
      this.tasks = tasks;
      this.filterTasks();
    },
      () => {})
    let filter = JSON.parse(localStorage.getItem('filter'));
    if(filter){
      this.taskFilter = filter;
    }
  }

  saveNewTask(){
    this.currentTask = new Task();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setLanguage(lang: string){
    this.translateService.use(lang);
    this.currentLang = this.translateService.currentLang;
    localStorage.setItem('lang', lang);
  }

  onSavedTask(task: Task){
    task.date = new Date(task.date)
    let oldTask = this.tasks.filter(filterTask => filterTask.id === task.id)[0];
    if(oldTask){
      Object.assign(oldTask, task);
    }else {
      this.tasks.push(task);
    }
    this.filterTasks();
  }

  onDeleteTask(id: number){
    let oldTask = this.tasks.filter(filterTask => filterTask.id === id)[0];
    if(oldTask){
      let index = this.tasks.indexOf(oldTask);
      this.tasks.splice(index, 1);
      this.filterTasks();
    }
  }

  onTaskSelect(task: Task){
    this.currentTask = task;
  }

  onDialogHide(){
    this.currentTask = null;
  }

  setTaskFilter(value: number){
    this.taskFilter = value;
    this.filterTasks();
    localStorage.setItem('filter', JSON.stringify(value));
  }

  filterTasks(){
    let tasksToDisplay: Task[];
    switch (this.taskFilter) {
      case TaskFilter.ALL:
        tasksToDisplay = this.tasks.filter(task => !task.deleted);
        break;
      case TaskFilter.DELETED:
        tasksToDisplay = this.tasks.filter(task => task.deleted);
        break;
      case TaskFilter.FINISHED:
        tasksToDisplay = this.tasks.filter(task => task.done && !task.deleted);
        break;
      case TaskFilter.UNFINISHED:
        tasksToDisplay = this.tasks.filter(task => !task.done && !task.deleted);
        break;
    }
    this.displayTasks.emit(tasksToDisplay);
  }

}
