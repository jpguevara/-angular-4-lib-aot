import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleAModule } from './index';

@NgModule({
  declarations: [

  ],
  imports: [
    ModuleAModule
  ],
  providers: [],
  bootstrap: [ModuleAModule]
})
export class LibTestHarnessModule { }
