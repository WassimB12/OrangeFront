import { Component } from '@angular/core';
import { Email } from '../Entities/email';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{EmailService} from '../Services/email-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


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

emailForm!:FormGroup;


constructor(private formBuilder: FormBuilder,private router: Router,private mailService : EmailService, private modalService: NgbModal)
{  this.emailForm = this.formBuilder.group({
  mail1: [''],
  mail2: [''],
  date: [''],
  date2: ['']
});}


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

}
