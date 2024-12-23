import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaqsService } from 'src/app/core/services/faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  faqs: any[] = [];
  panelOpenState = false;
  @Output() step = new EventEmitter();
  selectedLang: string = ''


  constructor(private _fqas: FaqsService) {
    this.getAllData();
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
  }

  ngOnInit(): void {
  }

  getAllData(): void {
    this._fqas.get_FQAS().subscribe((res: any) => {
      this.faqs = res.data?.map((faq: any) => {
        return {
          faq: faq.question,
          answer: faq.answer
        }
      })
    })
  }

  backToMenu() {
    this.step.emit(true)
  }

}
