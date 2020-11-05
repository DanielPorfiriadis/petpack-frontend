import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
<<<<<<< HEAD
=======
import { AfterloginComponent } from './components/afterlogin/afterlogin.component';

/* Feed*/
import { FeedFormComponent } from './components/feed-form/feed-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedComponent } from './components/feed/feed.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

>>>>>>> vasilis_development

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing-page', component: LandingPageComponent },
<<<<<<< HEAD
];
=======
  { path: 'afterlogin', component: AfterloginComponent },

  /* Feed*/

  { path: 'new', component: FeedFormComponent },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },

];

>>>>>>> vasilis_development

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
