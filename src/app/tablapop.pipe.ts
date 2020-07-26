import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablapop'
})
export class TablapopPipe implements PipeTransform {

  transform(value, ...args: unknown[]): unknown {

    let res = ''
    
   
    
    

    if ( typeof value == "object") {
      if (Array.isArray(value)) {
        res = String(value.map(a=> " "+a.usuarios.mostrar))
      } 
      else res = value.mostrar
    }
    else res = value

    // if(value != undefined && value.indexOf('.000Z'))
    //  {res = (new Date(value)).toLocaleDateString()}
    
    return res;
  }

}
