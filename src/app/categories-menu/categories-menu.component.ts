import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {

  constructor(private categories : CategoriesService) { }

  ngOnInit() {
    this.categories.getCategories();
  }

}
