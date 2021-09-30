import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { CacheModel } from 'src/app/models/cache.model';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {

  @Input('post') postModel:PostModel = new PostModel();
  @Input('cache') cache:CacheModel = new CacheModel();

  @Output() eliminarPost: EventEmitter<string> = new EventEmitter();


  eliminar(){
    this.eliminarPost.emit(this.postModel.id);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
