import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TableDisplayComponent } from './table-display/table-display.component';
import { ChartsWorkComponent } from './chartsWork/charts-work.component';
import { UserComponent } from './user/user.component';
import { DomainComponent } from './domain/domain.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'mail/:id',
    component: MailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'display',
    component: TableDisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'charts',
    component: ChartsWorkComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'domain',
    component: DomainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'admin'
  },

];

@NgModule({
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule,ReactiveFormsModule]
})
export class AppRoutingModule { }
