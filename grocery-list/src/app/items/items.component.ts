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

  categoryId: number = 0;

  groceryList: any;

  newItemName: string = '';

  newItemDescription: string = '';

  newItemQuantity: number = 0;

  message: string = '';

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
        this.groceryList = response;
      });
  }

  addItem() {
    if (this.newItemName === '') {
      this.message = 'Not valid. Please enter new item name to start.';
      return;
    }
    this.message = '';
    this.service.createItem(this.userId, this.groceryListId, this.categoryId, this.newItemName, this.newItemDescription, this.newItemQuantity)
      .subscribe((response: any) => {
        this.getAGroceryListForUser();
        this.newItemName = '';
        this.newItemDescription = '';
        this.newItemQuantity = 0;
        this.categoryId = 0;
      });
  }


}
