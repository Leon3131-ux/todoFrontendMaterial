import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {TaskTableModule} from '../task-table/task-table.module';
import {TaskSaveModule} from '../task-save/task-save.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TaskTableModule,
    TaskSaveModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule
  ]
})
export class HomeModule { }
