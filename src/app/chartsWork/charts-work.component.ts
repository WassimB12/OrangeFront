import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../Services/email-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { request } from 'http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-charts-work',
  templateUrl: './charts-work.component.html',
  styleUrls: ['./charts-work.component.css'],
  host: { ngSkipHydration: 'true' },
})
export class ChartsWorkComponent implements OnInit {
  startDate: string | null = null;
  endDate: string | null = null;
  isEndDateDisabled: boolean = true;
  value = signal(50);
  loading: boolean = true;
  today!: string;
  mode: any = "determinate";
  listMails: any;
  resultCounts: number[] = [300, 50, 100, 60, 40, 45];
  div1: Boolean = true;
  domainForm!: FormGroup;
  closeResult!: string;
  form: boolean = false;
  div2: Boolean = false;

  data: {
    labels: string[],
    datasets: {
      data: number[],
      backgroundColor: string[],
      hoverBackgroundColor: string[]
    }[]
  } = {
    labels: [
      "Delivered",
      "Spam",
      "Mail or attachment exceed size limit",
      "Virus",
      "Mail content is not acceptable",
      "Wrong mail address",
      "Recipient inbox is full","discard from MX"
    ],
    datasets: [
      {
        data: [],  // Start with an empty array
        backgroundColor: [
          "#1376bd", "#034a36", "#34ad69", '#fc0330', 'purple', '#FFA726', '#b3adb0','#080142'
        ],
        hoverBackgroundColor: [
          "#165687", "#81C784", "#FFB74D", 'pink', '#c7a40a', '#fa8e1b', '#333333','#080142'
        ]
      }
    ]
  };

  chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mailService: EmailService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private router:Router
  ) {
    const defaultDate = '2024-02-13';
    this.domainForm = this.formBuilder.group({
      domain: ['delice.orders@aziza.tn', Validators.required],
      date1: [defaultDate, Validators.required],
      date2: ['2024-02-18', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('Form values on init:', this.domainForm.value);
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }
  getDatesArray(startDate: Date, endDate: Date): string[] {
    let dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  getMails(mail1: any, mail2: any, d1: any, d2: any) {
    this.mailService.getAllMails(mail1, mail2, d1, d2).pipe(
      catchError(error => {
        console.error("Error fetching mails:", error);
        return of([]);  // Return an empty array on error
      })
    ).subscribe(res => {
      this.listMails = res;
      // After getting the list of mails, count occurrences
      this.resultCounts = this.countEmailResults(this.listMails);
      console.log("Result counts:", this.resultCounts);

      // Update the chart data
      this.updateChartData();
      this.loading=false;
    });
  }

  countEmailResults(emails: any[]): number[] {
    const resultTypes: string[] = [
      "Delivered",
      "Rejected(mail considered as a spam)",
      "Mail or attachment exceed size limit",
      "Rejected(mail considered as a virus)",
      "Rejected(mail content is not acceptable)",
      "Rejected(Wrong mail adress)",
      "recipient inbox is full","discard from MX"
    ];

    // Count occurrences of each result
    return resultTypes.map(resultType => {
      return emails.filter(email => email.result === resultType).length;
    });
  }

  updateChartData() {
    this.data.datasets[0].data = [...this.resultCounts];
    this.cdRef.detectChanges();
  }



  onStartDateChange() {
    if (this.endDate && this.startDate && new Date(this.endDate) < new Date(this.startDate)) {
      this.endDate = this.startDate;
    }
  }

  onEndDateChange() {
    if (this.startDate && this.endDate && new Date(this.endDate) < new Date(this.startDate)) {
      alert('End date cannot be before start date.');
      this.endDate = this.startDate;
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  closeForm() { }

  cancel() {
    this.form = false;
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
