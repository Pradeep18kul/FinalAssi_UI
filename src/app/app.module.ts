import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';


import { AppComponent } from './app.component';
import { CreateUserComponentComponent } from './create-user-component/create-user-component.component';
import { CreateProjectComponentComponent } from './create-project-component/create-project-component.component';
import { ProjectListComponentComponent } from './project-list-component/project-list-component.component';
import { CreateTaskComponentComponent } from './create-task-component/create-task-component.component';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { ListTaskComponentComponent } from './list-task-component/list-task-component.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './directives/model.component';
import { ModalService } from './services/model.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    UserListComponentComponent,
    CreateUserComponentComponent,
    CreateProjectComponentComponent,
    ProjectListComponentComponent,
    CreateTaskComponentComponent,
    ListTaskComponentComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
