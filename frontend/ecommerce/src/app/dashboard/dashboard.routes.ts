import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { ProductlistComponent } from './productlist/productlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard],
        children: [{ path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'products', component: ProductlistComponent },
        { path: 'cart', component: CartComponent },
        { path: 'checkout', component: CheckoutComponent }]
    }
];