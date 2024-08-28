import { Email } from './../Entities/email';
import { take } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { User } from '../Entities/user';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user',
  standalone: false,

  host: {ngSkipHydration: 'true'},
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @ViewChild('checkbox') checkbox!: ElementRef;
  @ViewChild('emailLogin') emailLogin!: ElementRef;
  users: User[] = [];
  selectedUser: User | null = null;


  inputValue: string | null = null;

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
  user3: User = {
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

  empExists: boolean = false;
  loginError!: string;

  constructor(private router: Router, private userService: UserService,
     private authService:AuthService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.checkEmail();

  }



  login(user: any): void {
    this.getAllUsers();

    this.userService.login(user).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        const token = response.token;
        localStorage.setItem('token', token);
        console.log(localStorage);

        // Now wait for getUserByEmail to complete before navigating
        this.userService.getUserByEmail(user.email).subscribe(
          data => {
            this.user3 = data;
            console.log('User retrieved successfully', this.user3);

            this._snackBar.open('Welcome ' + this.user3.firstName, 'Close', {
              duration: 2000, // Duration in milliseconds
            });

            // Handle successful login and route based on user role
            if (this.user3.role === "admin") {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.error('Error fetching user', error);
            this.errorMessage = 'User not found or an error occurred.';
          }
        );
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


  register(): void {
    if (this.emailExists) {
      this.errorMessage = 'Cannot register with an existing email.';
      return;
    }
    if (this.empExists) {
      this.errorMessage = 'Cannot register with an existing employee ID.';
      return;
    }

    if (!this.emailExists && this.user.firstName && this.user.lastName && this.user.email && this.user.employeId && this.user.password) {
      this.userService.register(this.user).subscribe(
        async response => {
          console.log('User registered successfully', response);
           const token = response.token;
        localStorage.setItem('token', token);

localStorage.setItem('email',this.user.email);
this._snackBar.open('User registered successfully', 'Close', {
  duration: 2000, // Duration in milliseconds
});await new Promise(f => setTimeout(f, 1000));
this.emailLogin.nativeElement.value=localStorage.getItem('email');

this.reloadCurrentRoute();
this.emailLogin.nativeElement.value=localStorage.getItem('email');



        },
        error => {
          console.error('There was an error during the registration process', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );



    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }

}



getAllUsers(): void {
  this.userService.getAllUsers().subscribe(users => {
    this.users = users;
  });
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

  checkEmpID(): void {
    if (this.user.email) {
      this.userService.checkEmpIDExists(this.user.employeId).subscribe(
        exists => {
          this.empExists = exists;
          if (exists) {
            this.errorMessage = 'This employe ID is already in use.';
          } else {
            this.errorMessage = '';
          }
        },
        error => {
          console.error('Error checking employee ID', error);
        }
      );
    }
  }

reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}

  logOut():void{
    this.authService.logout();

  }
  getUserByEmail(email:any): void {
    this.userService.getUserByEmail(email).subscribe(
      data => {
        this.user3 = data;
        console.log('User retrieved successfully', this.user3);
        this.errorMessage = '';
      },
      error => {
        console.error('Error fetching user', error);
        this.errorMessage = 'User not found or an error occurred.';
      }
    );
  }





}
