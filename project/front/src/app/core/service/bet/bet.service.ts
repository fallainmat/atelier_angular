import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

export interface BetModel {
  id: string;
  name: string;
  status: BetStatus;
  type: BetType;
}

export enum BetStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum BetType {

}

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private httpClient: HttpClient) {}

  getBets(): Observable<BetModel[]> {
    return this.httpClient.get<any>('assets/mock/bet.json').pipe(map((res) => res['betList']));
  }
}
