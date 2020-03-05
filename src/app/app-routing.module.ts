import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {AppGuard} from "./guard/app.guard";
import {AddComponent} from "./add/add.component";
import {AuthGuard} from "./guard/auth.guard";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'details/:city', component: DetailsComponent, canActivate: [AppGuard]},
  {path: 'add', component: AddComponent, canActivate: [AppGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent , canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
