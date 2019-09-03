import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/User';
import { AppSettings } from '../models/AppSettings';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserModel[]>(AppSettings.UsersBaseUrl);
  }

  getById(id: number) {
    return this.httpClient.get<UserModel>(AppSettings.UsersBaseUrl + '/' + id);
  }

  delete(id: number) {
    const deleteUrl = AppSettings.UsersBaseUrl + '/delete/' + id;
    return this.httpClient.post<any>(deleteUrl, {});
  }

  createOrUpdateUser(user) {
    return this.httpClient.post(AppSettings.UsersBaseUrl, user);
  }
}
