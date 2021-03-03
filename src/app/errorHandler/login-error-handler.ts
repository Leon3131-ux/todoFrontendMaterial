import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable()
export class LoginErrorHandler implements HttpResponseErrorHandler{
  constructor(private snackBarService: SnackBarService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 403){
      return true;
    }
  }

  handle(error: HttpErrorResponse) {
    this.snackBarService.error(
      "Error 403",
      this.translateService.instant('errors.login.credentials.wrong'),
      5000
    );
  }
}
