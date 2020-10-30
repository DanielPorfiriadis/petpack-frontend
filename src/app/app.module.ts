import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
>>>>>>> 5369d94190eebcae466a8dd586c8c3c8789b850f

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

/* Components */
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterStep1Component } from './components/register/register-step1/register-step1.component';
import { RegisterStep2Component } from './components/register/register-step2/register-step2.component';
import { RegisterStep3Component } from './components/register/register-step3/register-step3.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/* Feed*/
import { FeedFormComponent } from './components/feed-form/feed-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedComponent } from './components/feed/feed.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



/* Feed stop */

/*Angular Material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

/*Steps*/
import { RegistrationStep1Component } from './components/registration-step1/registration-step1.component';
import { RegistrationStep2Component } from './components/registration-step2/registration-step2.component';
import { RegistrationStep3Component } from './components/registration-step3/registration-step3.component';
/*apo edw: https://github.com/srikanthmadasu/angular-material-stepper-example/tree/master/src/app/components/registration-step1*/

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent,
    RegisterComponent,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
    LandingPageComponent,
    FeedFormComponent,
    DashboardComponent,
    FeedComponent,
    PageNotFoundComponent,
=======
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component
>>>>>>> 5369d94190eebcae466a8dd586c8c3c8789b850f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    
=======
    AngularMaterialModule
>>>>>>> 5369d94190eebcae466a8dd586c8c3c8789b850f
  ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
