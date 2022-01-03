import { Component, OnInit } from '@angular/core';
import { LayoutViewToggleService } from 'src/app/services/layoutViewToggle/layout-view-toggle.service';

@Component({
  selector: 'app-demande-category-list',
  templateUrl: './demande-category-list.component.html',
  styleUrls: ['./demande-category-list.component.scss']
})
export class DemandeCategoryListComponent implements OnInit {

  layoutView! : 'grid' | 'list'

  constructor(
    private readonly layoutViewToggleService: LayoutViewToggleService
  ) { }

  ngOnInit(): void {
    this.layoutViewToggleService
      .getCategoriesView()
      .subscribe( value => {
        this.layoutView = value
        console.log(this.layoutView)
      })
  }

}
