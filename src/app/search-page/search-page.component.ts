import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TermServiceService } from '../term-service.service';
import { Term } from '../term';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { faCoffee , faTrashAlt ,faSearch, faPen, faArrowRight, faArrowDown, faArrowUp } 
        from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  host: {'class': 'search tile is-11'}
})
export class SearchPageComponent implements OnInit ,AfterViewInit{
  async_terms:Observable<Term[]>;
  terms:Term[]= [];
  private searchTerms = new Subject<string>();
  popTerm:Term;
  filteredTerms:Term[] = [];
  categoriesFilter = []
  selectedCategories = []
  allCateg = null;
  //states
  catIsUp= true;
  termPop = false;
  showCategories=false;
  allCategSelected = false;
  // icons
  faCoffee = faCoffee;
  faTrash = faTrashAlt;
  faSearch = faSearch;
  faPen = faPen;
  faArrowRight = faArrowRight;
  categoriesArrow = faArrowUp;
  categories = [
    "ALL",
    "Music",
    "IT",
    "Note",
    "Manga",
    "Sports",
    "News",
    "Term",
  ]

  constructor(private termService:TermServiceService) {
    
   }


  ngOnInit(): void {
    // this.getTerms();
    this.async_terms = this.searchTerms.pipe(
       debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> of((this.terms.filter((elem)=> elem.term.toLocaleLowerCase().includes(term.toLocaleLowerCase())))))
    );
    this.async_terms.subscribe((terms)=>{this.filteredTerms = terms; console.log(`recieved ${JSON.stringify(terms)}`);});
      
  }

  ngAfterViewInit(){
    let el = document.getElementById('all').click();
  }  

  async_init(){
    let el = document.getElementById('all');
    console.log(el);
    el.click();
    
  }

  filter(text){
    console.log("text",text);
    this.filteredTerms = this.filteredTerms.filter((term)=>  term.tags? term.tags.includes(text) :false);
    console.log(this.terms)
  }

  search(term:string):void {
    this.searchTerms.next(term);
  }

  delete(term_id:string, current_term:string) {
    this.filteredTerms = this.terms.filter((term)=>term._id !== term_id);
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
  
  showTermPop(index,event){
    console.log(document.getElementsByTagName("html")[0].style.overflow);
    this.popTerm= this.filteredTerms[index];
    let target = event.target;
    console.log("showing indexed",index,"term",target);

    this.termService.lastHighlightTerm = target;
    let pop = document.getElementById("termPop");
    pop.style.display = "block";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  }

  searchByCategory(categ, evt) {
    let element = evt.target;    
    console.log('element', element)
    console.log(`clicked category:,${categ}`);
    if(categ == "ALL" ) {
      if (!this.allCategSelected) {

        this.categoriesFilter = [];
        
        this.termService.getTermsByCategories([]).subscribe((res)=> {console.log(`search result:`,res);this.terms = this.filteredTerms = res});
        this.selectCategory(element,categ);
        this.allCategSelected = true;
        console.log(`searching by categories`,this.categoriesFilter);
        if(this.selectedCategories.length > 0) {
          this.selectedCategories.forEach((elem)=> {this.unselectCategory(elem,'stub');this.selectedCategories = []});
        }
        if(!this.allCateg) this.allCateg = element;
        
      } else {
        return;
        this.unselectCategory(this.allCateg,'ALL');
      }
      return
      }
     
    if(this.allCategSelected) {
      this.allCategSelected = false;
      this.unselectCategory(this.allCateg,"ALL");
      
      
    }
    if(!this.categoriesFilter.includes(categ)) {
      this.categoriesFilter.push(categ);
      this.selectCategory(element,categ);
      this.selectedCategories.push(element);
      
    }
    else {
      this.categoriesFilter = this.categoriesFilter.filter((el)=>el!=categ); // slow opr
      this.unselectCategory(element,categ);
      this.selectedCategories = this.selectedCategories.filter((elem)=> elem!=element)

    }

    console.log(`searching by categories`,this.categoriesFilter);
    if(this.categoriesFilter.length == 0)return;
    
    else {
    this.termService.getTermsByCategories(this.categoriesFilter).subscribe((res)=> {console.log(`search result:`,res);this.terms = this.filteredTerms = res});
    }
  }

  unselectCategory(element,cat) {
    let attrs = element.attributes['class'].textContent;
    let new_attrs  = attrs.replace("selected", "idle");
    element.attributes['class'].textContent = new_attrs;

  }

  selectCategory(element,cat) {
    let cont = element.attributes['class'].textContent;
    element.attributes['class'].textContent = cont.replace('idle', 'selected');
  }
  
}
