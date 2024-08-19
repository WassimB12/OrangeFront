import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { DomainList } from '../Entities/DomainList';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private baseUrl = 'http://localhost:8089/domain';
  private ApiUrl ='http://localhost:8089/screen'

  constructor(private http: HttpClient) { }


  addDomain(domain: DomainList): Observable<DomainList> {
    return this.http.post<DomainList>(`${this.baseUrl}/add`, domain);
  }

  deleteDomain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateDomain( updatedDomain: DomainList): Observable<DomainList> {
    return this.http.put<DomainList>(`${this.baseUrl}/update`, updatedDomain);
  }

  getDomainById(id: number): Observable<DomainList> {
    return this.http.get<DomainList>(`${this.baseUrl}/get/${id}`);
  }

  getAllDomains(): Observable<DomainList[]> {
    return this.http.get<DomainList[]>(`${this.baseUrl}/get-all`);
  }

SendScreenMail(domain: any, mail: any) {
  return this.http.get(`${this.ApiUrl}/${domain}/${mail}/2`);
}

}
