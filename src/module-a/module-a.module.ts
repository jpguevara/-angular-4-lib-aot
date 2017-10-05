import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModuleAComponent } from './module-a.component';

import {
  routes
} from './module-a.routes';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
  ],
  exports: [
    ModuleAComponent
  ],
  declarations: [
    ModuleAComponent
  ],
  providers: [],
  bootstrap: [ModuleAComponent]
})
export class ModuleAModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModuleAModule, providers: [

      ]
    };
  }
}
