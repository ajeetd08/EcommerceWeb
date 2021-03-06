import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(theUser: User) {
    this.authService.adminLogin(theUser).subscribe(data => {
      console.log(data);
      localStorage.setItem('adminuser', JSON.stringify(data));
      this._router.navigate(['/admindashboard']);
    });
  }

}
