import { Component, OnInit, Input } from '@angular/core';
import { TagData } from '../tagData.component';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  
  styleUrls: ['./tag.component.css'],
})
export class TagComponent  implements TagData {
  @Input() data: any;
  constructor() { }



}
