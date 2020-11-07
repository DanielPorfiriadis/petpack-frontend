import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { Error404Component } from '../components/error404/error404.component';
import { AboutusComponent } from '../components/aboutus/aboutus.component';
import { AllpostsComponent } from '../components/allposts/allposts.component';
import { PostindetailsComponent } from '../components/postindetails/postindetails.component';

// TODO define your components as pages
const routes: Routes = [
  {path: 'allposts', component: AllpostsComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'post', component: PostindetailsComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 1- This forChild should be forRoot
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
