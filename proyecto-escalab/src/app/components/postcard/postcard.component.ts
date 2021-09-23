import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {

  @Input('post') postModel:PostModel = new PostModel();

  constructor() { }

  ngOnInit(): void {
  }

}
