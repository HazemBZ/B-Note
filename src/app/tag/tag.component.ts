import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TagData } from '../tagData.component';
import { ThrowStmt } from '@angular/compiler';
import { TermServiceService } from '../term-service.service';



@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  
  styleUrls: ['./tag.component.css'],
})
export class TagComponent  implements TagData {
  data: any;
  private dataCopy: any;
  content: string = "";

  constructor(private termService: TermServiceService) {
   
  }
   @Output() emitter = new EventEmitter<any>();
  

  updateTag() {
    
    const index = this.data.index;
    console.log("index recoverred", index);
    this.termService.updateTag(index, this.content);
   
  }
}
