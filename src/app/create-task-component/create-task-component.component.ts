import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/Project';
import { ModalService } from '../services/model.service';
import { UserModel } from '../models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { LoggingService } from '../services/logging.service';
import { AppSettings } from '../models/AppSettings';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-task-component',
  templateUrl: './create-task-component.component.html',
  styleUrls: ['./create-task-component.component.css'],
  providers: [ProjectService, DatePipe]
})

export class CreateTaskComponentComponent implements OnInit {
  taskForm: FormGroup;
  submitted = false;
  priority: number;
  isParentTask: boolean;
  showAlert: boolean;
  alertType: string;
  managers: Array<UserModel> = [];
  projects: Array<ProjectModel> = [];
  parentTasks: Array<TaskModel> = [];
  searchProject: string;
  searchManager: string;
  searchParentTask: string;
  pageMessage: string;
  task: TaskModel;
  isEditMode: boolean;

  addButtonTitle: string;
  pageTitle: string;

  @Input() project: TaskModel;
  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _router: Router,
    private _modalService: ModalService,
    private _taskService: TaskService,
    private _activatedRoute: ActivatedRoute,
    private _logSerice: LoggingService,
    private _datePipe: DatePipe) {
    this.OnComponentLoad();
  }

  OnComponentLoad() {
    this.task = new TaskModel();
    this.ngOnInit();
  }

  ngOnInit() {

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 1);

    this.taskForm = this._formBuilder.group(
      {
        taskId: [0],
        taskName: ['', Validators.required],
        projectId: [0],
        projectName: ['', Validators.required],
        isParentTask: [false],
        priority: [0],
        parentTaskId: [0],
        parentTaskName: [''],
        startDate: [null],
        endDate: [null],
        managerId: [0],
        managerName: ['']
      });

    this.loadDependencies();
    this.setStartAndEndDate(startDate, endDate);
    this.resetLabels();

    this._activatedRoute.paramMap.subscribe(pm => {
      const id = +pm.get('id');
      if (id > 0) {
        this.getTaskById(id);
      }
    });
  }

  resetLabels() {
    this.pageTitle = 'Add Task';
    this.addButtonTitle = 'Add';
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  loadDependencies() {
    this._projectService.getAllManagers().subscribe((data: Array<UserModel>) => {
      this.managers = data;
    });

    this._projectService.getAll().subscribe((data: Array<ProjectModel>) => {
      this.projects = data;
    });

    this._taskService.getAllParentTasks().subscribe((data: Array<TaskModel>) => {
      this.parentTasks = data;
    });
  }

  openModal(id: string) {
    this._modalService.open(id);
  }

  closeModal(id: string) {
    this._modalService.close(id);
  }

  get f() { return this.taskForm.controls; }

  resetForm() {
    this.taskForm.reset();
    this.submitted = false;
    this.priority = 0;
    this.taskForm.controls['priority'].setValue(0);
    this.isEditMode = false;
    this.resetLabels();
  }

  setSelectedManager(m: UserModel) {
    this.setControlValue('managerId', m.UserId);
    this.setControlValue('managerName', m.FirstName + ' ' + m.LastName);
  }

  setSelectedParentTask(m: TaskModel) {
    this.setControlValue('parentTaskId', m.ParentTaskId);
    this.setControlValue('parentTaskName', m.ParentTaskName);
  }

  setSelectedProject(m: ProjectModel) {
    this.setControlValue('projectId', m.ProjectId);
    this.setControlValue('projectName', m.ProjectName);
  }

  setControlValue(controlName: string, value: any) {
    this.taskForm.controls[controlName].setValue(value);
  }

  onParentTaskSelected(e) {
    this.isParentTask = e.target.checked;
    const controlNames: string[] = ['priority', 'startDate', 'endDate'];

    let index = 0;
    if (this.isParentTask) {
      for (index = 0; index < controlNames.length; index++) {
        this.disableControl(controlNames[index]);
      }
    } else {
      for (index = 0; index < controlNames.length; index++) {
        this.enableControl(controlNames[index]);
      }
    }
  }

  displayPageMessage(alertType: string, message: string) {
    this.pageMessage = message;
    this.showAlert = true;
    this.alertType = (alertType === AppSettings.AlertDanger)
      ? AppSettings.AlertDangerClass
      : AppSettings.AlertSuccessClass;
  }

  enableControl(controlName: string) {
    this.taskForm.controls[controlName].enable();
  }

  disableControl(controlName: string) {
    this.taskForm.controls[controlName].disable();
  }

  getTaskById(id: number) {
    this.isEditMode = true;
    this._taskService.getById(id).subscribe((p) => {
      this.addButtonTitle = 'Update';
      this.pageTitle = 'Manage Task - ' + p.TaskName;
      this.project = p;
      this.patchModel(p);
      this.priority = p.Priority;
      this.setStartAndEndDate(p.StartDate, p.EndDate);
    });
  }

  patchModel(t: TaskModel) {
    this.taskForm.patchValue({
      taskId: t.TaskId,
      taskName: t.TaskName,
      projectId: t.ProjectId,
      projectName: t.ProjectName,
      isParentTask: (t.StartDate == null),
      priority: t.Priority,
      parentTaskId: t.ParentTaskId,
      parentTaskName: t.ParentTaskName,
      startDate: t.StartDate,
      endDate: t.EndDate,
      managerId: t.ManagerId,
      managerName: t.ManagerName
    });
  }

  setStartAndEndDate(start: Date, end: Date) {
    const formattedTodayDate = this._datePipe.transform(start, AppSettings.IsoDateFormat).toString();
    const formattedTomorrowDate = this._datePipe.transform(end, AppSettings.IsoDateFormat).toString();
    this.taskForm.patchValue({ startDate: formattedTodayDate, endDate: formattedTomorrowDate });
  }

  onSubmit() {
    this.submitted = true;
    const sd = Date.parse(this.taskForm.value.startDate);
    const ed = Date.parse(this.taskForm.value.endDate);

    if (ed <= sd) {
      this.displayPageMessage(AppSettings.AlertDanger, 'End date should be greater than start date');
      return;
    }

    if (this.taskForm.invalid) {
      return;
    }

    this._taskService.createOrUpdateTask(this.taskForm.value)
      .subscribe((data) => {
        this._router.navigate(['/view-tasks']);
      },
        (exception) => {

          this.displayPageMessage(AppSettings.AlertDanger, AppSettings.GenericError);
          this._logSerice.LogError(exception);
        });
  }
}
