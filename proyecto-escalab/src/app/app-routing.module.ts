import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo:'/home', pathMatch:'full'}
    ]
  }, 

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
