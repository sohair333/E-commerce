import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-shipping-policy',
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.scss'],
})
export class ShippingPolicyComponent implements OnInit {
  content: string = '';
  title:string=''
  checkLang: any;
  constructor(private __StaticPagesService:StaticPagesService) {
    this.getShippingPolicy()
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.title = this.checkLang === 'en' ? 'Shipping Policy':'سياسه الوصول'
  }

  ngOnInit(): void {}
  getShippingPolicy(){
    this.__StaticPagesService.getShippingContent().subscribe((res:any)=>{
      this.content = res.data.body
    })
  }
}
