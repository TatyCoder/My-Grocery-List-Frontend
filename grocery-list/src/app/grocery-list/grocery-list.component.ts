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

  constructor(private service: GroceryListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getGroceryListsForUser(params['userId']);
      this.userId = params['userId'];
    })
  }

  getGroceryListsForUser(id: number) {
    this.service.getGroceryListsForUser(id)
      .subscribe(response => {
        console.log(response);
        this.groceryLists = response;
      });
  }

  addGroceryList() {
    this.service.createGroceryList(this.userId, this.newGroceryListName)
      .subscribe((response: any) => {
        this.getGroceryListsForUser(this.userId);
        this.newGroceryListName = '';
      });
  }

}
