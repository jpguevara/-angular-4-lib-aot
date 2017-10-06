import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LibraryComponent } from './library.component';
import { GlobalLayoutComponent } from './global-layout/global-layout.component';
import * as components from './components'
// import { routes } from './library.routes';


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    RouterModule.forChild([]),
    NgbModule.forRoot(),
  ],
  declarations: [
    components.FatalErrorPageComponent,
    GlobalLayoutComponent,
    LibraryComponent
  ],
  exports: [
    // ...Object.keys(components).map(key => components[key]) // does not work with aot
    LibraryComponent,
    components.FatalErrorPageComponent,
    GlobalLayoutComponent
  ],
  providers: [],
  bootstrap: [GlobalLayoutComponent]
})
export class LibraryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibraryModule, providers: [

      ]
    };
  }
}
