import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  userId: number = 0;

  groceryListId: number = 0;

  groceryList: any;
  

  constructor(private service: GroceryListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.userId = params['userId'];
    });

    this.route.params.subscribe(params => {
      this.groceryListId = params['groceryListId'];
      this.getAGroceryListForUser();
    });
  }

  getAGroceryListForUser() {
    this.service.getAGroceryListForUser(this.userId, this.groceryListId)
      .subscribe(response => {
        console.log(response);
        this.groceryList = response;
      });
  }

}
