import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { dropify, labelFloating } from '../../../assets/js/custom'; 

import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CargaImagenService } from 'src/app/services/carga-imagen.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { ValidatorsService } from 'src/app/services/validators.service';

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
  event:any;
  private uploadPercent: Observable<number>;
  private urlImagen: Observable<string>;

  susNuevoPost: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private cargaImagenService: CargaImagenService,
    private storage: AngularFireStorage,
    private validators: ValidatorsService) {
     }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerDatosPerfil();
    dropify();
    labelFloating();
  }

  ngOnDestroy(): void {
    if (!this.susNuevoPost === undefined) {
      this.susNuevoPost.unsubscribe();  
    }
  }

  canDeactivate(): Promise<any> | boolean {
    if (this.form.dirty) {

      return new Promise((resolve, reject) => {
        Swal.fire({
          title: '¿Está seguro?',
          text: "No se guardarán los cambios",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, estoy seguro.'
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          }
          resolve(false);
        })
      })
    } else {
      return true;
    }
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
    return this.form.get('imagen').invalid && this.form.get('imagen').touched && this.event.target.files[0].type.startsWith('image');
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

    this.uploadFile(this.event);

  }

  uploadFile(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        ref.getDownloadURL()
        .subscribe( url => {
          this.postModel.urlImagen = url;
          this.nuevoPost(this.postModel);
        })
      })
    ).subscribe();
  }

  private nuevoPost(post: PostModel){
    this.susNuevoPost = this.postService.nuevoPost(post)
    .subscribe(resp => {

      Swal.fire({
        allowOutsideClick: false,
        icon:'success',
        text:'Contenido agregado correctamente'
      });

      this.form.reset();

      this.router.navigateByUrl('/posts');

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar nuevo Contenido',
        text: `${err.error.error.message}`,
      });
    })
  }

  subirImg(e){
    this.event = e;

    if (!this.event.target.files[0].type.startsWith('image')) {
      this.form.controls['imagen'].setErrors({ imgInvalid: true });
    } else {
      this.form.controls['imagen'].setErrors(null);
    }
  }

  volver() {
    this.router.navigateByUrl("/posts");
  }

}
