import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskSaveComponent} from './task-save.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    TaskSaveComponent
  ],
  exports: [
    TaskSaveComponent
  ],
  imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      FormsModule,
      TranslateModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatInputModule,
      MatButtonModule,
      MatNativeDateModule,
      ReactiveFormsModule
  ]
})
export class TaskSaveModule { }
