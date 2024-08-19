import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',host: {ngSkipHydration: 'true'},
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private userService: UserService,private authService:AuthService,private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('There was an error fetching the user', error);
      }
    );
  }
  logOut():void{
    this.authService.logout();
    this.router.navigate(['/login']);


  }
}
