import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorSnackBarComponent} from '../components/error-snack-bar/error-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public error(title: string, message: string, duration: number){
    this.snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'error',
      data: {
        title: title,
        message: message
      }
    })
  }

}
