import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-shipping-policy',
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.scss']
})
export class ShippingPolicyComponent implements OnInit {

  content: string = ''
  selectedLang: any
  name: string = ''
  @Output() view = new EventEmitter();

  constructor(private _StaticPagesService: StaticPagesService) {
    this.getAboutContent()
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.name = this.selectedLang === 'en' ? "Shipping Policy" : 'سياسه الشحن';
  }

  ngOnInit(): void {
  }

  getAboutContent() {
    this._StaticPagesService.getShippingContent().subscribe(res => {
      this.content = res.data.body
    })
  }

  backToMainView() {
    this.view.emit()
  }

}
