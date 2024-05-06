import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TableDisplayComponent } from './table-display/table-display.component';

export const routes: Routes = [
  {
      path: 'mail/:id',
      component: MailComponent
  },
  {
    path: 'home',
    component: HomeComponent
},{
  path: 'display',
  component: TableDisplayComponent
},

  {
      path: '**',
      redirectTo: 'home'
  }
];
@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule,ReactiveFormsModule]
})
export class AppRoutingModule { }
