import { Component, OnInit } from '@angular/core';
import { LayoutViewToggleService } from 'src/app/services/layoutViewToggle/layout-view-toggle.service';

@Component({
  selector: 'app-demande-category-control',
  templateUrl: './demande-category-control.component.html',
  styleUrls: ['./demande-category-control.component.scss']
})
export class DemandeCategoryControlComponent implements OnInit {

  layoutView! : 'grid' | 'list'

  constructor(
    private readonly layoutViewToggleService: LayoutViewToggleService
  ) { }

  ngOnInit(): void {
    this.layoutViewToggleService
      .getCategoriesView()
      .subscribe( value => {
        this.layoutView = value
      })
  }

  toggleView(value: 'grid' | 'list') {
    if(value != this.layoutView)
      this.layoutViewToggleService.setCategoriesView(value)
  }
}
