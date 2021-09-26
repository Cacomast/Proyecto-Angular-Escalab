import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { init } from '../../../assets/js/custom'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  userData:any;

  constructor(private auth: AuthService) {
    init();
   }

  ngOnInit(): void {
    this.obtenerDatosPerfil();
  }

  logout(){
    this.auth.logout();
  }

  obtenerDatosPerfil(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

}