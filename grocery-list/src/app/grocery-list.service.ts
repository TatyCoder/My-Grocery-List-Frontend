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

  createUser(name: string) {
    return this.http
    .post('/api/user', {name: name}); 
  }
}
