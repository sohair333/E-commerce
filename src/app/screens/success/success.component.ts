import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('homePage');
    }, 10000);
  }
}
