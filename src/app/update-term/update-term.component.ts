import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Term } from '../term';
import { TermServiceService } from '../term-service.service';
import { Observable, of } from 'rxjs'
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-update-term',
  templateUrl: './update-term.component.html',
  styleUrls: ['./update-term.component.css']
})
export class UpdateTermComponent implements OnInit {
  async_term:Observable<Term>;
  term:Term ;
  constructor(
    private route:ActivatedRoute, 
    private location:Location,
    private termService:TermServiceService
    ) { }

  ngOnInit(): void {
    this.getTerm(this.route.snapshot.paramMap.get('id'));
  }

  goBack():void {
    this.location.back();
  }

  getTerm(id:string):void {
    this.termService.getTerm(id).subscribe((term)=> {this.async_term = of(term);this.term = term});
  }

  update(term):void {
    console.log(this.term);
    this.termService.updateTerm(this.term).subscribe((res)=>{console.log("receiving"+JSON.stringify(res));this.goBack()});
    
  }
}
