import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule
  ],
  exports: [RoutesRoutingModule], // 2- Export the imported module because it has to be global module (app.module.ts)
  declarations: []
})
export class RoutesModule { }
