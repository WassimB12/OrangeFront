import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../Services/email-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
  loading: boolean=true;
  today!:string;

mode:any="determinate";
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
      "Recipient inbox is full"
    ],
    datasets: [
      {
        data: [],  // Start with an empty array
        backgroundColor: [
          "#1376bd",
          "#034a36",
          "#34ad69",
          '#fc0330', 'purple', '#FFA726', '#b3adb0'
        ],
        hoverBackgroundColor: [
          "#1d0266",
          "#81C784",
          "#FFB74D",
          'pink', '#c7a40a', '#fa8e1b', '#b3adb0'
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
    private cdRef: ChangeDetectorRef
  ) {
    this.domainForm = this.formBuilder.group({
      domain: ['delice.orders@aziza.tn'],
      date1:['2024-02-13'],
      date2:['2024-02-15']

    });
  }

  ngOnInit(): void {
    this.getMails('delice.orders@aziza.tn', 'all', '2024-02-13T00:03', '2024-02-13T20:03');
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

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
      "recipient inbox is full",
    ];

    // Count occurrences of each result
    return resultTypes.map(resultType => {
      return emails.filter(email => email.result === resultType).length;
    });
  }

  updateChartData() {
    // Update the data array within the dataset
    this.data.datasets[0].data = [...this.resultCounts];
    // Detect changes to ensure the chart updates
    this.cdRef.detectChanges();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async open(content: any) {
    await this.delay(100);
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
  onStartDateChange() {
    if (this.endDate && this.startDate && this.endDate < this.startDate) {
      this.endDate = null; // Clear end date if it is before start date
    }
  }

  onEndDateChange() {
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      alert('End date cannot be before start date.');
      this.endDate = null; // Clear end date if it is before start date
    }
  }
}
