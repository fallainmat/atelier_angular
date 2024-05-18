import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

export interface RobotModel {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  constructor(private httpClient: HttpClient) {
  }

  getRobots(): Observable<RobotModel[]> {
    return this.httpClient.get('/assets/mock/robot.json').pipe(map((res: any) => res['robotList'] as RobotModel[]));
  }

  getRobotById(id: string): Observable<RobotModel | undefined> {
    return this.getRobots().pipe(map((res: RobotModel[]) => res.find((robot: RobotModel) => {
        return id === robot['id'];
    })));
  }
}
