import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Comentario, PostModel } from 'src/app/models/post.model';
import { MensajesService } from 'src/app/services/mensajes.service';

import { PostService } from 'src/app/services/post.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallepost',
  templateUrl: './detallepost.component.html',
  styleUrls: ['./detallepost.component.scss']
})
export class DetallepostComponent implements OnInit {

  postModel: PostModel;
  comment: Comentario;
  comentarios:Comentario[];
  id:string;
  form: FormGroup;
  userData:any;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private mensajeService: MensajesService) {

      this.mensajeService.cargarMensajes(this.route.snapshot.paramMap.get('id'))
      .subscribe( resp => {
        this.comentarios = resp;
      });

    }

  ngOnInit(): void {
    this.crearFormulario();
    this.postModel = new PostModel();
    this.id = this.route.snapshot.paramMap.get('id');

    this.getPost();
    this.obtenerDatosPerfil();
  }

  private crearFormulario() {
    this.form = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  private obtenerDatosPerfil(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  get comentario() {
    return this.form.get('comentario').errors != null && this.form.get('comentario').dirty;
  }

  getPost(){
    this.postService.getPost(this.id)
    .subscribe ((resp) => {

      this.postModel = resp;

      if (resp === null) {
        this.router.navigateByUrl('/home');
      }
      this.postModel.id = this.id;
    }, (err) => {

    })
  }

  sendMessage(){


    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Enviando comentario...'
    });

    Swal.showLoading();

    this.comment = new Comentario();

    this.comment.comentario = this.form.value.comentario;
    this.comment.email = this.userData.mail;
    this.comment.fecha = new Date();
    this.comment.nombre = this.userData.nombre;

    this.postModel.comentarios.push(this.comment);

    this.actualizarPost(this.postModel);
  }

  private actualizarPost(postModel: PostModel){
    this.postService.agregarComentario(this.comment, this.postModel.id)
    .subscribe (resp => {

      console.log(resp);
      this.form.reset();
      Swal.close();

    }, (err) => {

      Swal.fire({
        allowOutsideClick: false,
        icon:'error',
        text:`${err.message}`
      });

      console.log(err);

    })
  }

}
