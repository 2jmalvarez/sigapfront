import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cumplimiento'
})
export class CumplimientoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {


    if (value < 0.5)
      return 'No cumple'
    else if (value >= 0.5 && value < 0.8)
      return 'Cumple parcialmente'
    else if (value >= 0.8)
      return 'Cumple totalmente'

  }

}
