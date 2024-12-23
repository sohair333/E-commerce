import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrediteEtmanaService } from 'src/app/Services/credite-etmana.service';
import * as moment from 'moment';

@Component({
  selector: 'app-credit-etmana',
  templateUrl: './credit-etmana.component.html',
  styleUrls: ['./credit-etmana.component.scss']
})
export class CreditEtmanaComponent implements OnInit {
  totalItems:any
  totalPrice:any
  crediteData:any
  showEmtpPage:boolean = false
  @Output() backTo = new EventEmitter()

  constructor(private _crediteEtmana:CrediteEtmanaService) {
    this.getCreditData()
  }

  ngOnInit(): void {
  }
  getCreditData(){
    this._crediteEtmana.getCLientCredit().subscribe((res:any)=>{
      if(res.data.store_credits.length !== 0){
        this.showEmtpPage = false
      }
      else{
        this.showEmtpPage = true
      }
      this.totalItems = res.data.length;
      this.totalPrice = res.data.total
      console.log(res.data);
      this.crediteData = res.data.store_credits
      this.totalPrice = res.data.total
      console.log(this.crediteData[0].type);

    })
  }
  back() {
    this.backTo.emit()
  }

}
