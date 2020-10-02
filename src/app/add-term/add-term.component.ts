import { Component, OnInit } from '@angular/core';
import { TermServiceService } from '../term-service.service';
import { Term } from '../term';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.css'],
  host: {'class': 'add tile is-11'}
})
export class AddTermComponent implements OnInit {
  term:Term;
  faSave = faSave;
  constructor(private termService:TermServiceService) { }

  ngOnInit(): void {
  }

  add(term_val:string, res:string, description:string, tags:string[], categories:string[]) {
    const term = term_val;
    const resume = res;
    const desc = description;
    const tag = tags;
    this.termService.addTerm({"term":term, "resume":resume, "desc":desc, "tags":tag, "categories":categories} as Term).subscribe((resp)=> console.log(resp));
  }


}
