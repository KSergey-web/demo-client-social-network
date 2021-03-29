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
import { MyPageComponent } from './mypage/mypage.component';
import { AUTH_API_URL, INWORK_API } from './app-injection-tokens';
import { httpInterceptorProviders } from './interceptors';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { InfoAboutUserComponent } from './mypage/components/info-about-user/info-about-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyOrganizationsComponent } from './my-organizations/my-organizations.component';
import { ArrayOrganizationsComponent } from './my-organizations/components/array-organizations/array-organizations.component';
import { OrganizationFormComponent } from './my-organizations/components/organization-form/organization-form.component';
import { EmployeesComponent } from './employees/employees.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    MyPageComponent,
    SignUpComponent,
    HeaderComponent,
    InfoAboutUserComponent,
    NavigationComponent,
    MyOrganizationsComponent,
    ArrayOrganizationsComponent,
    OrganizationFormComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    provide: INWORK_API,
    useValue: environment.inWorkApi
  },
  httpInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }