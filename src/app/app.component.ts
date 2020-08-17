import { Component } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { R3TargetBinder } from '@angular/compiler';
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
  
  scroll(el) {
    // el.scrollIntoView({behavior:"smooth"});
    let ele = document.getElementById('top');
    ele.scrollIntoView({behavior:"smooth"});
  }
}
