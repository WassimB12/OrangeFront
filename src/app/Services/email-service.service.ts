 import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  readonly API_URL = 'http://localhost:8089';

  constructor(private httpClient: HttpClient) { }

  getAllMails(mail1 : any,mail2:any,d1:any,d2:any) {
    return  this.httpClient.get(`${this.API_URL}/send/${mail1}/${mail2}/${d1}/${d2}`)
  }

  getLog(id: any) {
    return this.httpClient.get(`${this.API_URL}/log/${id}`, { responseType: 'text' }).pipe(
        catchError(error => {
            console.error('Error:', error);
            throw error;
        })
    );
}


}

