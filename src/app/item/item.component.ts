import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../services/item.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      console.log('changed url...in ItemComponent');
      console.log(url);
      if (url[0].path === 'catalog' && url[1].path === 'category' && url[2].path === 'item') {
        const item_id = this.route.snapshot.paramMap.get('item_id');
        if (item_id && item_id.length > 0) {
          const item_id_number: Number = +item_id;
          this.itemService.selectItem(item_id_number);
          console.log('item selected: ' + item_id_number);
        }
      }
    });
  }

}
