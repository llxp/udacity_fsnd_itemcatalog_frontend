import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {routeConfig} from "./routeConfig";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LoginComponent } from './login/login.component';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { ItemPerCategoryComponent } from './item-per-category/item-per-category.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
} from "angularx-social-login";
import {SafePipe} from "./SafePipe";
import {CookieService} from "ngx-cookie-service";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([{
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1011824361501-id0m8g61iu283r7mbd086t7c0d0glmdc.apps.googleusercontent.com")
        }]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LoginComponent,
    CategoriesMenuComponent,
    ItemPerCategoryComponent,
    HomeComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    NgbModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
