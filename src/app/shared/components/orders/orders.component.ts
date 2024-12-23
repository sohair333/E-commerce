import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  step: number = 1
  details: any
  formattedDate: any;
  checkLang:any

  @Output() backTo = new EventEmitter()


  constructor(private _OrdersService: OrdersService, private datePipe: DatePipe) {
    this.checkLang=localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');

    this.getAllOrders()
  }

  ngOnInit(): void {
  }

  backToMain() {
    this.backTo.emit()
  }

  backToList() {
    this.step = 1
  }

  getAllOrders() {
    this._OrdersService.getAllOrders().subscribe(res => {

      this.orders = res.data.map((data: any) => {
        return {
          ...data,
          formattedDate: this.datePipe.transform(
            data.created_at,
            'E  d  MMM  '
          ),
        }
      })
    })
  }

  viewOrderDetails(id: number) {
    this._OrdersService.getOrderDetails(id).subscribe((res: any) => {
      this.details = res.data
      this.formattedDate = this.datePipe.transform(
        res.data.created_at,
        'E  d  MMM  '
      ),
        this.step = 2
    })
  }

  click(data: any) {

  }

}
