import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NuevopostComponent } from './nuevopost/nuevopost.component';
import { DetallepostComponent } from './detallepost/detallepost.component';

const childRoutes:Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'nuevopost', component: NuevopostComponent},
  {path: 'detallepost/:id', component: DetallepostComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'}
]

@NgModule({
  imports:[ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
