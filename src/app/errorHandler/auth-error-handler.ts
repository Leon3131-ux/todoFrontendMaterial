import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private snackBarService: SnackBarService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse): void {
    this.handleGeneric();
  }

  handleGeneric(){
    this.snackBarService.error(
      'Error 403',
      this.translateService.instant('errors.authentication.unauthorized'),
      5000
    );
  }
}
