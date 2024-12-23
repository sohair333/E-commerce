import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/Services/brands.service';

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {
  checkLang: any
  brands:any[]=[]
  constructor(private _Router:Router,private _brandsService:BrandsService) {
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
    this.getAllBrands()
  }

  getAllBrands()
  {
    this._brandsService.getAllBrands().subscribe((res)=>{
      this.brands =res.data
    })
  }

  back() {

    this._Router.navigateByUrl('/homePage');
  }
  navigateByBrands(id:number) {
    this._Router.navigate(['all-products/', { id: id, title: 'BRAND' }]);
  }
  ngOnInit(): void {
  }

}
