import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Task} from '../classes/task';
import {DoNothingErrorHandler} from '../errorHandler/do-nothing-error-handler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService: ApiService, private doNothingErrorHandler: DoNothingErrorHandler) { }

  public getTasks(): Observable<Task[]>{
    return this.apiService.getAll('/getTasks');
  }

  public saveTask(task: Task): Observable<Task>{
    return this.apiService.postSingle('/saveTask', task, this.doNothingErrorHandler);
  }

  public deleteTask(id: number): Observable<any>{
    return this.apiService.deleteSingle('/deleteTask/' + id);
  }

  public restoreTask(task: Task): Observable<Task>{
    return this.apiService.postSingle('/saveTask', task);
  }

}
