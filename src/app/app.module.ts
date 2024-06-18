import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableDisplayComponent } from './table-display/table-display.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailComponent } from './mail/mail.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChartsWorkComponent } from './chartsWork/charts-work.component';
import { ChartModule } from 'primeng/chart';
import { HttpInterceptorService } from './Services/spinner-interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableDisplayComponent,MailComponent,ChartsWorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,ChartModule, MatProgressSpinnerModule,

  ],  exports: [ReactiveFormsModule,FormsModule,RouterModule]
,
  providers: [
    provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync(), {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
