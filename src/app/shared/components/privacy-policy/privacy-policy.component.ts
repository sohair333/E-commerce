import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  content: string = ''
  selectedLang: any
  name: string = ''
  @Output() view = new EventEmitter();

  constructor(private _StaticPagesService: StaticPagesService) {
    this.getAboutContent()
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.name = this.selectedLang === 'en' ? "Privacy Policy" : 'سياسه الخصوصيه'
  }

  ngOnInit(): void {
  }

  getAboutContent() {
    this._StaticPagesService.getPrivacyContent().subscribe(res => {
      this.content = res.data.body
    })
  }

  backToMainView() {
    this.view.emit()
  }

}
