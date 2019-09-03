import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ErrorModel } from '../models/Error';
import { AppSettings } from '../models/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private httpClient: HttpClient) { }

  LogInfo(message: any) {
    const error = new ErrorModel();
    error.LogType = 'Info';
    error.Message = JSON.stringify(message);
    this.InnerLogging(error);
  }

  LogError(message: any) {
    const error = new ErrorModel();
    error.LogType = 'Info';
    error.Message = JSON.stringify(message);
    this.InnerLogging(error);
  }

  private InnerLogging(error: ErrorModel) {
    return this.httpClient.post(AppSettings.LoggingUrl, error);
  }
}
