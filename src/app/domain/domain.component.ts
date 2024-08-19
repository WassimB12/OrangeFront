import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../Services/email-service.service';
import { DomainService } from '../Services/domain.service';
import { DomainList } from '../Entities/DomainList';
import { Domain } from 'domain';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css',  host: {ngSkipHydration: 'true'},

})
export class DomainComponent {
  listDomain:any;
  loading:boolean=true;
domain!:DomainList;
  closeResult! : string;
form:any;
  constructor(private route: ActivatedRoute,private modalService: NgbModal,private domainService:DomainService) { }

  ngOnInit(): void {

    this.domain={id:null,name:'exemple',respEmail:"becheikh.wassim@esprit.tn"}
    this.getAllDomains();
    this.loading=false;
  }

  getAllDomains(): void {
    this.domainService.getAllDomains()
      .subscribe(res => this.listDomain = res);
  }

  saveDomain(newDomain: any) {
    this.domainService.addDomain(newDomain)
      .subscribe(() => {
        // Handle success
        this.getAllDomains(); // Refresh the list after adding
      });
  }

  deleteDomainById(id: number): void {
    this.domainService.deleteDomain(id)
      .subscribe(() => {
        // Handle success
        this.getAllDomains();
        console.log(id);// Refresh the list after deleting
      });
  }

  updateExistingDomain(updatedDomain: any): void {
    this.domainService.updateDomain(updatedDomain)
      .subscribe(() => {
        // Handle success
        this.getAllDomains(); // Refresh the list after updating
      });
  }



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
