import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:PostModel[];
  postModel:PostModel;
  like: Like;
  comentario: Comentario;
  likes:Like[];
  comentarios:Comentario[];

  constructor(private router:Router, private postService: PostService) { }

  ngOnInit(): void {

    this.postModel = new PostModel();
    this.comentarios = [];
    this.likes = [];
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts()
    .subscribe (resp => {
      this.posts = resp;
      console.log(this.posts);
    }, (err) => {

    })
  }

  nuevoContenido(){
    this.router.navigateByUrl("/nuevopost");
  }

}
