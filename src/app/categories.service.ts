import { Injectable } from '@angular/core';
import {Category} from "./Category";
import { Observable, Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {LoggingService} from "./logging.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories : Category[];

  constructor(private http: HttpClient,
              private logging: LoggingService) { }

  private getCategory() : Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:5000/categories")
      .pipe(
      tap(heroes => this.logging.log('fetched categories')),
      catchError(this.logging.handleError<Category[]>('getCategory'))
    );
  }

  public getCategories() : void {
    this.getCategory().subscribe(categories => this.categories = categories);
  }

}
