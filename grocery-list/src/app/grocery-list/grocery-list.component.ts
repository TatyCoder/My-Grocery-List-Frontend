import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryListService } from '../grocery-list.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})

export class GroceryListComponent implements OnInit {

  userId: number = 0;
  userName: string = '';

  groceryLists: any;

  groceryListIdToDelete: number = 0;

  newGroceryListName: string = '';

  message: string = '';

  constructor(private service: GroceryListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getGroceryListsForUser();
    });

    this.service.getUser(this.userId)
      .subscribe(response => {
        this.userName = (response as any).name;
      });
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
      .subscribe({
        next: (response: any) => {
          this.getGroceryListsForUser();
          this.newGroceryListName = '';
        },
        error: error => {
          this.message = error.error.message;
        }
      }
      );
  }

  deleteGroceryList() {
    this.service.deleteGroceryList(this.userId, this.groceryListIdToDelete)
      .subscribe((response: any) => {
        this.getGroceryListsForUser();
        // Manually close modal after validation passed:
        //document.getElementById('closeModalButton')!.click();
        const deleteGroceryList = document.getElementById('deleteGroceryList');
        const bsModal = (window as any).bootstrap.Modal;
        const modal = bsModal.getOrCreateInstance(deleteGroceryList);
        modal.hide();
        // https://www.pluralsight.com/guides/navigating-to-routes-from-code-in-angular
        this.router.navigateByUrl(`/user/${this.userId}`)
      });
  }

  showModal(groceryListId: number) {
    const deleteGroceryList = document.getElementById('deleteGroceryList');
    const bsModal = (window as any).bootstrap.Modal;
    const modal = bsModal.getOrCreateInstance(deleteGroceryList);
    this.groceryListIdToDelete = groceryListId;
    modal.show();
  }

}
