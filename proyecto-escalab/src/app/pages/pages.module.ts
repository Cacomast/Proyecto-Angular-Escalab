import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Pages
import { HomeComponent } from './home/home.component';
import { NuevopostComponent } from './nuevopost/nuevopost.component';
import { DetallepostComponent } from './detallepost/detallepost.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    HomeComponent,
    NuevopostComponent,
    DetallepostComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    NuevopostComponent,
    DetallepostComponent,
    PagesComponent
  ]
})
export class PagesModule { }
