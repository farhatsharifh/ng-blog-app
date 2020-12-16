import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userBackendUrl = "http://localhost:3002/api/user";
  // private userBackendUrl = "http://ng-blog-api.projects.farhatsharif.com/api/user";

  constructor(
    private http: HttpClient
  ) { }

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.userBackendUrl + "/signup", authData)
      .subscribe(response => {
        console.log('signup response: ', response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.userBackendUrl + "/login", authData)
      .subscribe(response => {
        console.log('login response: ', response);
      });
  }

}
