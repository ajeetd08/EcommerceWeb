import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../product';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  testProduct: Product;

  productForm = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  doTransaction() {
    this.testProduct = this.productForm.value;
    console.log(this.testProduct);
    /*
    console.log(this.checkoutForm.value);
    alert("Order placed successfully");
    this.productsService.clearCart();
    this.router.navigate(['/dashboard/products']);
    */
  }
}
