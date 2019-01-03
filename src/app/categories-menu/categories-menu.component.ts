import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {

  constructor(private categoriesService : CategoriesService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.categoriesService.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID: "+ id);
  }

}
