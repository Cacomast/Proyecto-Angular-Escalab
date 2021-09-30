import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ValidateComentariosPipe } from './validate-comentarios.pipe';
import { ValidatePipe } from './validate.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ValidatePipe,
    ValidateComentariosPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ValidatePipe,
    ValidateComentariosPipe
  ]
})
export class PipesModule { }
