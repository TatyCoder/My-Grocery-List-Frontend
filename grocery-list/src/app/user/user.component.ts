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
    this.getAllUsers();
  }

  private getAllUsers() {
    this.service.getUsers()
      .subscribe(response => {
        this.users = response;
      });
  }

  addUser() {
    this.service.createUser(this.newUserName)
      .subscribe((response: any) => {
        this.getAllUsers();
        this.newUserName = '';
      });
  }

  deleteUser(userId: number) {
    this.service.deleteUser(userId)
      .subscribe((response: any) => {
        this.getAllUsers();
      });
  }

}
