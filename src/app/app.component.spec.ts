// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { Component } from '@angular/core';

// import { Routes, RouterModule } from '@angular/router';
// import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
// import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
// import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
// import { ListTaskComponentComponent } from './list-task-component/list-task-component.component';
// import { UserListComponentComponent } from './user-list-component/user-list-component.component';

// describe('AppComponent', () => {
//   const routes: Routes = [
//     { 'path': '', redirectTo: 'projects/0', pathMatch: 'full' },
//     { 'path': 'users/:id', component: CreateUserComponentComponent },
//     { 'path': 'projects/:id', component: CreateProjectComponentComponent },
//     { 'path': 'tasks/:id', component: CreateTaskComponentComponent },
//     { 'path': 'view-tasks', component: ListTaskComponentComponent },
//     { 'path': 'user-list', component: UserListComponentComponent }
//   ];
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         ListTaskComponentComponent,
//         CreateUserComponentComponent,
//         CreateProjectComponentComponent,
//         CreateTaskComponentComponent,
//         UserListComponentComponent
//       ],
//       imports: [RouterModule.forRoot(routes)],
//       providers: [{ provide: Component, userValue: '/'}]
//     }).compileComponents();
//   }));

//   it(`should have as title 'Project Manager'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     console.log(app.title);
//     expect(app.title).toEqual('Project Manager');
//   }));

//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1 a').textContent).toContain('Project Manager');
//   }));
// });
