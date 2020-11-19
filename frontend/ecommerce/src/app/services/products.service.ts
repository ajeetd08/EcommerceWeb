import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _products = [];
  _cart = [];
  productsSub: BehaviorSubject<any[]>;
  cartSub: BehaviorSubject<any[]>;
  constructor(private http: HttpClient) {
    this.productsSub = new BehaviorSubject<any[]>(this._products);
    this.cartSub = new BehaviorSubject<any[]>(this._cart);
  }


  adminAddProduct(inputProduct: Product) {
    return this.http.post('/producttransaction', inputProduct);
  }

  adminDeleteProduct(inputProduct: Product) {
    return this.http.post('/deleteproduct', inputProduct)
  }

  fetchProducts() {
    this.http.get<any[]>('/products').subscribe(data => {
      this._products = [...data];
      this.productsSub.next([...this._products]);
    })

  }

  getProducts() {
    return this.productsSub.asObservable();
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  findItemInCart(id) {
    const item = this._cart.filter(product => product._id === id);
    return item;
  }

  findItemInProducts(id) {
    const item = this._products.filter(product => product._id === id);
    return item;
  }

  addToCart(id) {
    const product = this.findItemInProducts(id);
    if (product.length !== 0) {
      if (this.findItemInCart(id).length) {
        this.removeFromCart(id);
      } else {
        this._cart.push(product[0]);
      }
      this.cartSub.next([...this._cart]);
    }
  }

  removeFromCart(id) {
    if (this.findItemInCart(id).length) {
      const item = this.findItemInCart(id)[0];
      const index = this._cart.indexOf(item);
      this._cart.splice(index, 1);
    }
    this.cartSub.next([...this._cart]);
  }

  clearCart() {
    this._cart = [];
    this.cartSub.next([...this._cart]);
  }




}
