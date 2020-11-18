import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { adminDashboardRoutes } from './admindashboard.routes';
import { RouterModule } from '@angular/router';
import { AdminAuthGuard } from '../guards/admin-auth.guard'



@NgModule({
  declarations: [AdminlayoutComponent, AdminhomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminDashboardRoutes)
  ],
  providers: [AdminAuthGuard]
})
export class AdmindashboardModule { }
