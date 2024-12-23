import { Component, OnInit } from '@angular/core';
import { JobsListService } from 'src/app/Services/jobs-list.service';
import { OrdersService } from 'src/app/Services/orders.service';
 interface jobs  {
  id:number,
  title:string;
  company:string;
  location:string;
 }
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs:jobs[]=[]
  filterJobs:jobs[]=[];
  searchItem:string = ''
  loading:boolean = false
  err:boolean = false
  constructor(private _jobsService:OrdersService) { }

  ngOnInit(): void {
    this.filterData();
  }

  getJobs(){
    this._jobsService.getData().subscribe((res:any)=>{
      this.jobs = res
      this.loading = false
      console.log(res);

    },(err:any)=>{
      console.log(err);
      this.err= true
      this.loading = true
    });

  }
  filterData(){
    this.filterJobs = this.jobs.filter((item:any)=>{
      item.title.toLocaleLowerCase().includes(this.searchItem.toLowerCase())
    })
  }

}
