import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddTermComponent } from './add-term/add-term.component';
import { UpdateTermComponent } from './update-term/update-term.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TagComponent } from './tag/tag.component';
import { TagDirective } from './tag.directive';
import { FocusLayerComponent } from './focus-layer/focus-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    NavBarComponent,
    AddTermComponent,
    UpdateTermComponent,
    TagComponent,
    TagDirective,
    FocusLayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule // => ngModel  data binding 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
      library.addIcons(faCoffee);
    }
 }
