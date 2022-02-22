import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Term } from '../term';
import { TermServiceService } from '../term-service.service';
import { Observable, of } from 'rxjs'
import { faSave ,faPlus ,faCross } from '@fortawesome/free-solid-svg-icons';

import { ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TagDirective } from '../tag.directive';
import { TagItem } from '../tag-item';
import { TagComponent } from '../tag/tag.component';
import { TagData } from '../tagData.component';


@Component({
  selector: 'app-update-term',
  templateUrl: './update-term.component.html',
  styleUrls: ['./update-term.component.css'],
  host: {'class': 'update tile is-11'}
})
export class UpdateTermComponent implements OnInit {
  @ViewChild(TagDirective, {static: false}) host: TagDirective;

  async_term:Observable<Term>;
  term:Term ;
  categories:string[] = [];
  // setup phase before handles data


  faSave = faSave;
  faPlus = faPlus;
  faCross = faCross;
  
  constructor(
    private route:ActivatedRoute,
    private location:Location,
    private termService:TermServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getTerm(this.route.snapshot.paramMap.get('id'));
    this.categories = this.termService.getCategories();
  }

  setMeta(){
    this.termService.index = this.term.tags.length;
  }

  fitTerm(){
    console.log("fitting...", this.term);
    if(!this.term.tags) this.term.tags = [];
    if(!this.term.categories) this.term.categories = [];
    console.log("fit", this.term);
  }


  addTag(){

    // setup data 
    let dataItem =  new TagItem(TagComponent, {});
    const index = this.termService.index;
    dataItem.data.index = index;
    console.log("AddTag: index " ,index);
    
    


    // add component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dataItem.component);
    const viewContainerRef = this.host.viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<TagData>(componentFactory);
    componentRef.instance.data = dataItem.data;

    this.termService.index++;
    
  }

   

  goBack():void {
    console.log('going back')
    this.router.navigate(['search'])
  }

  getTerm(id:string):void {
    this.termService.getTerm(id).subscribe((term)=> {this.async_term = of(term);this.term = term; this.fitTerm(); this.setMeta()});
    
  }



  update(term):void {
    console.log(this.term);
    let tags = this.termService.tags;
    console.log("acutal tags")
    let correcter = 0;
    let empties = [];
    for (let i=0; i< tags.length; i++) {
      let tag = tags[i];
      if(tag){
        this.term.tags[i]= tag;
        console.log("true tag index ",i, tag[i]);
        console.log()
      }else {
        // this.term.tags[i] = null;
        console.log("false tag index", i, "null");
        empties.push(i);
      }
    }
    console.log("Splicing ", tags);
    empties.reverse();
    empties.forEach((index)=> tags.splice(index,1));
    console.log("finished splicing ", tags);
    this.term.tags = tags;
    console.log("UPDATE DATA", this.term);
    this.termService.updateTerm(this.term).subscribe(
      (res)=>{
        console.log("receiving"+JSON.stringify(res));
        this.goBack()
      });
  }


  log(index){
    console.log(this.term.tags[index]);
  }

  updateTag(index,val){
    console.log(`updating tag ${index} with ${val}`);
    this.termService.tags[index] = val;
  }

  trackByFn(index:any, item:any){
    return index;
  }
  
  toggleCategory(category) {
    if(category == "ALL") return;
    if(this.term.categories.includes(category)) this.term.categories.splice(this.term.categories.indexOf(category),1);
    else this.term.categories.push(category);
  }
}
