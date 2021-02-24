import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskTableComponent} from './task-table.component';
import {MatTableModule} from '@angular/material/table';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    TaskTableComponent
  ],
  exports: [
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TaskTableModule { }
