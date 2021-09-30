import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

// Pages
import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
        path:'',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad:[ AuthGuard ],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
      }
];


@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}