import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/Project';
import { ModalService } from '../services/model.service';
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-create-project-component',
  templateUrl: './create-project-component.component.html',
  styleUrls: ['./create-project-component.component.css'],
  providers: [ProjectService, DatePipe]
})

export class CreateProjectComponentComponent implements OnInit {

  projectForm: FormGroup;
  submitted = false;
  pageMessage: string;
  projectId: number;
  userId: number;
  manager: string;
  managers: Array<UserModel> = [];
  searchManager: string;

  @Input() project: ProjectModel;

  addButtonTitle = 'Add';
  pageTitle = 'Add Project';
  priority: number;
  allowDateSelection: boolean;
  showAlert: boolean;
  alertType: string;

  constructor(private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _modalService: ModalService,
    private _loggingService: LoggingService,
    private _datePipe: DatePipe) {
    this.OnComponentLoad();
  }

  OnComponentLoad() {
    this.pageMessage = '';
    this.project = new ProjectModel();

    this.ngOnInit();
  }

  ngOnInit() {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 1);

    this.projectForm = this._formBuilder.group(
      {
        projectId: [0],
        projectName: ['', Validators.required],
        setStartAndEndDate: [false],
        startDate: new FormControl({ value: '', disabled: true }),
        endDate: new FormControl({ value: '', disabled: true }),
        priority: [0],
        manager: [this.manager, Validators.required],
        userId: [this.userId]
      });

    this.setStartAndEndDate(today, endDate);

    this._activatedRoute.paramMap.subscribe(pm => {
      const id = +pm.get('id');
      if (id > 0) {
        this.getByProjectId(id);
      }
    });

    this.loadManagaers();
  }

  setStartAndEndDate(start: Date, end: Date) {
    const formattedTodayDate = this._datePipe.transform(start, AppSettings.IsoDateFormat).toString();
    const formattedTomorrowDate = this._datePipe.transform(end, AppSettings.IsoDateFormat).toString();
    this.projectForm.patchValue({ startDate: formattedTodayDate, endDate: formattedTomorrowDate });
  }

  loadManagaers() {
    this._projectService.getAllManagers().subscribe((data: Array<UserModel>) => {
      this.managers = data;
    });
  }

  openModal(id: string) {
    this._modalService.open(id);
  }

  closeModal(id: string) {
    this._modalService.close(id);
  }

  resetForm() {
    this.submitted = false;
    this.projectForm.reset();
    this.addButtonTitle = 'Add';
    this.priority = 0;
    this.projectForm.controls['priority'].setValue(this.priority);
  }

  get f() { return this.projectForm.controls; }

  changeDate(e) {
    this.allowDateSelection = !(e.target.checked);
    this.changeDateControlState();
  }

  changeDateControlState() {
    if (!this.allowDateSelection) {
      this.projectForm.controls[AppSettings.StartDateFieldName].enable();
      this.projectForm.controls[AppSettings.EndDateFieldName].enable();
    } else {
      this.projectForm.controls[AppSettings.StartDateFieldName].disable();
      this.projectForm.controls[AppSettings.EndDateFieldName].disable();
    }
  }

  displayPageMessage(alertType: string, message: string) {
    this.pageMessage = message;
    this.showAlert = true;
    this.alertType = (alertType === AppSettings.AlertDanger)
      ? AppSettings.AlertDangerClass
      : AppSettings.AlertSuccessClass;
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  setSelectedManager(m: UserModel) {
    this.projectForm.controls['userId'].setValue(m.UserId);
    this.projectForm.controls['manager'].setValue(m.FirstName + ' ' + m.LastName);
  }

  getByProjectId(id) {
    this._projectService.getById(id).subscribe((p) => {
      this.addButtonTitle = 'Update';
      this.pageTitle = 'Manage Project - ' + p.ProjectName;
      this.project = p;
      this.patchModel(p);
      this.priority = p.Priority;
      this.setStartAndEndDate(p.StartDate, p.EndDate);
      this.changeDateControlState();
    });
  }

  patchModel(p: ProjectModel) {
    this.projectForm.patchValue({
      projectId: p.ProjectId,
      projectName: p.ProjectName,
      startDate: p.StartDate,
      endDate: p.EndDate,
      priority: p.Priority,
      manager: p.Manager,
      userId: p.UserId,
      setStartAndEndDate: false
    });
  }

  onSubmit() {
    this.submitted = true;

    const sd = Date.parse(this.projectForm.value.startDate);
    const ed = Date.parse(this.projectForm.value.endDate);

    if (ed <= sd || (isNaN(sd) || isNaN(ed))) {
      this.displayPageMessage(AppSettings.AlertDanger, 'End date should be greater than start date or date fields are empty');
      return;
    }

    if (this.projectForm.invalid) {
      return;
    }

    this._projectService.createOrUpdateProject(this.projectForm.value)
      .subscribe((data) => {
        this.resetForm();
        this.displayPageMessage(AppSettings.AlertSuccess, 'Project details has been successfully saved/updated.');
        this._router.navigate(['/projects/0?r=' + Math.floor(Math.random() * 1000)]);
      },
        (erorr) => {
          this._loggingService.LogError(erorr);
          this.displayPageMessage(AppSettings.AlertDanger, AppSettings.GenericError);
        });
  }
}
