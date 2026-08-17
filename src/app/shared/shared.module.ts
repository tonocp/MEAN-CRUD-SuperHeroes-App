import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { BackendLoaderComponent } from './backend-loader/backend-loader.component';

@NgModule({
  declarations: [BackendLoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [BackendLoaderComponent],
})
export class SharedModule {}
