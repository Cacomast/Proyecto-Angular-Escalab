import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';

import { PostModel } from 'src/app/models/post.model';
import { Comentario } from 'src/app/models/post.model';
import { Like } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevopost',
  templateUrl: './nuevopost.component.html',
  styleUrls: ['./nuevopost.component.scss']
})
export class NuevopostComponent implements OnInit {

  form: FormGroup;
  postModel:PostModel = new PostModel();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.maxLength(500)]],
      imagen: ['', Validators.required]
    });
  }

  get tituloNoValido() {
    return this.form.get('titulo').invalid && this.form.get('titulo').touched;
  }

  get contenidoNoValido() {
    return this.form.get('contenido').invalid && this.form.get('contenido').touched;
  }

  get imagenNoValida() {
    return this.form.get('imagen').invalid && this.form.get('imagen').touched;
  }

  nuevoContenido() {

  }

  volver() {
    this.router.navigateByUrl("/home");
  }

}
