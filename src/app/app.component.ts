import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TODOFrontendMaterial';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    let lang = localStorage.getItem('lang');
    if(lang){
      this.translateService.use(lang);
    }
    this.translateService.use('en');
  }
}
