import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  viewName: number = 0

  info: any[] = []
  selectedLang: string = '';
  @Output() back = new EventEmitter();
  constructor() {
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.info = [
      {
        name: this.selectedLang === 'en' ? "About Us" : 'عن اتمني',
        view: 1
      },
      {
        name: this.selectedLang === 'en' ? "Terms and Conditions" : 'الشروط و الاحكام',
        view: 2
      },
      {
        name: this.selectedLang === 'en' ? "Privacy Policy" : 'سياسه الخصوصيه',
        view: 3
      },
      {
        name: this.selectedLang === 'en' ? "Shipping Policy" : 'سياسه الشحن',
        view: 4
      }
    ]
  }

  ngOnInit(): void {
  }
  changeView(viewName: number) {
    this.viewName = viewName
  }

  backToMainMenu() {
    this.back.emit()
  }

  resetView() {
    this.viewName = 0
  }

}
