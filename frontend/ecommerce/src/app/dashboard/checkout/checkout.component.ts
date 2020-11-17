import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart = [];
  cartTotal = 0;
  checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    addressOne: ['', Validators.required],
    addressTwo: [''],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    });
  }

  doCheckout() {
    console.log(this.checkoutForm.value);
    alert("Order placed successfully");
    this.productsService.clearCart();
    this.router.navigate(['/dashboard/products']);
  }

}
