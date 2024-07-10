import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { SpinnerService } from './Services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  isLoading: Observable<number>;

  title = 'OrangeFront';
  constructor(public spinnerService: SpinnerService,private router:Router){

    this.isLoading = this.spinnerService.spinnerCounter$;
  }
  ngOnInit(): void {}

  // isIframe = false;


  // ngOnInit(): void {
  //   this.isIframe = window !== window.parent && !window.opener;
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    debugger;
    $event.preventDefault();
    $event.returnValue = '';
  }

  @HostListener('window:unload', ['$event'])
  beforeunload($event: any) {
    // Do cleanup here, if necessary
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


