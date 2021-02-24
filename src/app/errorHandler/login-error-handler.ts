import {HttpResponseErrorHandler} from './http-response-error-handler';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LoginErrorHandler implements HttpResponseErrorHandler{
  constructor(private toastr: ToastrService, private translateService: TranslateService) {}

  matches(error: HttpErrorResponse): boolean {
    if(error.status === 403){
      return true;
    }
  }

  handle(error: HttpErrorResponse) {
    this.toastr.error(
      this.translateService.instant('errors.login.credentials.wrong'),
      'Error',
      {timeOut: 5000}
    );
  }
}
