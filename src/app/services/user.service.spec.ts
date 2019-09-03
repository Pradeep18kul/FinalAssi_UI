import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserModel } from '../models/User';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
    let userService: UserService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        userService = new UserService(<any>httpClientSpy);

        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });

    it('Should return expected users', () => {
        const expectedUsers: UserModel[] = [
            { UserId: 1, FirstName: 'Raja', LastName: 'S', EmployeeId: 10001 },
            { UserId: 2, FirstName: 'Master', LastName: 'S', EmployeeId: 10002 }
        ];

        httpClientSpy.get.and.returnValue({ subscribe: () => expectedUsers });

        userService.getUsers().subscribe((users) => expect(users).toEqual(expectedUsers, 'expected users'), fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });


    it('Should return an error when user not found (the server returns a 404)', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue({ subscribe: () => errorResponse });

        userService.getById(1).subscribe(
            users => fail('Expected an error, not list of users.'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});
