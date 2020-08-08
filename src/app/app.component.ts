import { Component } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'class': 'root-comp'}
})
export class AppComponent {
  title = 'note';
  faArrow = faArrowUp;

  constructor(public router: Router){
  }

  scroll(target){
    target.scrollIntoView();
  }

}
