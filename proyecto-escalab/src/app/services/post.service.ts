import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { Comentario, Like, PostModel } from '../models/post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private uri:string = '';
  private posts:PostModel[];

  constructor( private http: HttpClient ) { }


  nuevoPost(post: PostModel){

    this.uri = `${environment.hostFirebase}/posts.json`;

    const postObj = {
      ...post
    }
    
    delete postObj.id;

    return this.http.post(this.uri,postObj);
  }

  getPosts() {

    this.uri = `${environment.hostFirebase}/posts.json`;

    return this.http.get(this.uri)
    .pipe(
      map( this.ajustarId )
    );
  }

  getPost( id: string) {

    this.uri = `${environment.hostFirebase}/posts/${id}.json`;

    return this.http.get(this.uri)
    .pipe(
      map( this.ajustarListas )
    )
  }

  agregarComentario(comentario: Comentario, id: string) {

    this.uri = `${environment.hostFirebase}/posts/${id}/comentarios.json.`;

    console.log(`uri actualiza post: ${this.uri}`);

    return this.http.post(this.uri,comentario);

  }

  private ajustarListas (postObj:any){
    const post:PostModel = postObj;
    const listaComentarios: Comentario[] = [];

    if (post.comentarios === undefined) {
      post.comentarios = [];
    } else {
      Object.keys(post.comentarios).forEach( key => {
        const comment:Comentario = post.comentarios[key];
        listaComentarios.push(comment);
      });
    }

    post.comentarios = listaComentarios;

    return post;

  }


  private ajustarId (postObj: object){

    this.posts = [];

    if (postObj === null) { return []; }

    Object.keys(postObj).forEach(key => {
      const post:PostModel = postObj[key];
      post.id = key;
      
      if (post.comentarios === undefined) {
        post.comentarios = [];
      }

      if (post.likes === undefined) {
        post.likes = [];
      }

      this.posts.push(post);

    });

    

    return this.posts;
  }
}
