import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './signin/services/singin.service';
import { MypageComponent } from './mypage/mypage.component';
import { AUTH_API_URL } from './app-injection-tokens';
import { AuthInterceptor } from './auth.interceptor';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    MypageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({config:{
      tokenGetter, 
      allowedDomains: environment.tokenWhiteListedDomains
    }}),
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.inWorkApi
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
