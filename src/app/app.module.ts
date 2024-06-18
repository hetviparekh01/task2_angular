import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { MyCustomRendererComponent } from './my-custom-renderer/my-custom-renderer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './token.interceptor';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MyCustomRendererComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {  provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi: true },
    {  provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi: true },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
