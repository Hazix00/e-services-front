import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectAllFolders } from 'src/app/store/folders/folders.selectors';

@Component({
  selector: 'app-demandes-list',
  templateUrl: './demandes-list.component.html',
  styleUrls: ['./demandes-list.component.scss'],
})
export class DemandesListComponent implements OnInit {
  dummy_list = [
    'En progression',
    'Terminé',
    'Terminé',
    'En pause',
    'Rejeté',
    'En progression',
  ];

  folders$: Observable<any[]> = this.store.select(selectAllFolders);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
