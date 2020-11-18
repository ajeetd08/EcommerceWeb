import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _http: HttpClient, private ps: ProductsService) { }

  register(user) {
    return this._http.post('/register', user);
    //localStorage.setItem('user', user);
  }

  login(user) {
    return this._http.post('/login', user);
    //localStorage.setItem('user', user);
  }

  adminLogin(user) {
    localStorage.setItem('adminuser', user);
  }

  logout() {
    localStorage.clear();
    this.ps.clearCart();
    this._router.navigate(['/login']);
  }

  adminLogout() {
    localStorage.clear();
    this._router.navigate(['login']);

  }

  isAuthenticated() {
    console.log(localStorage.getItem('user')); //TEST
    return localStorage.getItem('user');
  }

  isAdminAuthenticated() {
    console.log(localStorage.getItem('adminuser'));
    return localStorage.getItem('adminuser');
  }
}
