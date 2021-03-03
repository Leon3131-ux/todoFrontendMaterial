import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{

  constructor(private snackBarService: SnackBarService, private translateService: TranslateService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 500;
  }

  handle(error: HttpErrorResponse) {
    if(environment.generic_error_messages === true){
      this.handleGeneric()
    }else{
      this.handleNonGeneric(error);
    }
  }

  handleGeneric(){
    this.snackBarService.error(
      'Error 500',
      this.translateService.instant('errors.general.internalError'),
      5000
    );
  }

  handleNonGeneric(error: HttpErrorResponse){
    if(error.error){
      this.snackBarService.error(
        'Error 500',
        error.error.message,
        5000
      );
    }else{
      this.snackBarService.error(
        'Error 500',
        error.message,
        5000
      );
    }
  }
}
