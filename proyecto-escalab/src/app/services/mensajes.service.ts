import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private itemsCollection: AngularFirestoreCollection<any>;
  mensajes: any;

  constructor(private afs:AngularFirestore, private afd: AngularFireDatabase) { }

  cargarMensajes(id: string){
    
    // this.itemsCollection = this.afs.collection<any>(id);
    this.mensajes = this.afd.list(`/posts/${id}/comentarios`);
  
    return this.mensajes.valueChanges();

  }


}


