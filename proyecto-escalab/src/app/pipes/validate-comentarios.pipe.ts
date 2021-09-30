import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validateComentarios'
})
export class ValidateComentariosPipe implements PipeTransform {

  transform(value: any): string {

    return (value === 1)?`${value} Comentario`: `${value} Comentarios`;
  }

}
