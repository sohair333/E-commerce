import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  page:any
  dialogLogout: boolean = false;
  userName?:string
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) {
  this.userName = JSON.parse(localStorage.getItem('user') || '{}')?.first_name
   }

  ngOnInit(): void {
      this.page=localStorage.getItem('myAccountTabs')
  }

  showPage(value: string) {
    this.page = value;
  }

  logout() {
    localStorage.clear()

    this.messageService.add({
      severity: 'info',
      summary: 'Logout Account',
      detail: 'Your Already Logout  successfully',
    });
    this.dialogLogout=false
    this.router.navigate(['/homePage'])
  }
  cancelledLogout() {

    this.messageService.add({
      severity: 'warn',
      summary: 'Logout Account',
      detail: 'Your Cancelled Logout ',
    });
    this.dialogLogout = false
  }

}
