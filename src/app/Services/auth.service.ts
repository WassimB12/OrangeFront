import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by verifying the presence of a JWT token
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    // Remove the token from local storage to log out the user
    localStorage.removeItem('token');
  }
}
