import { Component, OnInit } from '@angular/core';
import { TermServiceService } from '../term-service.service';
import { Term } from '../term';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { faCoffee , faTrashAlt ,faSearch, faPen, faArrowRight, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  host: {'class': 'search tile is-11'}
})
export class SearchPageComponent implements OnInit {
  async_terms:Observable<Term[]>;
  terms:Term[];
  private searchTerms = new Subject<string>();
  // icons
  faCoffee = faCoffee;
  faTrash = faTrashAlt;
  faSearch = faSearch;
  faPen = faPen;
  faArrowRight = faArrowRight;
  categoriesArrow = faArrowUp;
  catIsUp= true;

  constructor(private termService:TermServiceService) {
    
   }

  ngOnInit(): void {
    // this.getTerms();
    this.async_terms = this.searchTerms.pipe(
       debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> this.termService.getTermsLike(term))
    );
    this.async_terms.subscribe((terms)=>{this.terms = terms; console.log(`recieved ${JSON.stringify(terms)}`)});
  }

  filter(text){
    console.log("text",text);
    this.terms = this.terms.filter((term)=>  term.tags? term.tags.includes(text) :false);
    console.log(this.terms)
  }

  search(term:string):void {
    this.searchTerms.next(term);
  }

  delete(term_id:string, current_term:string) {
    this.terms = this.terms.filter((term)=>term._id !== term_id);
    console.log(`after deletetion=> ${JSON.stringify(this.terms)}`);
    this.termService.deleteTerm(term_id).subscribe((resp)=>console.log(JSON.stringify(resp)));
  }

  toggleCategories(){
    if(this.catIsUp){
      this.categoriesArrow = faArrowDown;
    }
    else {
      this.categoriesArrow = faArrowUp;
    }

    this.catIsUp = ! this.catIsUp;
  }
  
}
