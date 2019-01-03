/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
import {Inject, Injectable, NgZone, OnInit} from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {User} from "../User";
import {DOCUMENT} from "@angular/common";
import { CookieService } from 'ngx-cookie-service';
import {catchError, tap} from "rxjs/operators";
import {Category} from "../Category";
import {LoggingService} from "./logging.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  public loggedIn : boolean = false;
  public user: Subject<User> = new Subject<User>();

  constructor(private authService : AuthService,
              private httpClient : HttpClient,
              private zone : NgZone,
              @Inject(DOCUMENT) private document: any,
              private cookieService : CookieService,
              private logging : LoggingService) {
    //this.init();
    //this.loadClient();
  }

  private getSessionToken() : Observable<string> {
    return this.httpClient.get<string>('http://localhost:5000/api/user/new_session');
  }

  public getAutorizationCode() : void {
    let clientId: string = "1011824361501-id0m8g61iu283r7mbd086t7c0d0glmdc.apps.googleusercontent.com";
    let redirectUri = "http://localhost:4200/user/gconnect";
    let scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/plus.login', 'openid', 'email', 'https://www.googleapis.com/auth/plus.me'];

    if(!this.cookieService.check("session_token")) {
      this.getSessionToken().subscribe(stateToken => {
      let googleUrl = "https://accounts.google.com/o/oauth2/auth?client_id=" + clientId +
        "&redirect_uri=" + redirectUri +
        "&scope=" + scopes.join('+') +
        "&response_type=code&state=" + stateToken;
      console.log("sign In ...: " + googleUrl);
      this.document.location.href = googleUrl;
      // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    });
    } else {
      let googleUrl = "https://accounts.google.com/o/oauth2/auth?client_id=" + clientId +
        "&redirect_uri=" + redirectUri +
        "&scope=" + scopes.join('+') +
        "&response_type=code&state=" + this.cookieService.get("session_token");
      console.log("sign In ...: " + googleUrl);
      this.document.location.href = googleUrl;
      // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
  }

  public sendCode(code : string, sessionToken : string) : void {
    //this.getStateToken().subscribe(stateToken => {
    console.log("sendCode: stateToken: " + sessionToken);
    this.cookieService.set("session_token", sessionToken);
    this.httpClient.post<string>('http://localhost:5000/api/user/gconnect?session_token=' + sessionToken, code, {observe: 'response'})
      .subscribe(response => {
          console.log("data...");
          console.log(response);
          if (response.status == 200) {
            this.loggedIn = true;
            this.getUserInfo();
            console.log("logged in... getUserInfo()");
          }
        },
        error => {
          if (error.status == 401) {
            console.log("invalid token state");
            this.cookieService.delete('session_token');
            this.getAutorizationCode();
          }
        });
    //});
  }

  public getUserInfo() : void {
    if(this.loggedIn) {
      console.log("getUserInfo()");
      this.httpClient.get<User>('http://localhost:5000/api/user/userinfo?session_token=' + this.cookieService.get("session_token")).subscribe(data => {
        this.user.next(data);
      });
    }
  }

  public signOut() : void {
    this.cookieService.get("session_token");
    this.httpClient.get('http://localhost:5000/api/user/gdisconnect?session_token=' + this.cookieService.get("session_token")).subscribe(data => {
      console.log("data...");
      console.log(data);
      this.loggedIn = false;
      this.user = null;
      });
  }
}

