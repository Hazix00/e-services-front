import { Component, OnInit } from '@angular/core';
import { LayoutViewToggleService } from 'src/app/services/layoutViewToggle/layout-view-toggle.service';

@Component({
  selector: 'app-demande-category-item',
  templateUrl: './demande-category-item.component.html',
  styleUrls: ['./demande-category-item.component.scss']
})
export class DemandeCategoryItemComponent implements OnInit {

  layoutView! : 'grid' | 'list'

  constructor(
    private readonly layoutViewToggleService: LayoutViewToggleService
  ) { }

  ngOnInit(): void {
    this.layoutViewToggleService
      .getCategoriesView()
      .subscribe( value => {
        this.layoutView = value
        console.log(value);

      })
  }

}
