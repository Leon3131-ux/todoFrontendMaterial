import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './components/login/login.module';
import {AuthErrorHandler} from './errorHandler/auth-error-handler';
import {DefaultErrorHandler} from './errorHandler/default-error-handler';
import {InternalServerErrorHandler} from './errorHandler/internal-server-error-handler';
import {LoginErrorHandler} from './errorHandler/login-error-handler';
import {NotFoundErrorHandler} from './errorHandler/not-found-error-handler';
import {DoNothingErrorHandler} from './errorHandler/do-nothing-error-handler';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TaskTableModule} from './components/task-table/task-table.module';
import { HomeComponent } from './components/home/home.component';
import {HomeModule} from './components/home/home.module';
import {TaskSaveModule} from './components/task-save/task-save.module';
import {httpInterceptProviders} from './httpInterceptors/HttpInteceptProviders';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'login'}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSliderModule,
    BrowserAnimationsModule,
    LoginModule,
    HomeModule,
    TaskTableModule,
    TaskSaveModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthErrorHandler,
    DefaultErrorHandler,
    InternalServerErrorHandler,
    LoginErrorHandler,
    NotFoundErrorHandler,
    DoNothingErrorHandler,
    httpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
