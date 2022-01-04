import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutViewToggleService {

  private categoriesViewSubject = new BehaviorSubject<'grid' | 'list'>('grid')

  constructor() { }

  getCategoriesView = () => this.categoriesViewSubject.asObservable()
  setCategoriesView  = (value: 'grid' | 'list') => this.categoriesViewSubject.next(value)
}
