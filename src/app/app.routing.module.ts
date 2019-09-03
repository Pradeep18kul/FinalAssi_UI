import { NgModule } from '@angular/core';
import { Routes,  RouterModule } from '@angular/router';

import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { ListTaskComponentComponent } from './list-task-component/list-task-component.component';

export const routes: Routes = [
  { 'path': '', redirectTo: 'projects/0', pathMatch: 'full' },
  { 'path': 'users/:id', component: CreateUserComponentComponent },
  { 'path': 'projects/:id', component: CreateProjectComponentComponent },
  { 'path': 'tasks/:id', component: CreateTaskComponentComponent },
  { 'path': 'view-tasks', component: ListTaskComponentComponent },
  { 'path': 'user-list', component: UserListComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
