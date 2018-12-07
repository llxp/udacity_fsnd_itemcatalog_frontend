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

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LoginComponent,
    CategoriesMenuComponent,
    ItemPerCategoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
