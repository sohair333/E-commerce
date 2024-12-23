import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() show: boolean = false
  @Input() productListShow: boolean = false
  @Input() offerShow: boolean = false
  @Input() productDetailsShow: boolean = false





  constructor() { }

  ngOnInit(): void {
  }

}
