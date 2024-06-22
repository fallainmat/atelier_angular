import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  httpClient = inject(HttpClient);
  api_key = 'vyY7J1VHRVQFwV5Oe67GbGjUZ4n1RR0ik0A76tJM';

  getListOfDailyImages(start_date: Date): Observable<any[]> {
    const start_date_string: string = this.formatISODate(start_date);
    return this.httpClient.get<any[]>(`https://api.nasa.gov/planetary/apod?start_date=${start_date_string}&api_key=${this.api_key}`);
  }

  formatISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
