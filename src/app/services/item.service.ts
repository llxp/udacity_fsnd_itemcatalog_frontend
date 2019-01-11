import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../Item';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public items: Observable<Item[]>;
  public selectedItem: Subject<Item> = new Subject<Item>();

  constructor(private http: HttpClient,
    private logging: LoggingService) { }

  public selectItem(id: Number): void {
    if (this.items !== null) {
      this.items.subscribe((items) => {
        for (let i = 0; i < items.length; ++i) {
          const item: Item = items[i];
          if (item.id === id) {
            console.log('selected item: ' + item.id);
            console.log(item.title);
            this.selectedItem.next(item);
          }
        }
      });
    }
  }

  public getItems(category: Number): void {
    this.items = this.http.get<Item[]>('http://localhost:5000/api/catalog/items/' + category)
      .pipe(
      tap(items => this.logging.log('fetched items:' + items.length)),
      catchError(this.logging.handleError<Item[]>('getItem'))
    );
  }
}
