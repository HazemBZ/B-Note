import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { AddTermComponent } from './add-term/add-term.component';
import { UpdateTermComponent } from './update-term/update-term.component';

const routes: Routes = [
  { path:'', redirectTo:'/search', pathMatch:"full" },
  { path:'search', component: SearchPageComponent },
  { path:'add', component: AddTermComponent },
  { path:'update/:id', component: UpdateTermComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
