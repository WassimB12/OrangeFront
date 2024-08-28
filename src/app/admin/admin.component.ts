import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Entities/user';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common'; // Import Location from Angular common module
import {  Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
   host: { ngSkipHydration: 'true' },

})
export class AdminComponent {
  @ViewChild('inputRef') inputElement!: ElementRef;
  inputValue: string = ''; // Declare the inputValue property

  form : boolean = false;
  closeResult! : string;

  users: User[] = [];
  selectedUser: User | null = null;
constructor(private router:Router, private userService: UserService,private modalService: NgbModal,private location:Location,private renderer:Renderer2){}
ngOnInit(): void {
  this.getAllUsers();

}
getAllUsers(): void {
  this.userService.getAllUsers().subscribe(users => {
    this.users = users;
  });
}

getUserById(id: number): void {
  this.userService.getUserById(id).subscribe(user => {
    this.selectedUser = user;
  });
}

createUser(user: User): void {
  this.userService.createUser(user).subscribe(newUser => {
    this.users.push(newUser);
  });
}

updateUser(id: number, user: User): void {
  this.userService.updateUser(id, user).subscribe(updatedUser => {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  });
}

deleteUser(id: number): void {
  this.userService.deleteUser(id).subscribe(() => {
this.getAllUsers();
//this.reloadCurrentRoute()
});
}

getUserByEmail(email: string): void {
  this.userService.getUserByEmail(email).subscribe(user => {
    this.selectedUser = user;
  });
}
open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
  closeForm(){

  }
  cancel(){
    this.form = false;
  }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  }
