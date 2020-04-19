import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  imports: [ ...MaterialComponents ],
  exports: [ ...MaterialComponents ]
})
export class MaterialModule {}
