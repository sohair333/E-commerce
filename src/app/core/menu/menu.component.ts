import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  step: number = 1;
  registerUser: boolean = false;
  openPopUp: boolean = false;
  countryPopUp: boolean = false;
  countries: any[] = [];
  langs: any[] = [];
  selectedLang: string = ''
  langValue: any
  langPopUp: boolean = false
  @Output() closeMenu = new EventEmitter();
  constructor(
    private router: Router
  ) {
    this.checkRegister();
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.langValue = this.selectedLang === 'en' ? 'English' : 'العربيه'
    this.countries = [
      {
        name: 'Egypt',
        flag: './../../../assets/images/egypt.png',
        isSelected: true
      },
      {
        name: 'Saudi Arabia',
        flag: './../../../assets/images/pngegg.png',
        isSelected: false
      },
    ]
    this.langs = [
      {
        name: 'العربيه',
        value: "ar",
        isSelected: this.selectedLang === 'en' ? false : true
      },
      {
        name: 'English',
        value: 'en',
        isSelected: this.selectedLang === 'en' ? true : false
      },
    ]
  }


  ngOnInit(): void { }

  categoryDetails(value: any) {
  }
  navigateOrder() {
    this.step = 4
  }
  NavigateCredit(){
    this.step = 7
  }
  checkRegister() {
    if (localStorage.getItem('AccessToken') !== null) {
      this.registerUser = true;
    } else {
      this.registerUser = false;
    }
  }
  faqs() {
    this.step = 2;
  }
  GoToprofile(valu: any) {
    this.step = 3;
  }
  step2() {
    this.step = 1;
  }
  conatcUs() {
    this.openPopUp = true;
  }
  selectCountry() {
    this.countryPopUp = true
  }
  backToMain() {
    this.step = 1;
  }
  companyInfo() {
    this.step = 6
  }
  close() {
    this.openPopUp = false;
    this.countryPopUp = false
    this.langPopUp = false
  }
  openLanguagePopUp() {
    this.langPopUp = true
  }

  changeCountry(index: number) {
    this.countries[index].isSelected = true
  }
  changelanguage(value: string) {
    localStorage.setItem('LOCALIZE_DEFAULT_LANGUAGE', value)
    window.location.reload()
  }
  goToAddress() {
    this.step = 5;
  }

  loginOrRegister() {
    this.router.navigate(['/auth']);
    this.closeMenu.emit()
  }
  logout(){
    localStorage.clear();
  }
  MenuBroken(data:any){
    this.closeMenu.emit()
  }
}
