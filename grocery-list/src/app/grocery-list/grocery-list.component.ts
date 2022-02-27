import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})

export class GroceryListComponent implements OnInit {

  userId: number = 0;

  groceryLists: any;

  newGroceryListName: string = '';

  message: string = '';

  constructor(private service: GroceryListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getGroceryListsForUser();
    })
  }

  getGroceryListsForUser() {
    this.service.getGroceryListsForUser(this.userId)
      .subscribe(response => {
        this.groceryLists = response;
      });
  }

  addGroceryList() {
    if (this.newGroceryListName === '') {
      this.message = 'Not valid. Please enter a grocery list name.';
      return;
    }
    this.message = '';
    this.service.createGroceryList(this.userId, this.newGroceryListName)
      .subscribe((response: any) => {
        this.getGroceryListsForUser();
        this.newGroceryListName = '';
      });
  }

  deleteGroceryList(groceryListId: number) {
    this.service.deleteGroceryList(this.userId, groceryListId)
      .subscribe((response: any) => {
        this.getGroceryListsForUser();
      });
  }

}
