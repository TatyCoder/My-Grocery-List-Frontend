import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GroceryListService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http
      .get('/api/user');
  }

  getUser(userId: number) {
    return this.http
      .get('/api/user/' + userId);
  }

  createUser(name: string) {
    return this.http
      .post('/api/user', { name: name });
  }

  deleteUser(userId: number) {
    return this.http.delete('/api/user/' + userId);
  }

  getGroceryListsForUser(userId: number) {
    return this.http
      .get('/api/user/' + userId + '/groceryList');
  }

  createGroceryList(userId: number, name: string) {
    return this.http
      .post('/api/user/' + userId + '/groceryList', { name: name });
  }

  deleteGroceryList(userId: number, groceryListId: number) {
    return this.http.delete('/api/user/' + userId + '/groceryList/' + groceryListId);
  }

  getAGroceryListForUser(userId: number, groceryListId: number) {
    return this.http
      .get('/api/user/' + userId + '/groceryList/' + groceryListId);
  }

  createItem(userId: number, groceryListId: number, categoryId: number, name: string, description: string, quantity: number) {
    return this.http
      .post('/api/user/' + userId + '/groceryList/' + groceryListId + '/category/' + categoryId, { name: name, description: description, quantity: quantity });
  }

  deleteItem(userId: number, groceryListId: number, itemId: number) {
    return this.http.delete('/api/user/' + userId + '/groceryList/' + groceryListId + '/item/' + itemId);
  }

  getAllCategories() {
    return this.http
      .get('/api/category');
  }

}
