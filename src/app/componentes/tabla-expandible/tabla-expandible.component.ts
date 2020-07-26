import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { prestServ } from '../../servicios/prestadores.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'tabla-expandible',
  templateUrl: './tabla-expandible.component.html',
  styleUrls: ['./tabla-expandible.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ maxHeight: '1000px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class TablaExpandibleComponent {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;

  @Input() base: String;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  opciones = {};
  columnasRes: any;
  tipoColumnas = [];
  informe = {}
  form: FormGroup

  constructor(
    private prestServ: prestServ,
    private formBuilder: FormBuilder,
  ) {

    // this.prestServ.BuscarBasePrest(this.Datos).subscribe(
    //   Prestadores => {
    //     // console.log(Prestadores);


    //     this.dataSource =  new MatTableDataSource(Prestadores);
    //     this.dataSource.paginator =  this.paginator;
    //     // this.dataSource.sort =  this.sort;

    //   }
    // )


  }

  esObject(a) {
    if (typeof a == 'object')
      return true
    else
      return false
  }

  nuevoInforme = {}


  auxSelectHoja = {}
  ngOnChanges(A): void {
    console.log("this.base['secciones']", this.base["secciones"]);

    // this.nuevoInforme = deepClone( this.base["secciones"])
    this.nuevoInforme = JSON.parse(JSON.stringify(this.base))
    console.log('====================================');
    console.log("this.nuevoInforme", this.nuevoInforme);
    console.log('====================================');

    console.log('================aaaaaaa====================');
    console.log(this.buildForm2(this.nuevoInforme));
    console.log('==============aaaaaaaaa======================');


    this.columnsToDisplay = ["secciones", "porcentaje", "calificacion"]
    this.dataSource = new MatTableDataSource(this.base["secciones"])
    this.dataSource.paginator = this.paginator;



    // this.prestServ("ja")

  }

  // esObject(a) {
  //   if (typeof a == 'object')
  //     return true
  //   else
  //     return false
  // }


  ngOnInit() {









    // // let Columnas = ["nombre", "peso"]
    // // let elemento = []
    // let aux = {}
    // let auxx = []
    // this.prestServ.BuscarBasePopulate("plantillasInformes",
    //   [
    //     {
    //       path: "tipoPrestadores",
    //       model: "TipoPrestador",
    //     },
    //     // {
    //     //   path: "secciones.secciones",
    //     //   model: "Seccion",
    //     // },
    //   ]
    // ).subscribe(
    //   res => {
    //     // let nombreHojas = res[0].map(a => a.mostrar)

    //     aux = res[0][0] // el 2do cero es por la plantilla
    //     let idSecciones = res[0][0]['secciones'].map(a => a.secciones)

    //     console.log("------------------------------------------------------------")
    //     console.log(res[0])
    //     console.log("------------------------------------------------------------")


    //     this.prestServ.BuscarBaseOpciones('secciones', {
    //       "_id": { "$in": idSecciones }
    //       // ,activo: true
    //     }).subscribe(
    //       ress => {

    //         // console.log('==============res===================');
    //         // console.log("aux",aux);
    //         // console.log("ress",ress);
    //         auxx = aux['secciones'].map(a => {
    //           a['secciones'] = ress.filter(b => b['_id'] == a['secciones'])
    //           return a
    //         });


    //         // console.log("auxx", auxx);
    //         let auxxx = []
    //         auxx.map(a => a.secciones.map(b => b.hojas.map(c => auxxx.push(c.hojas))))
    //         // console.log("auxxx", auxxx);

    //         // console.log('====================================');
    //       }
    //     )


    //     this.columnasRes = res[1]
    //     this.tipoColumnas = []
    //     for (const key of this.columnasRes) {

    //       if (res[2].hasOwnProperty(key)) {
    //         this.tipoColumnas[key] = res[2][key];

    //       }
    //     }
    //     for (const iterator of this.columnasRes) {

    //       if (this.tipoColumnas[iterator] == 'Array'
    //         || this.tipoColumnas[iterator] == 'ObjectID'
    //         || typeof this.tipoColumnas[iterator] == 'object'
    //       ) {


    //         this.prestServ.BuscarBase2(iterator).subscribe(
    //           ress => {


    //             this.opciones[iterator] = new Array
    //             // console.log('==================iterator==================');
    //             // console.log(iterator);
    //             // console.log('===================iterator=================');
    //             for (const elem of ress[0]) {
    //               this.opciones[iterator].push(
    //                 {
    //                   _id: elem._id,
    //                   mostrar: elem.mostrar
    //                 }
    //               )

    //             }




    //           }

    //         )

    //       }

    //     }
    //     // console.log('====================================');
    //     // console.log("res[0][0]['secciones']", res[0][0]['secciones']);
    //     // console.log('====================================');


    //     this.dataSource = new MatTableDataSource(res[0][0]['secciones'])
    //   }
    // )

    // this.prestServ.BuscarBaseGetPopulate("plantillasInformes").subscribe(
    //   res => {
    //     this.informe = res[0]

    //     console.log('=================res===================');
    //     console.log(res);
    //     console.log('==================res==================');
    //   }
    // )


    // this.columnsToDisplay = ["secciones", "porcentaje", "calificacion"]
    // this.dataSource.paginator = this.paginator;

    // console.log('===================elemento=================');
    // console.log(elemento);
    // console.log('==================elemento==================');
  }

  ngafterviewinit() {
    // console.log("AfterViewInit");

    // this.dataSource.paginator =  this.paginator;
    // this.dataSource.sort =  this.sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  buildForm2(object) {

    let aux = {}
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        const tipo = typeof element

        if (tipo == 'object' && element!=null ) {
          aux[key] = this.buildForm2(element)
        }
        else
          aux[key] = tipo

      }
    }

    return aux


  }
  buildForm3(object) {

    let aux = {}
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        const tipo = typeof element

        if (tipo == 'object' && element!=null ) {
          aux[key] = this.buildForm2(element)
        }
        else
          aux[key] = ''

      }
    }

    return aux


  }

  // campos = {}
  // Subelementos1 = []
  // Subelementos = ''
  // Subcolumnas: String[] = []
  // SubOpciones = {}
  // data = {accion : 'editar'};
  // // data['accion'] = 'editar';

  // private buildForm(ini, tipo) {

  //   // console.log("tipo", tipo);
  //   this.campos = {};

  //   for (const key in ini) {


  //     if (ini.hasOwnProperty(key)) {

  //       if (typeof tipo[key] == "object") {
  //         this.Subelementos = key

  //         this.Subelementos1.push(key)



  //         let objAux = {}
  //         const tipoSubelemento = tipo[key][0]
  //         for (const keyy in tipoSubelemento) {
  //           if (tipoSubelemento.hasOwnProperty(keyy)) {
  //             this.Subcolumnas.push(keyy)
  //             const element = tipoSubelemento[keyy];


  //             if (element == "ObjectID") {

  //               this.prestServ.BuscarBase2(keyy).subscribe(
  //                 res => {
  //                   this.SubOpciones[keyy] = []
  //                   for (const elem of res[0]) {
  //                     this.SubOpciones[keyy].push(
  //                       {
  //                         _id: elem._id,
  //                         mostrar: elem.mostrar
  //                       }
  //                     )
  //                   }
  //                   // console.log("this.SubOpciones["+keyy+"]",this.SubOpciones[keyy]);

  //                 }
  //               )



  //               if (this.data.accion == 'editar') {
  //                 objAux[keyy] = ini[key][keyy]
  //               }
  //               else if (this.data.accion == "crear")
  //                 objAux[keyy] = ['']


  //             } else if (element == "Number") {

  //               if (this.data.accion == 'editar') {
  //                 // console.log("ini[" + key + "]", ini[key]);
  //                 // objAux[keyy]=[ini[key][keyy]]
  //                 objAux[keyy] = ini[key][keyy]
  //               }
  //               else if (this.data.accion == "crear")
  //                 objAux[keyy] = ['']

  //             } else if (element == "Boolean") {

  //               if (this.data.accion == 'editar') {
  //                 // console.log("ini[" + key + "]", ini[key]);
  //                 // objAux[keyy]=[ini[key][keyy]]
  //                 objAux[keyy] = ini[key][keyy]
  //               }
  //               else if (this.data.accion == "crear")
  //                 objAux[keyy] = true

  //             }

  //           }
  //         }


  //         this.campos[key] = this.formBuilder.array([this.formBuilder.group(objAux)]);

  //       }

  //       else if (tipo[key] == 'Array') {
  //         let aux = []
  //         ini[key].forEach(element => {
  //           aux.push(
  //             element
  //           )
  //         });

  //         this.campos[key] = [aux];
  //         // this.campos[key] = this.formBuilder.array(this.formBuilder.group(aux));
  //       }
  //       else if (tipo[key] == 'Boolean') {

  //         if (this.data.accion == "crear")
  //           this.campos[key] = [true];
  //         else
  //           this.campos[key] = [ini[key]]
  //       }
  //       else {
  //         if (this.data.accion == "crear")
  //           this.campos[key] = [''];
  //         else
  //           this.campos[key] = [ini[key]];
  //       }

  //     }
  //   }

  //   // console.log("campos", this.campos);



  //   this.form = this.formBuilder.group(this.campos);

  //   if (this.data.accion == 'editar') {

  //     this.deleteSubElemento(0)

  //     this.Subelementos1.forEach(KeySubElem => {
  //       const object = ini[KeySubElem]
  //       for (const key in object) {
  //         if (object.hasOwnProperty(key)) {
  //           const subelement = object[key];
  //           this.addSubElementoEditar(subelement, KeySubElem)

  //         }
  //       }

  //     })
  //   }





  //   // this.form.valueChanges
  //   //     .subscribe(value => {
  //   //         console.log("valueChanges",value);
  //   //     });


  // }

  // deleteSubElemento(index) {
  //   const control = <FormArray>this.form.controls[this.Subelementos]
  //   if (control != undefined)
  //     control.removeAt(index)

  // }
  // addSubElementoEditar(argumento, ColSubElementos) {

  //   const control = <FormArray>this.form.controls[ColSubElementos]

  //   const object = this.data.tipo[ColSubElementos][0]
  //   let iniSubelementos = {}
  //   for (const key in object) {
  //     if (object.hasOwnProperty(key)) {
  //       iniSubelementos[key] = argumento[key]


  //     }
  //   }

  //   // console.log("iniSubelementos -- addSubElementoEditar", iniSubelementos)
  //   control.push(this.formBuilder.group(iniSubelementos))
  //   // control.push(this.formBuilder.group(this.campos[this.Subelementos]))
  // }


}


