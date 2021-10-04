import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NuevopostComponent } from '../pages/nuevopost/nuevopost.component';

import Swal from 'sweetalert2';
import { MensajesService } from '../services/mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class FormGuardGuard implements CanDeactivate<unknown> {

  constructor(private mensaje: MensajesService){}

  canDeactivate(
    component: NuevopostComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) : any {

      if (component.canDeactivate) {
        return component.canDeactivate();
      }
      return true;
  }

}
