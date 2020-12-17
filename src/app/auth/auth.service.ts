import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userBackendUrl = "http://localhost:3002/api/user";
  // private userBackendUrl = "http://ng-blog-api.projects.farhatsharif.com/api/user";
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.userBackendUrl + "/signup", authData)
      .subscribe(response => {
        console.log('signup response: ', response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string}>(this.userBackendUrl + "/login", authData)
      .subscribe(response => {
        const resToken = response.token;
        this.token = resToken;
        this.authStatusListener.next(true);
      });
  }

}
