import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private authService: AuthService, private validators: ValidatorsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repitePassword: ['', Validators.required],
      nombre : ['', Validators.required]
    },{
      validators: this.validators.passwordsIguales('password','repitePassword')
    });
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  
  get repitePasswordNoValido() {
    const pass1 = this.form.get('password').value;
    const pass2 = this.form.get('repitePassword').value;

    return ( pass1 === pass2 )?false:true;
  }

  registrar(){

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Registrando...'
    });

    Swal.showLoading();

    this.usuario.email = this.form.value.email;
    this.usuario.password = this.form.value.password;
    this.usuario.displayName = this.form.value.nombre;

    this.registro(this.usuario);

    this.form.reset();
  }

  private registro(usuario:UsuarioModel) {
    this.authService.nuevoUsuario(usuario)
    .subscribe(resp => {

      usuario.idToken = this.authService.leerToken();
      this.actualizarPerfil(this.usuario);
      
    }, (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: `${err.error.error.message}`,
      })
    })
  }

  private actualizarPerfil(usuario:UsuarioModel){
    this.authService.actualizarPerfil(usuario)
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
        title: 'Registro correcto'
      })

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: `${err.error.error.message}`,
      })
    })
  }

}
