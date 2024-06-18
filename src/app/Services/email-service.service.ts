import { TableDisplayComponent } from './../table-display/table-display.component';
 import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Email } from '../Entities/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  readonly API_URL = 'http://localhost:8089';

  constructor(private httpClient: HttpClient) { }

  getAllMails(mail1 : any,mail2:any,d1:any,d2:any) {
    return  this.httpClient.get(`${this.API_URL}/send/${mail1}/${mail2}/${d1}/${d2}`)
  }
  getReceiverMails(mail2:any,d1:any,d2:any) {
    return  this.httpClient.get(`${this.API_URL}/receiver/${mail2}/${d1}/${d2}`)
  }

  getLog(id: any,op:any,ip:any) {
    return this.httpClient.get(`${this.API_URL}/log/${id}/${op}/${ip}`, { responseType: 'text' }).pipe(
        catchError(error => {
            console.error('Error:', error);
            throw error;
        })
    );
}
getCouloir(ip:any,id:any,date:any){
 return this.httpClient.get(`${this.API_URL}/Couloir/${ip}/${id}/${date}`, { responseType: 'text' }).pipe(
  catchError(error => {
      console.error('Error:', error);
      throw error;
  })
);}





}

