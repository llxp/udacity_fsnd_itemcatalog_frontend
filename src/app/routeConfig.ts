import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CategoriesMenuComponent} from './categories-menu/categories-menu.component';
import {ItemPerCategoryComponent} from './item-per-category/item-per-category.component';

export const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // redirectTo: '/catalog/categories/1'
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'gconnect',
        component: LoginComponent
      },
    ]
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'category/:category_id',
        component: HomeComponent,
        children: [
          {
            path: 'item/:item_id',
            component: HomeComponent
          },
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
