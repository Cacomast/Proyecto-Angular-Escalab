import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nuevopost',
  templateUrl: './nuevopost.component.html',
  styleUrls: ['./nuevopost.component.scss']
})
export class NuevopostComponent implements OnInit {

  userData: any;
  form: FormGroup;
  postModel:PostModel = new PostModel();
  comentarios:Comentario[] = [];
  likes:Like[] =[];

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerDatosPerfil();
  }



  private crearFormulario() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.maxLength(500)]],
      imagen: ['', Validators.required]
    });
  }

  get tituloNoValido() {
    return this.form.get('titulo').invalid && this.form.get('titulo').touched;
  }

  get contenidoNoValido() {
    return this.form.get('contenido').invalid && this.form.get('contenido').touched;
  }

  get imagenNoValida() {
    return this.form.get('imagen').invalid && this.form.get('imagen').touched;
  }

  obtenerDatosPerfil(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  nuevoContenido() {

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    console.log(this.form);

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Subiendo post...'
    });
  
    Swal.showLoading();

    this.postModel.titulo = this.form.value.titulo;
    this.postModel.contenido = this.form.value.contenido;
    this.postModel.urlImagen = this.form.value.imagen;
    this.postModel.email = this.userData.mail;
    this.postModel.fecha = new Date();
    this.postModel.nombre = this.userData.nombre;
    this.postModel.comentarios = [];
    this.postModel.likes = [];

    this.nuevoPost(this.postModel);

  }

  private nuevoPost(post: PostModel){
    this.postService.nuevoPost(post)
    .subscribe(resp => {

      Swal.fire({
        allowOutsideClick: false,
        icon:'success',
        text:'Contenido agregado correctamente'
      });

      this.form.reset();

      console.log(resp);

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar nuevo Contenido',
        text: `${err.error.error.message}`,
      });
    })
  }



  volver() {
    this.router.navigateByUrl("/home");
  }

}
