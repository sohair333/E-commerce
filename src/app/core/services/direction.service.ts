import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  directionHtml: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor() {
    // localStorage.setItem('LOCALIZE_DEFAULT_LANGUAGE', 'en');
  }
}
