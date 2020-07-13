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

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    NavBarComponent,
    AddTermComponent,
    UpdateTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // => ngModel  data binding 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
