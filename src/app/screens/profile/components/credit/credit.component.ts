import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { CrediteEtmanaService } from 'src/app/Services/credite-etmana.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  crediteData:any[]=[]
  tableHeaders: any[] = [];
  data:any
  totalPrice:any
  totalItems:any
  dataLength:number=0
  showEmtpPage:boolean=false

  constructor(private _crediteEtmana:CrediteEtmanaService,private _messageService:MessageService) {
    this.getCreditData()
    this.tableHeaders = [
      { field: 'type', header: 'CREDIT TYPE' },
      { field: 'created_at', header: 'Credit Date' },
      { field: 'end_date', header: 'Expire Date' },
      { field: 'amount', header: 'Amount' },
    ];
   }

  ngOnInit(): void {
  }

  getCreditData(){
    this._crediteEtmana.getCLientCredit().subscribe((res:any)=>{
      this.totalItems = res.data.length;
      this.totalPrice = res.data.total
      console.log(res.data.store_credits.length);
      //this.dataLength = res.data.store_credits.length
      if(res.data.store_credits.length){
        this.showEmtpPage = false
      }
      else{
        this.showEmtpPage = true
      }

      this.crediteData = res.data.store_credits.map((data:any)=>{
        console.log(data.created_at);
        let formatDateCreatedAt = new Date(data.created_at)
        let formatDateEnd = new Date(data.end_date)
        moment(formatDateCreatedAt).format("ll")
        moment(formatDateEnd).format("ll")
        console.log(moment(formatDateCreatedAt).format("ll"));
        return {
          type:data.type,
          created_at:"Place On"+" " + moment(formatDateCreatedAt).format("ll") ,
          end_date: "Expire On" +" " + moment(formatDateEnd).format("ll"),
          amount: "EGP"+" "+data.amount
        }
      })
    })
  }

}
