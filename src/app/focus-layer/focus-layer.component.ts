import { Component, OnInit, Input } from '@angular/core';
import { Term } from '../term';
import { TermServiceService} from '../term-service.service';
import { faArrowRight, faEdit, faEye, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { EventEmitter } from 'protractor';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-focus-layer',
  templateUrl: './focus-layer.component.html',
  styleUrls: ['./focus-layer.component.css']
})
export class FocusLayerComponent implements OnInit {
  @Input() term:Term; // constuct html UI and bind elements to Term construct
  
  // FAs
  faArrowRight = faArrowRight;
  faEdit = faEdit;
  faEye = faEye;
  faArrowDown = faArrowDown;
  resumeArrow = faArrowRight;
  // states
  inPreview = true;
  resVisible = false;

  constructor(public termService:TermServiceService) { }

  ngOnInit(): void {
    console.log("focus term", this.term);
    
    // this.desc_html.subscribe((html)=> document.getElementById("overview").innerHTML = html);
  }

  hide(){
    let pop = document.getElementById("termPop");
    pop.style.display = "none";
    console.log(this.term);
    // document.getElementById('top').scrollIntoView(); // workaround for absolute position display (deprecated) 
    document.getElementsByTagName("html")[0].style.overflow = "";
    // alert("hidden");
    this.inPreview = true;
    
  }

  refreshView(mark){
    this.termService.updateParsedMardown(mark);
    this.toggleViewMode();
    this.term.desc = mark;
    this.saveDescription(this.term);
  }

  toggleViewMode(){
    this.inPreview = ! this.inPreview;
  }

  saveDescription(term:Term){
    this.termService.updateTerm(term).subscribe(()=>console.log);
  }

  toggleResume() {
    if(this.resVisible) { // then hide
      this.resumeArrow = faArrowRight;
    }
    else {  // then show
      this.resumeArrow = faArrowDown;
    }
    this.resVisible = !this.resVisible;
  }
  
}
