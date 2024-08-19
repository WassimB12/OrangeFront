import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  authenticated = false;
  readonly API_URL = 'http://localhost:8089';

  constructor(private httpClient: HttpClient) {
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.API_URL}/register`, user, {responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.API_URL}/login`, user, {responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      );
  }


  getUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/user`, { withCredentials: true });
  }


  checkEmailExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/check-email`, { params: { email } });
  }
}
