import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NuevopostComponent } from './nuevopost/nuevopost.component';
import { DetallepostComponent } from './detallepost/detallepost.component';
import { FormGuardGuard } from '../guards/form-guard.guard';

const childRoutes:Routes = [
  {path: '', component: HomeComponent, data:{titulo: 'Home'}},
  {path: 'nuevopost', canDeactivate: [FormGuardGuard], component: NuevopostComponent, data:{titulo: 'Nuevo Post'}},
  {path: 'detallepost/:id', component: DetallepostComponent, data:{titulo: 'Detalle Post'}},
]

@NgModule({
  imports:[ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
