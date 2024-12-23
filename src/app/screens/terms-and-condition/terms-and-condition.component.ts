import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
  content:string = ''
  checkLang:any
  title:string=''
  constructor(private __StaticPagesService:StaticPagesService) {
    this.getTermsData()
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.title = this.checkLang == 'en'?'TERMS AND CONDITION':'الشروط والأحكام ';

  }

  ngOnInit(): void {
  }
  getTermsData(){
    this.__StaticPagesService.getTermsContent().subscribe((res:any)=>{
      this.content = res.data.body
      console.log(res.data.body)
    })
  }

}
