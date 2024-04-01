import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableDisplayComponent } from './table-display/table-display.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailComponent } from './mail/mail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableDisplayComponent,MailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,
  ],  exports: [ReactiveFormsModule,FormsModule,RouterModule]
,
  providers: [
    provideClientHydration(),provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
