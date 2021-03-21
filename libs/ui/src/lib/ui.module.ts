import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PromptSelectComponent } from './prompt-select/prompt-select.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // angular material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    // angular material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    FormComponent,
    PromptSelectComponent
  ],
  declarations: [FormComponent, PromptSelectComponent]
})
export class UiModule {}
