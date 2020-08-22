import { Component, OnInit, Input } from '@angular/core';
import { Term } from '../term';
import { TermServiceService} from '../term-service.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-focus-layer',
  templateUrl: './focus-layer.component.html',
  styleUrls: ['./focus-layer.component.css']
})
export class FocusLayerComponent implements OnInit {
  @Input()term ; // constuct html UI and bind elements to Term construct
  faArrowRight = faArrowRight;
  
  constructor(public termService:TermServiceService) { }

  ngOnInit(): void {
    console.log("focus term", this.term);
  }

  hide(){
    let pop = document.getElementById("termPop");
    pop.style.display = "none";
    console.log(this.term);
    // document.getElementById('top').scrollIntoView(); // workaround for absolute position display (deprecated) 
    document.getElementsByTagName("html")[0].style.overflow = "";
    // alert("hidden");
  }
}
