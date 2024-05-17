import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadingPageRoutingModule } from './lading-routing.module';

import { LadingPage } from './lading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LadingPageRoutingModule
  ],
  declarations: [LadingPage]
})
export class LadingPageModule {}
