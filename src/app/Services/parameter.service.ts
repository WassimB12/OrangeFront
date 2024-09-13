import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parameter } from '../Entities/parameter'; // You need to define this model

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private baseUrl = 'http://localhost:8089/parameter'; // Update this URL based on your Spring Boot server

  constructor(private http: HttpClient) { }

  // Fetch parameter by ID
  getParameter(id: number): Observable<Parameter> {
    return this.http.get<Parameter>(`${this.baseUrl}/get/${id}`);
  }

  // Update parameter by ID
  updateParameter(id: number, parameter: Parameter): Observable<Parameter> {
    return this.http.put<Parameter>(`${this.baseUrl}/update/${id}`, parameter);
  }
}
