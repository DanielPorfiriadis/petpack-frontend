import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
