import { Routes } from '@angular/router';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminAuthGuard } from '../guards/admin-auth.guard';

export const adminDashboardRoutes: Routes = [
    {
        path: 'admindashboard', component: AdminlayoutComponent, canActivate: [AdminAuthGuard],
        children: [{ path: '', redirectTo: 'adminhome', pathMatch: 'full' },
        { path: 'adminhome', component: AdminhomeComponent }
        ]
    }
];