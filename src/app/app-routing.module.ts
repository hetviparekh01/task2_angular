import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:UserComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
