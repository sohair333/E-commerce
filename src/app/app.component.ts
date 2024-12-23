import { Component } from '@angular/core';
import { DirectionService } from './core/services/direction.service';
import { CurrentLocationService } from './Services/current-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'etmana';
  textDirection: any;
  lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');


  constructor(
    private _translate: DirectionService,
    private _location: CurrentLocationService,
  ) {

    if (this.lang) {
      this._translate.directionHtml.next(this.lang);
    } else {
      this._translate.directionHtml.next('en');
    }

    if (
      !localStorage.getItem('Country') ||
      localStorage.getItem('Country') == ''
    ) {
      this._location.getLocation().subscribe((res: any) => {
        localStorage.setItem('Country', res.country);
      });
    }

    this._translate.directionHtml.subscribe({
      next: (response) => {
        if (response === 'en') {
          this.textDirection = 'ltr';
        } else {
          this.textDirection = 'rtl';
        }
      },
    });
  }


}
