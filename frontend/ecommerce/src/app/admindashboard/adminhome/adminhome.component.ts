import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  testProduct: Product;
  deleteProduct: Product;

  productForm = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
  });

  productDeleteForm = this.fb.group({
    name: ['', Validators.required],
    image: [''],
    price: [0],
    description: [''],
  });
  constructor(private fb: FormBuilder, private ps: ProductsService) { }

  ngOnInit(): void {
  }

  doTransaction() {
    this.testProduct = this.productForm.value;
    console.log(this.testProduct);
    this.ps.adminAddProduct(this.testProduct).subscribe((data) => {
      console.log(data);
      alert("Your record has been inserted. If the name already exists, the record with the corresponding name has been updated.");
    })
    /*
    console.log(this.checkoutForm.value);
    alert("Order placed successfully");
    this.productsService.clearCart();
    this.router.navigate(['/dashboard/products']);
    */
  }

  deleteTransaction() {
    this.deleteProduct = this.productDeleteForm.value;
    console.log(this.deleteProduct);
    this.ps.adminDeleteProduct(this.deleteProduct).subscribe((data) => {
      console.log(data);
      alert("Your record with input name:" + this.deleteProduct.name + "has been deleted.");
    }, (error) => {
      alert("Record name with name:" + this.deleteProduct.name + " does not exist in database");
    })
  }
}
