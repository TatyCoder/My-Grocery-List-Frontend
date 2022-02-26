import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent
},
{
  path: 'user/:userId',
  component: GroceryListComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
