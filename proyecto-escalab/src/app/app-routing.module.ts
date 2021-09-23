import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


// Pages Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { NuevopostComponent } from './pages/nuevopost/nuevopost.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'nuevopost', component: NuevopostComponent},
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
