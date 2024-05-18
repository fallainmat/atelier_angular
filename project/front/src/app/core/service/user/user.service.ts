import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  money: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>("assets/mock/user.json");
  }
}
