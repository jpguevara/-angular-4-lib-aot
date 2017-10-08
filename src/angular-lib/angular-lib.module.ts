import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularLibComponent } from './angular-lib.component';
import * as components from './components';

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
    components.GlobalLayoutComponent,
    AngularLibComponent
  ],
  exports: [
    // ...Object.keys(components).map(key => components[key]) // doesn't work with aot
    AngularLibComponent,
    components.FatalErrorPageComponent,
    components.GlobalLayoutComponent
  ],
  providers: [],
  bootstrap: [components.GlobalLayoutComponent]
})
export class AngularLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularLibModule, providers: [

      ]
    };
  }
}
