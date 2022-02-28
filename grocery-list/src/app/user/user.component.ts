import { Component, OnInit } from '@angular/core';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users: any;

  userIdToDelete: number = 0;

  newUserName: string = '';

  message: string = '';

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
    if (this.newUserName === '') {
      this.message = 'Not valid. Please enter a user name.';
      return;
    }
    this.message = '';
    this.service.createUser(this.newUserName)
      .subscribe((response: any) => {
        this.getAllUsers();
        this.newUserName = '';
      });
  }

  deleteUser() {
    this.service.deleteUser(this.userIdToDelete)
      .subscribe((response: any) => {
        this.getAllUsers();
        // Manually close modal after validation passed:
        document.getElementById('closeModalButton')!.click();
      });
  }

  showModal(userId: number) {
    // https://stackoverflow.com/questions/62827002/bootstrap-v5-manually-call-a-modal-mymodal-show-not-working-vanilla-javascrip
    const deleteUser = document.getElementById('deleteUser');
    const bsModal = (window as any).bootstrap.Modal;
    const modal = bsModal.getOrCreateInstance(deleteUser);
    this.userIdToDelete = userId;
    modal.show();
  }

}
