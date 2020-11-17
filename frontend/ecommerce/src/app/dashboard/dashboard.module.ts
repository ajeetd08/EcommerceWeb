import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { dashboardRoutes } from './dashboard.routes';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { ProductlistComponent } from './productlist/productlist.component';
import { AppnavComponent } from './appnav/appnav.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
  declarations: [LayoutComponent, HomeComponent, ProductlistComponent, AppnavComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard]
})
export class DashboardModule { }
