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

  categories: any;

  newItemName: string = '';

  newItemDescription: string = '';

  newItemQuantity: number = 1;

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

    this.getAllCategories();
  }

  getAGroceryListForUser() {
    this.service.getAGroceryListForUser(this.userId, this.groceryListId)
      .subscribe(response => {
        this.groceryList = response;
        this.groceryList.items.sort((a: any, b: any) => {
          if (a.category.name < b.category.name) {
            return -1;
          }
          if (a.category.name > b.category.name) {
            return 1;
          }
          // When category names are equal:
          return 0;
        })
      });
  }

  addItem(event: any) {
    if (this.newItemName === '') {
      this.message = 'Not valid. Please enter new item name to start.';
      return;
    }

    this.message = '';
    this.service.createItem(this.userId, this.groceryListId, this.categoryId, this.newItemName, this.newItemDescription, this.newItemQuantity)
      .subscribe({
        next: (response: any) => {
          this.getAGroceryListForUser();
          this.newItemName = '';
          this.newItemDescription = '';
          this.newItemQuantity = 0;
          this.categoryId = 0;

          // Manually close modal after validation passed:
          document.getElementById('closeModalButton')!.click();
        },
        error: error => {
          this.message = error.error.message;
        }}
      );

  }

  deleteItem(itemId: number) {
    this.service.deleteItem(this.userId, this.groceryListId, itemId)
      .subscribe((response: any) => {
        this.getAGroceryListForUser();
      });
  }

  getAllCategories() {
    this.service.getAllCategories()
      .subscribe(response => {
        this.categories = response;
      });
  }

}
