import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri:string = '';
  private userToken:string = '';

  constructor( private http: HttpClient, private router: Router) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  login(usuario: UsuarioModel) {

    this.uri = `${environment.hostAuthApi}signInWithPassword?key=${environment.apiKey}`;

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: usuario.returnSecureToken
    };

    return this.http.post(
      this.uri,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel) {

    this.uri = `${environment.hostAuthApi}signUp?key=${environment.apiKey}`;

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: usuario.returnSecureToken
    };

    return this.http.post(
      this.uri,
      authData
    ).pipe(
      map( resp => {
        console.log(resp['idToken']);
        this.guardarToken(resp['idToken']);
      })
    );
  }

  actualizarPerfil(usuario: UsuarioModel) {
    this.uri = `${environment.hostAuthApi}update?key=${environment.apiKey}`;

    const authData = {
      idToken: usuario.idToken,
      displayName: usuario.displayName,
      photoUrl: usuario.photoUrl,
      returnSecureToken: usuario.returnSecureToken
    };

    console.log('Actualizar el perfil:');
    console.log(usuario);

    return this.http.post(
      this.uri,
      authData);
  }

  obtenerDatosPerfil() {

    const token = localStorage.getItem('token') || '';

    this.uri = `${environment.hostAuthApi}lookup?key=${environment.apiKey}`;

    const authData = {
      idToken: token
    };

    return this.http.post(
      this.uri,
      authData
    ).pipe(
      map( (resp:any) => {

        console.log(resp);

        const json = {
          nombre: resp.users[0].displayName,
          mail: resp.users[0].email
        }

        localStorage.setItem('userData',JSON.stringify(json));
      })
    );

  }

  validarToken():boolean {
    
    if (this.leerToken() === '') {
      return false;
    } 

    return true;
    
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
