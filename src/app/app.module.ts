import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 

/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* new import for feed*/ import { RouterModule, Routes } from '@angular/router';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/*npm install ngx - cookie - service--save*/
import { CookieService } from 'ngx-cookie-service'; 

/* npm install angular-countdown-date-time */
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';

/* Components */
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component'
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterStep1Component } from './components/auth/register/register-step1/register-step1.component';
import { RegisterStep2Component } from './components/auth/register/register-step2/register-step2.component';
import { RegisterStep3Component } from './components/auth/register/register-step3/register-step3.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirstNavbarComponent } from './components/first-navbar/first-navbar.component';


/* Feed*/
import { AfterloginComponent } from './components/afterlogin/afterlogin.component';
import { FeedPageComponent } from './components/feed-page/feed-page.component'
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedviewComponent } from './components/feed-page/feedview/feedview.component';

import { ProfileComponent } from './components/profile/profile.component';
import { MiniprofComponent } from './components/feed-page/miniprof/miniprof.component';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { SettingsComponent} from './components/settings/settings.component';
import { LikesComponent } from './components/feed-page/likes/likes.component';
import { PetminiComponent } from './components/feed-page/petmini/petmini.component'

import { TimeComponent } from './components/time/time.component'
import { DatePipe } from '@angular/common';
import { CommentsComponent } from './components/feed-page/comments/comments.component';
import { ReactionsComponent } from './components/feed-page/reactions/reactions.component';
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
    LandingPageComponent,
    AfterloginComponent,
    FeedPageComponent,
    NavbarComponent,
    FeedviewComponent,
    FirstNavbarComponent,
    ProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    MiniprofComponent,
    ProfileComponent,
    SettingsComponent,
    LikesComponent,
    PetminiComponent,
    TimeComponent,
    CommentsComponent,
    ReactionsComponent,
    InfoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularCountdownDateTimeModule,
  ],

  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, DatePipe ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
