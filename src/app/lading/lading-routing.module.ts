import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadingPage } from './lading.page';

const routes: Routes = [
  {
    path: '',
    component: LadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadingPageRoutingModule {}
