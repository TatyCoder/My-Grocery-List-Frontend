import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  groceryLists: any;

  constructor(private service: GroceryListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getGroceryListsForUser(params['userId']);
    })
  }

  getGroceryListsForUser(id: number) {
    this.service.getGroceryListsForUser(id)
      .subscribe(response => {
        console.log(response);
        this.groceryLists = response;
      });
  }

}
