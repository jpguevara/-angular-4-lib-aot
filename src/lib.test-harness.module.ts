import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LibraryComponent, LibraryModule } from './index';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    LibraryModule,
    RouterModule.forRoot([{ path: '', component: LibraryComponent }])
  ],
  providers: [],
  bootstrap: [LibraryComponent]
})
export class LibTestHarnessModule { }
