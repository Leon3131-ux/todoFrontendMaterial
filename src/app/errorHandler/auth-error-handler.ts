import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private toastr: ToastrService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse): void {
    if (environment.generic_error_messages === true){
      this.handleGeneric(error);
    }else{
      this.handleNonGeneric(error);
    }
  }

  handleGeneric(error: HttpErrorResponse){
    this.toastr.error(
      this.translateService.instant('errors.authentication.unauthorized'),
      'Error 403',
      {timeOut: 5000}
    );
  }

  handleNonGeneric(error: HttpErrorResponse){
    if (error.error){
      this.toastr.error(
        this.translateService.instant('errors.authentication.unauthorized'),
        error.error.message,
        {timeOut: 5000}
      );
    }else{
      this.toastr.error(
        this.translateService.instant('errors.authentication.unauthorized'),
        error.message,
        {timeOut: 5000}
      );
    }
  }
}
