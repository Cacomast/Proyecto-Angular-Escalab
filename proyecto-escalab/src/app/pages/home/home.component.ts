import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:PostModel[] = [];
  postModel:PostModel;
  like: Like;
  comentario: Comentario;
  likes:Like[] = [];
  comentarios:Comentario[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.postModel = new PostModel();
    this.comentarios = [];
    this.likes = [];

    this.postModel.email = 'test3@test.cl';
    this.postModel.nombre = 'Ficticio';
    this.postModel.fecha = new Date();
    this.postModel.titulo = 'Featured Hydroflora Pots Garden & Outdoors';
    this.postModel.contenido = 'Titudin venenatis ipsum ac feugiat. Vestibulum ullamcorper quam.';
    this.postModel.urlImagen = 'https://firebasestorage.googleapis.com/v0/b/postservice-d4cdb.appspot.com/o/img1.jpg?alt=media&token=67ca5473-471c-4b7e-9c3a-c8524c005497';

    this.like = new Like();
    this.like.email = 'cnavarrete@flagare.cl';

    this.comentario = new Comentario();
    this.comentario.comentario = 'Primer Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.comentarios.push(this.comentario);

    this.comentario = new Comentario();
    this.comentario.comentario = 'Segundo Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.likes.push(this.like);
    this.comentarios.push(this.comentario);

    this.postModel.comentarios = this.comentarios;
    this.postModel.likes = this.likes;

    this.posts.push(this.postModel);

    //Elemento 2

    this.postModel = new PostModel();
    this.comentarios = [];
    this.likes = [];

    this.postModel.email = 'test3@test.cl';
    this.postModel.nombre = 'Ficticio';
    this.postModel.fecha = new Date();
    this.postModel.titulo = 'Featured Hydroflora Pots Garden & Outdoors';
    this.postModel.contenido = 'Titudin venenatis ipsum ac feugiat. Vestibulum ullamcorper quam.';
    this.postModel.urlImagen = 'https://firebasestorage.googleapis.com/v0/b/postservice-d4cdb.appspot.com/o/img2.jpg?alt=media&token=fe61b05c-3541-4283-8456-364f90a228a5';

    this.like = new Like();
    this.like.email = 'cnavarrete@flagare.cl';

    this.comentario = new Comentario();
    this.comentario.comentario = 'Primer Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.comentarios.push(this.comentario);

    this.comentario = new Comentario();
    this.comentario.comentario = 'Segundo Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.likes.push(this.like);
    this.comentarios.push(this.comentario);

    this.postModel.comentarios = this.comentarios;
    this.postModel.likes = this.likes;

    this.posts.push(this.postModel);

    //Elemento 3

    this.postModel = new PostModel();
    this.comentarios = [];
    this.likes = [];

    this.postModel.email = 'test3@test.cl';
    this.postModel.nombre = 'Ficticio';
    this.postModel.fecha = new Date();
    this.postModel.titulo = 'Featured Hydroflora Pots Garden & Outdoors';
    this.postModel.contenido = 'Titudin venenatis ipsum ac feugiat. Vestibulum ullamcorper quam.';
    this.postModel.urlImagen = 'https://firebasestorage.googleapis.com/v0/b/postservice-d4cdb.appspot.com/o/img3.jpg?alt=media&token=1fd89d0b-9675-421d-8463-297dec7a3923';

    this.like = new Like();
    this.like.email = 'cnavarrete@flagare.cl';

    this.comentario = new Comentario();
    this.comentario.comentario = 'Primer Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.comentarios.push(this.comentario);

    this.comentario = new Comentario();
    this.comentario.comentario = 'Segundo Comentario';
    this.comentario.email = 'cabarca@flagare.cl';
    this.comentario.fecha = new Date();
    this.comentario.nombre = 'Carlos Abarca';

    this.likes.push(this.like);
    this.comentarios.push(this.comentario);

    this.postModel.comentarios = this.comentarios;
    this.postModel.likes = this.likes;

    this.posts.push(this.postModel);

  }

  nuevoContenido(){
    this.router.navigateByUrl("/nuevopost");
  }

}
