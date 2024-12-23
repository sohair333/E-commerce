import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-web-auth',
  templateUrl: './web-auth.component.html',
  styleUrls: ['./web-auth.component.scss'],
})
export class WebAuthComponent implements OnInit {
  // display:boolean = true;
  @Input() tabName?: string ;
  @Input() dialogToggle?: boolean;
  @Output() changeDialogToggle=new EventEmitter()
  // @Output() changeTabParent=new EventEmitter()
  @Output() tabNameChild=new EventEmitter()
  // tabNameChild?:string

  constructor() {}

  ngOnInit(): void {}

  changetabName(value: any) {
   this.tabNameChild.emit(value)
   this.tabName=value

  }
  closeDialog(value:any){
    this.changeDialogToggle.emit(value)
  }
  // changeTabsParents()
  // {
  //   this.changeTabParent.emit(this.tabName)
  // }
  changeDialogTogg()
  {
    this.changeDialogToggle.emit(false)

  }

}
