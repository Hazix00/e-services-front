import { Component, OnInit } from '@angular/core';
import { LayoutViewToggleService } from 'src/app/services/layoutViewToggle/layout-view-toggle.service';

@Component({
  selector: 'app-demandes-control',
  templateUrl: './demandes-control.component.html',
  styleUrls: ['./demandes-control.component.scss']
})
export class DemandesControlComponent implements OnInit {

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
