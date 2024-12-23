import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from 'src/app/Services/static-pages.service';

@Component({
  selector: 'app-about-us-screen',
  templateUrl: './about-us-screen.component.html',
  styleUrls: ['./about-us-screen.component.scss']
})
export class AboutUsScreenComponent implements OnInit {
  content:string=''
  title:string=''
  checkLang:any
  constructor(private _StaticPagesService:StaticPagesService) {
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.title = this.checkLang == 'en'?'ABOUT ETMANA':'عن اتمنى';

    this.getAboutData();
   }

  ngOnInit(): void {
  }
  getAboutData(){
    this._StaticPagesService.getAboutUsContent().subscribe((res:any)=>{
      this.content=res.data.body;
    })
  }

}
