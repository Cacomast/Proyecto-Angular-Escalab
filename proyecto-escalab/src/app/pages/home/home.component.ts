import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from 'src/app/services/post.service';

import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';
import { CacheModel } from 'src/app/models/cache.model';

import { imagesPopups, btnCircleCustom } from '../../../assets/js/custom'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:PostModel[];
  postModel:PostModel;
  data:any;
  cache:CacheModel;
  like: Like;
  comentario: Comentario;
  likes:Like[];
  comentarios:Comentario[];

  constructor(private router:Router, private postService: PostService) {
    imagesPopups();
  }

  ngOnInit(): void {

    imagesPopups();
    btnCircleCustom();

    this.postModel = new PostModel();
    this.cache = new CacheModel();
    this.comentarios = [];
    this.likes = [];
    this.getPosts();
    this.obtenerDatosPerfil();
  }

  getPosts(){
    this.postService.getPosts()
    .subscribe (resp => {
      this.posts = resp;
      this.posts = this.posts.sort((a,b) => a.fecha < b.fecha?1:a.fecha > b.fecha?-1:0);
    }, (err) => {

    })
  }

  nuevoContenido(){
    this.router.navigateByUrl("/nuevopost");
  }

  eliminarContenido(id:string) {
    console.log('Se elimina contenido con id: ',id);

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          allowOutsideClick: false,
          icon:'info',
          text:'Eliminando contenido...'
        });
    
        Swal.showLoading();

        this.postService.eliminarPost(id)
        .subscribe( resp => {
          Swal.fire(
          '¡Se fue!',
          'Tu contenido fue eliminado.',
          'success'
          )

          this.posts = this.posts.filter(p => p.id != id);
        }, (err) => {

          Swal.fire({
            allowOutsideClick: false,
            icon:'error',
            text:`${err.message}`
          });

          console.log(err);

        });
        
      }
    })
  }

  obtenerDatosPerfil(){
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.cache.nombre = this.data.nombre;
    this.cache.mail = this.data.mail;
  }

}
