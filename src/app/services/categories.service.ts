import { Injectable } from '@angular/core';
import {Category} from '../Category';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {LoggingService} from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories: Observable<Category[]> = new Observable<Category[]>();
  public selectedCategory: Subject<Category> = new Subject<Category>();

  constructor(private http: HttpClient,
              private logging: LoggingService) { }

  private getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5000/api/catalog/categories')
      .pipe(
      tap(heroes => this.logging.log('fetched categories')),
      catchError(this.logging.handleError<Category[]>('getCategory'))
    );
  }

  public getCategories(): void {
    // this.getCategory().subscribe(categories => this.categories = categories);
    this.categories = this.getCategory();
  }

  public selectCategory(id: Number) {
    if (this.categories !== null) {
      this.categories.subscribe((categories) => {
        for (let i = 0; i < categories.length; ++i) {
          const category: Category = categories[i];
          if (category.id === id) {
            console.log('selected category: ' + category.id);
            console.log(category.category);
            this.selectedCategory.next(category);
          }
        }
      });
    }
  }

}
