import { BrowserModule } from '@angular/platform-browser';

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
import { CookieService } from 'ngx-cookie-service'; /* npm install ngx-cookie-service --save */

/* Feed*/
import { AfterloginComponent } from './components/afterlogin/afterlogin.component';


/* npm install angular-countdown-date-time */
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';

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
  ],
  imports: [
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

  providers: [ CookieService ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
