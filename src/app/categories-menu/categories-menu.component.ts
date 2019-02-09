import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../services/categories.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {

  private selectedCategory: Number = 1;

  constructor(private categoriesService: CategoriesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoriesService.getCategories();
    /*this.route.url.subscribe(url => {
      console.log('url changed...');
      console.log(url);
      if (url.length >= 1 && url[0].path === 'category') {
        console.log(+url[1].path);
        const id = this.route.snapshot.paramMap.get('category_id');
        console.log('ID: ' + id);
        this.categoriesService.selectCategory(+id);
      }
    });*/
  }

  public selectCategory(id: Number) {
    console.log('selectCategory' + id);
    this.selectedCategory = id;
  }

}
