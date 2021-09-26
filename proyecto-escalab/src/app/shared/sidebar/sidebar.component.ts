import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  userData:any;

  constructor(private auth: AuthService) { }

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
