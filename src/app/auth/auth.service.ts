import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = "http://localhost:3002/api/user";
  // private backendUrl = "http://ng-blog-api.projects.farhatsharif.com/api/user";

  constructor(
    private http: HttpClient
  ) { }

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.backendUrl + "/signup", authData)
      .subscribe(response => {
        console.log('response: ', response);
      });
  }
}
