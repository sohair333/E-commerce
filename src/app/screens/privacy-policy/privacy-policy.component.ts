import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  content:string=''
  checkLang:any
  title:string=''
  constructor(private __StaticPagesService:StaticPagesService) {
    this.getPrivacyData()
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.title = this.checkLang == 'en'?'PRIVACY POLICY':'سياسه الخصوصيه ';
  }

  ngOnInit(): void {
  }
  getPrivacyData(){
    this.__StaticPagesService.getPrivacyContent().subscribe((res:any)=>{
      console.log(res);
      this.content = res.data.body
    })
  }

}
