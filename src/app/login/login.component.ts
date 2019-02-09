import {NgZone, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT } from '@angular/common';

import {LoginService} from '../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              @Inject(DOCUMENT) private document: any,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService) {
  }

  private signInWithGoogle(): void {
    this.loginService.getAutorizationCode();
  }

  private signOut(): void {
    this.loginService.signOut();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        if ('code' in params && 'state' in params) {
          const code = params['code'];
          const stateToken = params['state'];
          // this.cookieService.setCookie('session', session, 365);
          console.log(params);
          console.log(code);
          this.loginService.sendCode(code, stateToken);
          this.router.navigate(['/home']);
        } else {
          this.loginService.getUserInfo();
        }
      });
  }

}
