import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/post.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  myMessage:boolean = false;
  userData:any;
  
  @Input('comentario') comentario:Comentario = new Comentario();

  constructor() { }

  ngOnInit(): void {

    this.obtenerDatosPerfil();

    this.myMessage = (this.userData.mail === this.comentario.email)?true:false;
  
  }

  obtenerDatosPerfil(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

}
