import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-per-category',
  templateUrl: './item-per-category.component.html',
  styleUrls: ['./item-per-category.component.css']
})
export class ItemPerCategoryComponent implements OnInit {

  private id : string;
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Item ID: "+ id);
    this.id = id;
  }

}