function deepClone(originalObject) {
  const clonedObject = {};
  for (var key in originalObject) {
    if (typeof (originalObject[key]) != "object") {
      clonedObject[key] = originalObject[key];
    } else {
      clonedObject[key] = deepClone(originalObject[key]);
    }
  }

  return clonedObject;
}




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 3,
    name: 'Administración',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Alimentación',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 1,
    name: 'Consultorios Externos',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'DxI',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Enfermería',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Esterilización',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Farmacia',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Guardia',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Hemoterapia',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Internación',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];


const Caratula = [
  {
    idauditoria: "",
    nombre: "",
    fecha: "",
    sap: ""
  }
];

const Informe = [
  {
    position: 1,
    hoja: "Administracion",
    item: [
      {
        hoja: "Administracion",
        iditem: 1,
        titulo: "Habilitaciones e inscripciones",
        subitem: [
          {
            iditem: 1,
            idsubitem: 1,
            titulo: "Habilitacion salud publica",
            puntajeasignado: 1,
            puntajeobtenido: 0
          },
          {
            iditem: 1,
            idsubitem: 2,
            titulo: "Habilitaciones de los restantes servicios",
            puntajeasignado: 1,
            puntajeobtenido: 0
          },
          {
            iditem: 1,
            idsubitem: 3,
            titulo: "Habilitacion municipal",
            puntajeasignado: 1,
            puntajeobtenido: 0
          }
        ]
      },
      {
        hoja: "Administracion",
        iditem: 2,
        titulo: "Residuos Patogenicos",
        subitem: [
          {
            iditem: 2,
            idsubitem: 1,
            titulo: "Inscripcion como generador de residuos patogenicos",
            puntajeasignado: 1,
            puntajeobtenido: 0
          },
          {
            iditem: 2,
            idsubitem: 2,
            titulo: "Exhibe contrato vigente",
            puntajeasignado: 1,
            puntajeobtenido: 0
          }
        ]
      }
    ],


  },

]

