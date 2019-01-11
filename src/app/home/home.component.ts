import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from './../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url[0].path === 'home') {
        this.categoriesService.categories.subscribe(categories => {
          if (categories != null && categories.length > 0) {
            const target: string = '/catalog/categories/' + categories[0].id;
            this.router.navigateByUrl(target);
          }
        });
      }
    });
  }

}
