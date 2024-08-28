import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../Services/email-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs/operators';
import { firstValueFrom, forkJoin, of, Subscription } from 'rxjs';
import { request } from 'http';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {  registerables } from 'chart.js';
import { DomainService } from '../Services/domain.service';


@Component({
  standalone: false,
  selector: 'app-charts-work',
  templateUrl: './charts-work.component.html',
  styleUrls: ['./charts-work.component.css'],
  host: { ngSkipHydration: 'true' },
})
export class ChartsWorkComponent implements OnInit,OnChanges {
  @Input() mailSent: boolean = false;

  resultString!:any;
  private screenTaskSubscription!: Subscription;

  startDate: string | null = null;
  val:number=0;
  endDate: string | null = null;
  isEndDateDisabled: boolean = true;
  value = signal(50);
  loading: boolean = true;
  today!: string;
  mode: any = "determinate";
  listMails: any;
  screenResult:any;
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
      "Recipient inbox is full",
      "Discard from MX"
    ],
    datasets: [
      {
        data: [10, 20, 30, 5, 15, 25, 10, 5],  // Example data
        backgroundColor: [
          "#1376bd", "#034a36", "#34ad69", '#fc0330', 'purple', '#FFA726', '#b3adb0','#080142'
        ],
        hoverBackgroundColor: [
          "#165687", "#81C784", "#FFB74D", 'pink', '#c7a40a', '#fa8e1b', '#333333','#080142'
        ]
      }
    ]
  };

  chartOptions: any = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      },
      datalabels: {
        color: '#fff',
        formatter: (value: number, ctx: any) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a: number, b: number) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + '%';
            return percentage;
          } else {
            return value;
          }
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
    private router:Router,
    private domainService:DomainService,

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
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mailSent'] && changes['mailSent'].currentValue) {
      this.sendMail(this.domainForm.value.domain, "becheikh.wassim@esprit.tn", 2);
    }
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



  async updateChartData() {
    this.data.datasets[0].data = [...this.resultCounts];
    this.cdRef.detectChanges();
let totalSum = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
this.resultString = `Mail transmission report of (${this.domainForm.value.domain} ):\n Total: ${totalSum} \n`;

this.data.labels.forEach((label, index) => {
    if (this.data.datasets[0].data[index] > 0) {
        let percentage = (this.data.datasets[0].data[index] / totalSum) * 100;
        this.resultString += `${label}: ${this.data.datasets[0].data[index]} (${percentage.toFixed(1)}%)`;
        if (index < this.data.labels.length - 1) {
           this.resultString += '\n ';
        }
    }
});
console.log(this.resultString);

let deliveredIndex = this.data.labels.indexOf('Delivered');
let deliveredCount = this.data.datasets[0].data[deliveredIndex];
let deliveredPercentage = (deliveredCount / totalSum) * 100;

 if (!this.mailSent && deliveredPercentage < 90) {
  // becheikh.wassim@esprit.tn is orange responsable of monitoring clients mail service
  this.mailSent = true; // Set the flag to true after sending the mail
}}
// Assuming resultString contains the value you want to set in the <p> element

sendMail(mail: string, receiver: string, op: number): void {
  this.domainService.sendMail(mail, receiver, op).subscribe(
    response => {
      console.log('Mail delivered successfully:', response);
    },
    error => {
      console.error('Error delivering mail:', error);
    }
  );
}
sendMailIfNeeded() {
  if (this.mailSent) {
      this.sendMail(this.domainForm.value.domain, "becheikh.wassim@esprit.tn", 2);
  }
}



// Usage example:








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
      this.sendMailIfNeeded();

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.sendMailIfNeeded();

      return 'by clicking on a backdrop';
    } else {      this.sendMailIfNeeded();

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
