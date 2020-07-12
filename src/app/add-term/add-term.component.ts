import { Component, OnInit } from '@angular/core';
import { TermServiceService } from '../term-service.service';
import { Term } from '../term';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.css']
})
export class AddTermComponent implements OnInit {
  term:Term;
  constructor(private termService:TermServiceService) { }

  ngOnInit(): void {
  }

  add(term_val:string, description:string, tags:string[]) {
    const term = term_val;
    const desc = description;
    const tag = tags;
    this.termService.addTerm({"term":term, "desc":desc, "tags":tag} as Term).subscribe((resp)=> console.log(resp));
  }


}
