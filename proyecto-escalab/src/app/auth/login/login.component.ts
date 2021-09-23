import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  private crearFormulario() {
    this.form = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      recordar: [false]
    });
  }

  ingresar(){

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    if (this.form.get('recordar').value) {
      localStorage.setItem('email', this.form.get('email').value);
    } else {
      localStorage.removeItem('email');
    }

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Ingresando...'
    });

    Swal.showLoading();

    this.usuario.email = this.form.value.email;
    this.usuario.password = this.form.value.password;

    this.login(this.usuario);

    this.form.reset();
  }

  private login(usuario:UsuarioModel) {
    this.authService.login(usuario)
    .subscribe(resp => {

      this.router.navigateByUrl('/home');

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Autenticación correcta'
      })
    }, (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar',
        text: `${err.error.error.message}`,
      })
    })
  }

}
