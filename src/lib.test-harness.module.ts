import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularLibComponent, AngularLibModule } from './index';

@NgModule({
  declarations: [],
  imports: [
    AngularLibModule,
    RouterModule.forRoot([{ path: '', component: AngularLibComponent }])
  ],
  providers: [],
  bootstrap: [AngularLibComponent]
})
export class LibTestHarnessModule { }
