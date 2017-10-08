import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularLibComponent, AngularLibModule } from './index';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    AngularLibModule,
    RouterModule.forRoot([{ path: '', component: AngularLibComponent }])
  ],
  providers: [],
  bootstrap: [AngularLibComponent]
})
export class LibTestHarnessModule { }