const hojas = [
  {
    position: 1,
    idhoja: 1,
    hoja: "Administracion",
  },
  {
    position: 2,
    idhoja: 2,
    hoja: "Alimentacion",
  },
  {
    position: 3,
    idhoja: 3,
    hoja: "Consutorios externos",
  },
]

const Items = [
  {
    iditem: 1,
    hoja: "Administracion",
    titulo: "Habilitaciones e inscripciones",
  },
  {
    iditem: 2,
    hoja: "Administracion",
    titulo: "Residuos Patogenicos",
  },
]

const SubItems = [
  {
    iditem: 1,
    idsubitem: 1,
    titulo: "Habilitacion salud publica",
    puntajeasignado: 1,
    puntajeobtenido: 0
  },
  {
    iditem: 1,
    idsubitem: 2,
    titulo: "Habilitaciones de los restantes servicios",
    puntajeasignado: 1,
    puntajeobtenido: 0
  },
  {
    iditem: 1,
    idsubitem: 3,
    titulo: "Habilitacion municipal",
    puntajeasignado: 1,
    puntajeobtenido: 0
  },
  {
    iditem: 2,
    idsubitem: 1,
    titulo: "Inscripcion como generador de residuos patogenicos",
    puntajeasignado: 1,
    puntajeobtenido: 0
  },
  {
    iditem: 2,
    idsubitem: 2,
    titulo: "Exhibe contrato vigente",
    puntajeasignado: 1,
    puntajeobtenido: 0
  }
]