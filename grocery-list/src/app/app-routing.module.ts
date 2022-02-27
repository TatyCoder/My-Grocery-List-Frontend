import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { ItemsComponent } from './items/items.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent
},
{
  path: 'user/:userId',
  component: GroceryListComponent,
  children: [
    {
      path: 'groceryList/:groceryListId',
      component: ItemsComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
