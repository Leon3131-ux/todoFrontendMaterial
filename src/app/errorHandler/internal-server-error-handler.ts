import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseErrorHandler} from './http-response-error-handler';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class InternalServerErrorHandler implements HttpResponseErrorHandler{

  constructor(private toastr: ToastrService, private translateService: TranslateService) {
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
    this.toastr.error(
      this.translateService.instant('errors.general.internalError'),
      'Error 500',
      {timeOut: 5000}
    );
  }

  handleNonGeneric(error: HttpErrorResponse){
    if(error.error){
      this.toastr.error(
        error.error.message,
        'Error 500',
        {timeOut: 5000}
      );
    }else{
      this.toastr.error(
        error.message,
        'Error 500',
        {timeOut: 5000}
      );
    }
  }
}
