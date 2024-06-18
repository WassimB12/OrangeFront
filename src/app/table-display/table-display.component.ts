import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import{EmailService} from '../Services/email-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
standalone:false,
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  host: {ngSkipHydration: 'true'},

  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent {
  loading:boolean=true;
  listMails : any;
  logString:any;
  closeResult! : string;
  loading$!: Observable<boolean>;
  form : boolean = false;
checkButton:boolean=true;
couloirString:any;

  constructor(private route: ActivatedRoute,private mailService : EmailService,private modalService: NgbModal) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       const mail1 = params['mail1'] ? params['mail1'].toString() : '';
       const mail2 = params['mail2'] ? params['mail2'].toString() : '';
       const date1 = params['date1'] ? params['date1'].toString() : '';
       const date2 = params['date2'] ? params['date2'].toString() : '';
if(mail1=="form2^^")
  {this.getReceiverMails(mail2, date1, date2);}
 else{this.getMails(mail1, mail2, date1, date2);}
    });
 }


//this.listMails=this.getMails("habib","all","2024-02-13T00:03","2024-02-13T00:03");
      // Now you have the form input values, you can use them as needed

  getMails(mail1 : any,mail2:any,d1:any,d2:any){
    this.mailService.getAllMails(mail1,mail2,d1,d2).subscribe(res => {this.listMails = res; this.loading = false;})}

    getReceiverMails(mail2:any,d1:any,d2:any){
      this.mailService.getReceiverMails(mail2,d1,d2).subscribe(res => {this.listMails = res; this.loading = false;})}
    public getLog(id:any,op:any,ip:any){
      /*if this.logForm.value.id == null -> error message (id required)*/
      this.mailService.getLog(id,op,ip).subscribe(res => {this.logString = res; this.loading = false;})}
      public getCouloir(m:any,ip:any,id:any,date:any){
        /*if this.logForm.value.id == null -> error message (id required)*/
        this.mailService.getCouloir(ip,id,date).subscribe(couloirString =>{m.couloir=couloirString;
       // Assign the value to m.couloir
          m.showDetails = true;//loading ...
        })}







toggle(){this.checkButton=false;}

      open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'custom-modal-width'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        }
        private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
        }
        closeForm(){

        }
        cancel(){
          this.form = false;
        }



}
