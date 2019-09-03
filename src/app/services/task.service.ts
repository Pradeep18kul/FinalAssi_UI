import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaskModel } from '../models/Task';
import { AppSettings } from '../models/AppSettings';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdateTask(task: TaskModel) {
    return this.httpClient.post(AppSettings.TasksUrl, task);
  }

  completeTask(task: TaskModel) {
    return this.httpClient.post(AppSettings.TasksUrl + '/complete', task);
  }

  getAllParentTasks() {
    return this.httpClient.get<TaskModel[]>(AppSettings.TasksUrl + '/parent-tasks');
  }

  getById(id: number) {
    return this.httpClient.get<TaskModel>(AppSettings.TasksUrl + '/' + id);
  }

  getAll() {
    return this.httpClient.get<TaskModel[]>(AppSettings.TasksUrl);
  }
}
