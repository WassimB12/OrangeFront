import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entities/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  host: {ngSkipHydration: 'true'},
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  email: string="";
  password: string="";
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    employeId: '',
    password: '',
    role: '',
    id: ''
  };

  errorMessage!: string;

  constructor(private http: HttpClient, private router: Router,private userService: UserService) {}

    register(): void {
      this.userService.register(this.user).subscribe(
        response => {
          console.log('User registered successfully');
          // Handle successful registration (e.g., redirect to login page)
         this.router.navigate(['/home']);




        },
        error => {
          console.error('There was an error during the registration process', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    }

  }

