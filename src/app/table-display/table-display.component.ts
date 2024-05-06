import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import{EmailService} from '../Services/email-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
standalone:false,
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  host: {ngSkipHydration: 'true'},

  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent {
  listMails : any;
  logString:any;
  closeResult! : string;
  form : boolean = false;


  constructor(private route: ActivatedRoute,private mailService : EmailService,private modalService: NgbModal) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       const mail1 = params['mail1'] ? params['mail1'].toString() : '';
       const mail2 = params['mail2'] ? params['mail2'].toString() : '';
       const date1 = params['date1'] ? params['date1'].toString() : '';
       const date2 = params['date2'] ? params['date2'].toString() : '';
// if mail1==form2 -> initiate receiverDisplay
       this.getMails(mail1, mail2, date1, date2);
    });
 }


//this.listMails=this.getMails("habib","all","2024-02-13T00:03","2024-02-13T00:03");
      // Now you have the form input values, you can use them as needed

  getMails(mail1 : any,mail2:any,d1:any,d2:any){
    this.mailService.getAllMails(mail1,mail2,d1,d2).subscribe(res => this.listMails = res)}
    public getLog(id:any){
      /*if this.logForm.value.id == null -> error message (id required)*/
      this.mailService.getLog(id).subscribe(res => this.logString = res)}








      open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
