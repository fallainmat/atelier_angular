import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Robot} from "./robot.model";

export interface RobotModel {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  constructor(private httpClient: HttpClient) {
  }

  getRobots(): Observable<Robot[]> {
    return this.httpClient.get('/assets/mock/robot.json').pipe(map((res: any) => res['robotList'] as Robot[]));
  }

  getRobotById(id: string): Observable<Robot | undefined> {
    return this.getRobots().pipe(map((res: Robot[]) => res.find((robot: Robot) => {
        return id === robot['id'];
    })));
  }
}
