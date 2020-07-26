import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  // private URL = 'https://4000-fc49cf57-8ea7-4010-a81b-040fe867b8ab.ws-us02.gitpod.io/api';
  private URL = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/tasks');
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }

}
