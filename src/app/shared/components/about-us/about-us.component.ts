import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  content: string = ''
  selectedLang: any
  name: string = ''
  @Output() view = new EventEmitter();

  constructor(private _StaticPagesService: StaticPagesService) {
    this.getAboutContent()
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.name = this.selectedLang === 'en' ? "About Us" : 'عن اتمني'
  }

  ngOnInit(): void {
  }

  getAboutContent() {
    this._StaticPagesService.getAboutUsContent().subscribe(res => {
      this.content = res.data.body
    })
  }

  backToMainView() {
    this.view.emit()
  }

}
