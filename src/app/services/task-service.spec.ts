
import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskModel } from '../models/Task';

export class ParentTaskModel {
    ParentTaskId: number;
    ParentTaskName: string;
    constructor() {
    }
}

describe('TaskService', () => {
    let taskService: TaskService;
    let httpClientSpy: { get: jasmine.Spy };

    const expectedTasks: TaskModel[] = [
        {
            TaskId: 1,
            TaskName: 'US12928 - Master layout page design for Defect Trends',
            ProjectId: 1,
            ProjectName: 'Defect Trends',
            IsParentTask: true,
            Priority: 10,
            ParentTaskId: 0,
            ParentTaskName: '',
            StartDate: new Date(),
            EndDate: new Date(),
            Status: 'In Progress',
            ManagerId: 123089,
            ManagerName: 'John Doe'
        },
    ];

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        taskService = new TaskService(<any>httpClientSpy);

        TestBed.configureTestingModule({
            providers: [TaskService]
        });
    });

    it('Should return expected tasks', () => {

        httpClientSpy.get.and.returnValue({ subscribe: () => expectedTasks });

        taskService.getAll().subscribe((users) => expect(users).toEqual(expectedTasks, 'expected tasks'), fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('Should return two parent tasks', () => {
        const expectedParentTasks: ParentTaskModel[] = [
            { ParentTaskId: 1, ParentTaskName: 'US9189 - Design CMD Dashboard' },
            { ParentTaskId: 2, ParentTaskName: 'US82363 - Display overview tiles in App dashboard' }
        ];

        httpClientSpy.get.and.returnValue({ subscribe: () => expectedParentTasks });

        taskService.getAllParentTasks().subscribe(
            tasks => expect(tasks.length).toBe(2, ''),
            error => error(error.message).toContain('test 404 error')
        );
    });

    it('Should return an error when task not found', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue({ subscribe: () => errorResponse });

        taskService.getById(1).subscribe(
            users => fail('Expected an error, not list of users.'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});
