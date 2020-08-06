import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Term } from '../term';
import { TermServiceService } from '../term-service.service';
import { Observable, of } from 'rxjs'
import { faSave ,faPlus } from '@fortawesome/free-solid-svg-icons';

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
  dataItem:TagItem = new TagItem(TagComponent, {index:"dummy", tag:"dummy value"});// setup phase before handles data


  faSave = faSave;
  faPlus = faPlus;
  
  constructor(
    private route:ActivatedRoute, 
    private location:Location,
    private termService:TermServiceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit(): void {
    this.getTerm(this.route.snapshot.paramMap.get('id'));
  }

  addTag(){
    // setup data 
    const dataItem = this.dataItem;
    // add component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dataItem.component);
    const viewContainerRef = this.host.viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<TagData>(componentFactory);
    componentRef.instance.data = dataItem.data;
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


  log(index){
    console.log(this.term.tags[index]);
  }

  updateTag(index, value) {
    this.term.tags[index] = value;
  }

  trackByFn(index:any, item:any){
    return index;
  }


}
