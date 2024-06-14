import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  // {
  //   path:'user',
  //   component:UserComponent
  // },
  // {
  //   path:'description',
  //   component:DescriptionComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
