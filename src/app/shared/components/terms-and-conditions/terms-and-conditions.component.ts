import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  content: string = ''
  selectedLang: any
  name: string = ''
  @Output() view = new EventEmitter();

  constructor(private _StaticPagesService: StaticPagesService) {
    this.getAboutContent()
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.name = this.selectedLang === 'en' ? "Terms and Conditions" : 'الشروط و الاحكام'
  }

  ngOnInit(): void {
  }

  getAboutContent() {
    this._StaticPagesService.getTermsContent().subscribe(res => {
      this.content = res.data.body
    })
  }

  backToMainView() {
    this.view.emit()
  }

}
