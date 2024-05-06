import { Component, ElementRef, ViewChild } from '@angular/core';
import { Email } from '../Entities/email';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{EmailService} from '../Services/email-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators,FormControl,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  host: {ngSkipHydration: 'true'},

  styleUrl: './mail.component.css'
})

export class MailComponent {

  listMails : any;
  form : boolean = false;
mail!:Email;
div1:Boolean= false;

div2:Boolean= true;
div3:Boolean= false;
myDateTime:any;

   closeResult! : string;
   logString:any;


emailForm!:FormGroup;
emailForm2!:FormGroup;

logForm!:FormGroup;
JSON: any;
mailId:any;

constructor(private formBuilder: FormBuilder,private router: Router,private mailService : EmailService, private modalService: NgbModal,private route:ActivatedRoute)



{  this.emailForm = this.formBuilder.group({
  mail1: ['habib'],
  mail2: ['all'],
  date: ['2024-02-13T10:30'],
  date2: ['2024-02-13T19:30']
});

this.emailForm2 = this.formBuilder.group({
  mail1: [''],
  mail2: [''],
  date: [''],
  date2: ['']
});
this.logForm = this.formBuilder.group({
  id: [''],

});}

ngOnInit(): void {
  // Access the parameter value using ActivatedRoute
 // this.mailId = this.route.snapshot.params['id'];

  // Alternatively, you can subscribe to changes in the parameters
  const dateElement = document.getElementById('date');
  if (dateElement) {
    dateElement.addEventListener('change', function() {
      this.blur(); // Remove focus from the input element
    });
  } else {
    console.error("Element with ID 'date' not found.");
  }
  this.route.params.subscribe(params => {
     this.mailId = params['id'];
   });
   if(this.mailId==1){this.div1=true;
    this.div2=false;
    this.div3=false;

  }else if(this.mailId==2){this.div1=false;
    this.div2=true;
    this.div3=false;

  }
  else if(this.mailId==3){this.div1=false;
    this.div2=false;
    this.div3=true;

  }
}

formSubmit() {
  console.log('Form Data:', this.emailForm.value);
  const formValue = this.emailForm.value;
  this.router.navigate(['/display'], {
     queryParams: {
        mail1: formValue.mail1,
        mail2: formValue.mail2,
        date1: formValue.date,
        date2: formValue.date2
     }
  });
}

formSubmit2() {
  console.log('Form Data:', this.emailForm2.value);
  const formValue = this.emailForm2.value;
  this.router.navigate(['/display'], {
     queryParams: {
        mail1: formValue.mail1,
        mail2: formValue.mail2,
        date1: formValue.date,
        date2: formValue.date2
     }
  });
}


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
  getLog(id:any){
    /*if this.logForm.value.id == null -> error message (id required)*/
    this.mailService.getLog(id).subscribe(res => this.logString = res)}



}
