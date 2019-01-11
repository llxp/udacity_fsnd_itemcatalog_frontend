/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
import {Inject, Injectable, NgZone, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../User';
import {DOCUMENT} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {catchError, tap} from 'rxjs/operators';
import {Category} from '../Category';
import {LoggingService} from './logging.service';

const clientId: string = '1011824361501-id0m8g61iu283r7mbd086t7c0d0glmdc.apps.googleusercontent.com';
const googleOauthUrl = 'https://accounts.google.com/o/oauth2/auth';
const redirectUri: string = 'http://localhost:4200/user/gconnect';
const scopes: string[] = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/plus.login',
  'openid',
  'email',
  'https://www.googleapis.com/auth/plus.me'
];
const newSessionUrl: string = 'http://localhost:5000/api/user/new_session';
const userInfoUrl: string = 'http://localhost:5000/api/user/userinfo';
const gconnectUrl: string = 'http://localhost:5000/api/user/gconnect';
const gdisconnectUrl: string = 'http://localhost:5000/api/user/gdisconnect';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedIn: boolean = false;
  public user: Subject<User> = new Subject<User>();

  constructor(private httpClient: HttpClient,
              private zone: NgZone,
              @Inject(DOCUMENT) private document: any,
              private logging: LoggingService) {
    if (localStorage.getItem('session_token')) {
      console.log("got user info...");
      this.getUserInfo();
    } else {
      console.log("cookie not present...");
    }
  }

  // get the session token from the rest api
  private getSessionToken(): Observable<string> {
    return this.httpClient.get<string>(newSessionUrl);
  }

  // makes a request to the google endpoint to get the authorization code
  // --> redirect to http://localhost:4200/user/gconnect
  public getAutorizationCode(): void {
    if (!localStorage.getItem('session_token')) {
      this.getSessionToken().subscribe(sessionToken => {
        this.getNewAuthorizationCode(sessionToken);
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    });
    } else {
      const sessionToken: string = localStorage.getItem('session_token');
      console.log('cookie is present...: ' + sessionToken);
      if (sessionToken.length > 0) {
        this.getNewAuthorizationCode(sessionToken);
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      }
    }
  }

  private getNewAuthorizationCode(sessionToken: string): void {
    const joinedScopes: string = scopes.join('+');
    const googleUrl = googleOauthUrl +
      '?client_id=' + clientId +
      '&redirect_uri=' + redirectUri +
      '&scope=' + joinedScopes +
      '&response_type=code&state=' + sessionToken;
    console.log('sign In ...: ' + googleUrl);
    // redirect to the google url to start the authorization process
    this.document.location.href = googleUrl;
  }

  // makes a request to the rest api to the user info
  public sendCode(code: string, sessionToken: string): void {
    // this.getStateToken().subscribe(stateToken => {
    console.log('sendCode: stateToken: ' + sessionToken);
    localStorage.setItem('session_token', sessionToken);
    console.log('the cookie was set: ' + localStorage.getItem('session_token'));
    this.httpClient.post<string>(gconnectUrl + '?session_token=' + sessionToken, code, {observe: 'response'})
      .subscribe(response => {
          console.log('data...');
          console.log(response);
          if (response.status === 200) {
            this.getUserInfo();
            console.log('logged in... getUserInfo()');
          }
        },
        error => {
          if (error.status === 401) {
            console.log('invalid token state');
            localStorage.removeItem('session_token');
            this.getAutorizationCode();
          }
        });
    // });
  }

  public getUserInfo(): void {
    if (localStorage.getItem('session_token').length > 0) {
      console.log('getUserInfo()');
      console.log('the cookie was set: ' + localStorage.getItem('session_token'));
      const sessionToken: string = localStorage.getItem('session_token');
      this.httpClient.get<User>(userInfoUrl + '?session_token=' + sessionToken)
      .subscribe(data => {
        this.loggedIn = true;
        this.user.next(data);
      });
    }
  }

  public signOut(): void {
    const sessionToken: string = localStorage.getItem('session_token');
    this.httpClient.get(gdisconnectUrl + '?session_token=' + sessionToken)
    .subscribe(data => {
      this.loggedIn = false;
      console.log('data...');
      console.log(data);
      this.user = null;
      localStorage.removeItem('session_token');
      });
  }
}

