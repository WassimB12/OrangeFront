import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entities/user';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user',
  host: {ngSkipHydration: 'true'},
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  email: string = "";
  password: string = "";
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    employeId: '',
    password: '',
    role: '',
    id: ''
  };
  user2: User = {
    firstName: '',
    lastName: '',
    email: '',
    employeId: '',
    password: '',
    role: '',
    id: ''
  };

  errorMessage!: string;
  emailExists: boolean = false;
  loginError!: string;

  constructor(private router: Router, private userService: UserService, private authService:AuthService) {}
  login(user: any): void {
    this.userService.login(user).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        const token = response.token;
        localStorage.setItem('token', token);
        // Handle successful login, e.g., store JWT token, navigate to another page
        this.router.navigate(['/home']);

      },
      error => {
        console.error('There was an error during the login process', error);
        if (error.status === 401) {
          this.loginError = 'Incorrect email or password. Please try again.';
        } else {
          this.loginError = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  onSubmit(event: Event, user: any): void {
    event.preventDefault(); // Prevent the default form submission
    this.login(user);
  }


  checkEmail(): void {
    if (this.user.email) {
      this.userService.checkEmailExists(this.user.email).subscribe(
        exists => {
          this.emailExists = exists;
          if (exists) {
            this.errorMessage = 'This email is already in use.';
          } else {
            this.errorMessage = '';
          }
        },
        error => {
          console.error('Error checking email', error);
        }
      );
    }
  }

  register(): void {
    if (this.emailExists) {
      this.errorMessage = 'Cannot register with an existing email.';
      return;
    }

    this.userService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('There was an error during the registration process', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  logOut():void{
    this.authService.logout();

  }
}
