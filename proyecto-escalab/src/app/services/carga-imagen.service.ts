import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  private carpetaImg:string = 'img;'

  constructor(private firebase: AngularFirestore, private storage: AngularFireStorage) { }

  private guardarImg( img: { nombre: string, url: string } ){

    this.firebase.collection(`/${this.carpetaImg}`).add( img );
  }

  
}
