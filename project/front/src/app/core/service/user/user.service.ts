import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

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
  userCurrent = signal<UserModel | null>(null);

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<void> {
    return this.httpClient.get<UserModel>("assets/mock/user.json").pipe(
      map((res) => {
        this.userCurrent.set(res);
      })
    );
  }
}
