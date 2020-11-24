import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { AfterloginComponent } from './components/afterlogin/afterlogin.component';
import { FeedPageComponent } from './components/feed-page/feed-page.component';

import { ProfileComponent } from './components/profile/profile.component';
import { MiniprofComponent } from './components/feed-page/miniprof/miniprof.component';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SettingsComponent} from './components/settings/settings.component';
import { CommentsComponent } from './components/feed-page/comments/comments.component';
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './components/auth/auth.guard';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'afterlogin', component: AfterloginComponent },

  { path: 'feed-page', component: FeedPageComponent, canActivate:[AuthGuard]},
  { path: 'feed-page/:username', component: FeedPageComponent, canActivate:[AuthGuard]},

  { path: 'about_us', component: AboutUsComponent },
  { path: 'contact_us', component: ContactUsComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard] },
  { path: 'miniprof', component: MiniprofComponent },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  { path: 'comments', component: CommentsComponent }, 
  { path: 'info', component: InfoComponent},
  { path: 'footer', component: FooterComponent }, 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }