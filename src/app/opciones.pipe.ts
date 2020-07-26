import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'opciones'
})
export class OpcionesPipe implements PipeTransform {

  async transform(value: unknown, ...args: unknown[]): Promise<unknown> {
    if (args != null) {
      const base:{} = await args[0]
      // console.log("value",typeof value);
      
      // console.log("base",base);
      // let rtaObject : String = " "
      for (const key in base) {
        if (base.hasOwnProperty(key)) {
          const element = base[key];
          // if (typeof value == 'object') {
          //   // console.log("aca esta el kilomobo");
          //   for (const keyy in value) {
          //     if (value.hasOwnProperty(keyy)) {
          //       const elementt = value[keyy];
          //       if (element['_id'] == elementt['_id']) 
          //         rtaObject += element['mostrar'] + ", "
          //     }
          //   }
          //    return rtaObject
            
          // } else
          if (element['_id'] == value) {
            // console.log('=================element[mostrar]===================');
            // console.log(element['mostrar']);
            // console.log('====================================');
            return element['mostrar']
          }
          
        }
      }

      // for (const iterator of args[0]) {
      //   console.log("iterator",iterator);
        
      // }

      return value
      

    }

    return null;
  }

}
