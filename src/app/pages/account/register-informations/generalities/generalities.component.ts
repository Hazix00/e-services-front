import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { fetchWorkflows } from 'src/app/store/workflows/workflows.actions';

@Component({
  selector: 'app-generalities',
  templateUrl: './generalities.component.html',
  styleUrls: ['./generalities.component.scss'],
})
export class GeneralitiesComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      fetchWorkflows({
        userId: '61d5c9d06064ac6c4d1e9b96',
      })
    );
  }
}
