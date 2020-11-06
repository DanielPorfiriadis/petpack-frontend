import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AfterloginComponent } from './components/afterlogin/afterlogin.component';

<<<<<<< HEAD
=======
import { FeedPageComponent } from './components/feed-page/feed-page.component';

>>>>>>> origin/vasilis_development

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'afterlogin', component: AfterloginComponent },
<<<<<<< HEAD
=======
  { path: 'feed-page', component: FeedPageComponent },
>>>>>>> origin/vasilis_development

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
