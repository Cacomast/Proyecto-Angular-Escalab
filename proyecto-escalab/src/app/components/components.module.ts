import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { PipesModule } from '../pipes/pipes.module';

// Components
import { PostcardComponent } from './postcard/postcard.component';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    PostcardComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    PostcardComponent,
    MessageComponent
  ]
})
export class ComponentsModule { }
