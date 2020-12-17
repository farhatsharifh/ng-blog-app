import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userBackendUrl = "http://localhost:3002/api/user";
  // private userBackendUrl = "http://ng-blog-api.projects.farhatsharif.com/api/user";
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.userBackendUrl + "/signup", authData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string, expiresIn: number}>(this.userBackendUrl + "/login", authData)
      .subscribe(response => {
        const resToken = response.token;
        this.token = resToken;
        if(resToken) {
          const expirationDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expirationDuration * 1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

}
