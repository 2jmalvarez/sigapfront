import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private URL = 'https://4000-fc49cf57-8ea7-4010-a81b-040fe867b8ab.ws-us02.gitpod.io/api';
  private URL = 'http://192.168.0.95:4000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUpUser(user) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signInUser(user) {
    // console.log("user: ");
    // console.log(user);

    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('usuar');
    localStorage.removeItem('token');
    localStorage.clear()
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario(){
    return this.http.get<any>(this.URL + '/usuario')

  }

}
