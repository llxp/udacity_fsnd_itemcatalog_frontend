import { CategoriesService } from './../services/categories.service';
import { ItemService } from './../services/item.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-per-category',
  templateUrl: './item-per-category.component.html',
  styleUrls: ['./item-per-category.component.css']
})
export class ItemPerCategoryComponent implements OnInit {

  private id: Number;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.selectedCategory.subscribe(selectedCategory => {
      console.log('category changed...');
      this.itemService.getItems(selectedCategory.id);
    });
  }

}
