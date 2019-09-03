// import { TestBed, inject } from '@angular/core/testing';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// import { LoggingService } from './logging.service';

// describe('LoggingService', () => {
//     let loggingService: LoggingService;
//     let httpClientSpy: { get: jasmine.Spy };

//     beforeEach(() => {
//         httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
//         loggingService = new LoggingService(<any>httpClientSpy);

//         TestBed.configureTestingModule({
//             providers: [LoggingService, HttpClient]
//         });
//         loggingService = TestBed.get(LoggingService);
//     });

//     it('should be created', inject([LoggingService], (service: LoggingService) => {
//         expect(service).toBeTruthy();
//     }));
// });
