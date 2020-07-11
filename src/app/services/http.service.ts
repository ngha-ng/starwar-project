import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private dataUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  public getAllPersons(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
  public getPerson(personUrl) {
    return this.http.get<Person>(personUrl);
  }
  public getHomeworld(homeUrl) {
    return this.http.get<any>(homeUrl);
  }
}
