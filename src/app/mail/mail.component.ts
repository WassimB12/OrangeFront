import { Component, OnInit } from '@angular/core';
import { Email } from '../Entities/email';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../Services/email-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  listMails: any;
  form: boolean = false;
  mail!: Email;
  div1: Boolean = false;
  div2: Boolean = true;
  div3: Boolean = false;
  myDateTime: any;

  closeResult!: string;
  logString: any;

  today!: string;
  emailForm!: FormGroup;
  emailForm2!: FormGroup;
  logForm!: FormGroup;
  JSON: any;
  mailId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mailService: EmailService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.emailForm = this.formBuilder.group({
      mail1: [''],
      mail2: ['all'],
      date1: ['2024-02-13T10:30'],
      date2: ['2024-02-13T19:30']
    });

    this.emailForm2 = this.formBuilder.group({
      mail1: ['form2^^'],
      mail2: [''],
      date1: ['2024-03-11T04:30'],
      date2: ['2024-03-11T19:30']
    });

    this.logForm = this.formBuilder.group({
      id: [''],
      options: this.formBuilder.array([false, false, false, false]),
      date1: ['2024-02-13']
    });
    const savedFormValues = localStorage.getItem('myFormValues');
    if (savedFormValues) {
      this.emailForm.setValue(JSON.parse(savedFormValues));
    }
    const savedFormValues2 = localStorage.getItem('myFormValues2');
    if (savedFormValues2) {
      this.emailForm2.setValue(JSON.parse(savedFormValues2));
    }
    const savedFormValues3 = localStorage.getItem('myFormValues3');
    if (savedFormValues3) {
      this.logForm.setValue(JSON.parse(savedFormValues3));
    }
  }

  ngOnInit(): void {
    this.emailForm.valueChanges.subscribe(values => {
      localStorage.setItem('myFormValues', JSON.stringify(values));
    });
    this.emailForm2.valueChanges.subscribe(values => {
      localStorage.setItem('myFormValues2', JSON.stringify(values));
    });
    this.logForm.valueChanges.subscribe(values => {
      localStorage.setItem('myFormValues3', JSON.stringify(values));
    });
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];

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

    if (this.mailId == 1) {
      this.div1 = true;
      this.div2 = false;
      this.div3 = false;
    } else if (this.mailId == 2) {
      this.div1 = false;
      this.div2 = true;
      this.div3 = false;
    } else if (this.mailId == 3) {
      this.div1 = false;
      this.div2 = false;
      this.div3 = true;
    }




  }

  formSubmit() {
    console.log('Form Data:', this.emailForm.value);
    const formValue = this.emailForm.value;
    this.router.navigate(['/display'], {
      queryParams: {
        mail1: formValue.mail1,
        mail2: formValue.mail2,
        date1: formValue.date1,
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
        date1: formValue.date1,
        date2: formValue.date2
      }
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeForm() {}

  cancel() {
    this.form = false;
  }

  getLog(id: any, op: any, ip: any, date: any) {
    this.mailService.getLog(id, op, ip, date).subscribe(res => this.logString = res)
  }

  onCheckboxChange(index: number): void {
    const checkboxes = this.logForm.get('options') as FormArray;
    checkboxes.controls.forEach((control, i) => {
      if (i !== index) {
        control.setValue(false, { emitEvent: false });
      }
    });
  }

  submitForm(): void {
    const { id, options, date1 } = this.logForm.value;
    const date = new Date(date1).toISOString().split('T')[0];
    if (options[0]) {
      this.getLog(id, 1, '55', date);
    } else if (options[1]) {
      this.getLog(id, 2, '10.46.96.20', date);
    } else if (options[2]) {
      this.getLog(id, 2, '10.46.96.21', date);
    } else if (options[3]) {
      this.getLog(id, 2, '10.46.96.22', date);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async goToHome() {
    await this.delay(600);
    this.router.navigate(['/home']);
  }



  onCheckboxToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.goToHome();
    }
  }
}
