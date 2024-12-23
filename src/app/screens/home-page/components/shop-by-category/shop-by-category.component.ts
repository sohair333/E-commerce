import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.component.html',
  styleUrls: ['./shop-by-category.component.scss']
})
export class ShopByCategoryComponent implements OnInit {

  @Input() categories: any[] = [];
  constructor(private router:Router) { }
  ngOnInit(): void {
  }
  onHoverParent(index: number) {
    this.categories[index].isHoverd = true
  }

  onLeaveHoverParent(index: number) {
    this.categories[index].isHoverd = false
  }
  navigateToproductList(value:any)
  {
    console.log(value);
    this.router.navigate(['all-products/', { id:value, title: 'CATEGORY' }]);
  }

}
