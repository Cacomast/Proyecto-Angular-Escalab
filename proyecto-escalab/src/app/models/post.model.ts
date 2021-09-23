export class PostModel {
    email:string = '';
    fecha:Date = new Date();
    nombre:string = '';
    contenido:string = '';
    titulo:string = '';
    urlImagen:string = '';
    comentarios:Comentario[] = [];
    likes:Like[] = [];
}

export class Comentario {
    comentario:string = '';
    email:string = '';
    nombre:string = '';
    fecha:Date = new Date();
}

export class Like {
    email:string = '';
}