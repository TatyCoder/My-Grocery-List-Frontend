import { Component, OnInit } from '@angular/core';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;

  newUserName: string = '';

  constructor(private service: GroceryListService) { }

  ngOnInit(): void {
    this.service.getUsers()
      .subscribe(response => {
        console.log(response);
        this.users = response;
      });
  }

  addUser() {
    this.service.createUser(this.newUserName)
    .subscribe((response: any) => {
      console.log(response);
      this.users.push(response);
    });
  }

}
