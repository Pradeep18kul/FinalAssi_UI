// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DebugElement } from '@angular/core';

// import { CreateUserComponentComponent } from './create-user-component.component';
// import { UserListComponentComponent } from '../user-list-component/user-list-component.component';
// import { LoggingService } from '../services/logging.service';

// describe('CreateUserComponentComponent', () => {
//     let comp: CreateUserComponentComponent;
//     let fixture: ComponentFixture<CreateUserComponentComponent>;
//     let debugElemtnt: DebugElement;
//     let htmlElement: HTMLElement;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [CreateUserComponentComponent
//             ],
//             imports: [BrowserModule,
//                 FormsModule,
//                 ReactiveFormsModule
//             ]
//         }).compileComponents().then(() => {
//             fixture = TestBed.createComponent(CreateUserComponentComponent);
//             comp = fixture.componentInstance;
//             debugElemtnt = fixture.debugElement.query(By.css('form'));
//             htmlElement = debugElemtnt.nativeElement;
//         });
//     }));

//     it('Should have title "Add User"', async(() => {
//         expect(comp.pageTitle).toContain('Add User');
//     }));

// });
