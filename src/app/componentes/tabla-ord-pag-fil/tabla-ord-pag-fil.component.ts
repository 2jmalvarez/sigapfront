import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { prestServ } from '../../servicios/prestadores.service';

import { DialogOverviewExampleDialog } from '../form-adaptativo/form-adaptativo.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {ThemePalette} from '@angular/material/core';

import { FileNameDialogComponent } from './file-name-dialog.component';
import { ComunicService } from '../../servicios/comunic.service'


@Component({
  selector: 'app-tabla-ord-pag-fil',
  templateUrl: './tabla-ord-pag-fil.component.html',
  styleUrls: ['./tabla-ord-pag-fil.component.css']
})
export class TablaOrdPagFilComponent implements OnInit, OnChanges {
  displayedColumns = [];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() Seleccionado = new EventEmitter<string>();
  @Input("BASE") BASE: String

  nuevoRegistro = {}


  matselect5 = {} // esto es para cargar los datos en los select multiples
  // matselect = new FormControl();
  /*
  //   matselect3AUX = []
  //   matselect3 = new FormControl(this.matselect3AUX);
  //   matselect4 = new FormControl(this.nuevoRegistro);
  //   matselect2 = (a) => {
  //     const c = []
  //     // aca se queda con la propiedad ID para completar los campos que ya estan cargados
  //     a.forEach( b => c.push(b._id) )
  // // //console.log("cccccccccccc",c);

  //     return new FormControl(c)

  //   };

  */

  // color: ThemePalette = 'accent';
  // checked = false;
  // disabled = false;



  constructor(
    private prestServ: prestServ,
    // public dialog: MatDialog,
    private dialog: MatDialog,
    private Comunicacion: ComunicService
  ) {

    this.dataSource = new MatTableDataSource();
  }

  fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;

  EstadoGlob = {}
  ngOnInit(): void {

    this.Comunicacion.EstadoObservable.subscribe(
      res => {
        this.EstadoGlob = res
      }
    )

  }

  inicializar(a) {
    console.log("a['apellido']",a);
    let e = {};
    for (const key in a) {
      if (a.hasOwnProperty(key)) {

        switch (a[key]) {
          case 'String':
            e[key] = ''
            break;
          case 'Array':
            e[key] = []
            break;
          case 'Boolean':
            e[key] = false
            break;
          case 'Number':
            e[key] = ''
            break;
          case 'Date':
            e[key] = ''
            break;
          case 'ObjectID':
            e[key] = ''
            break;

          default:

            if (typeof a[key] == 'object') {
              // console.log('a[key]',a[key]);

              e[key] = ''
            }
            else {
              e[key] = "inicializar(a)"
            }
            break;
        }


      }
    }

    console.log("e",e);

    return e

  }

  eliminarRegistro() {
    if (this.BASE !== "" && this.flagSelected) {
      console.log(this.selected);

      this.prestServ.EliminarRegistro(this.BASE, this.selected).subscribe(
        res => {
          console.log("Se elimino el siguiente registro: ", res);
          this.Comunicacion.enviarEstado({ regEliminado: true })

        }
      )
    }
  }

  openAddFileDialog(a) {

    // console.log(a);

    // console.log("this.BASE",this.BASE);

    // let baseDialog= {}

    if (a == 'crear' && this.BASE !== "") {
      this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent,
        {
          width: '700px',
          data: {
            base: this.BASE,
            registro: this.inicializar(this.tipoColumnas),
            tipo: this.tipoColumnas,
            opciones: this.opciones,
            titulo: "Crear nuevo registro",
            accion: a,
          }
        }
      )
    }
    console.log("this.selected",this.selected);

    if (a == 'editar' && this.BASE !== "" && this.flagSelected) {
      this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent,
        {
          width: '900px',
          data: {
            base: this.BASE,
            registro: this.selected,
            tipo: this.tipoColumnas,
            opciones: this.opciones,
            titulo: "Editar registro",
            accion: a,
          }
        }
      )
    }

    // console.log("this.fileNameDialogRef",this.fileNameDialogRef);



  }

  ngOnChanges(a): void {
    // //console.log("ngOnChange",this.BASE);



    if (this.BASE) {
      this.dataSource = new MatTableDataSource();
      this.BuscarBase(this.BASE)
    }

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log("a")
    if (
      this.EstadoGlob['formLogABM'] == "RegCreado"
      || this.EstadoGlob['formLogABM'] == "RegActualizado"
      || this.EstadoGlob['regEliminado'] == true
    ) {

      if (
        this.EstadoGlob['formLogABM'] == "RegCreado"
      || this.EstadoGlob['formLogABM'] == "RegActualizado")
      {
        this.Comunicacion.enviarEstado({ formLogABM: "formCerrado" })
      }

      if (this.EstadoGlob['regEliminado'] == true) {
        this.Comunicacion.enviarEstado({ regEliminado: false })
      }

      this.dataSource = new MatTableDataSource();
      this.BuscarBase(this.BASE)
    }
  }


  ngafterviewinit() {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  //tabla
  flagSelected: Boolean = false
  selectedRowIndex: number = -1;
  highlight(row) {
    console.log("highlight", row);
    this.selectedRowIndex = row._id;
    this.Seleccionado.emit(row);
    this.selected = row
    this.flagSelected = true

  }

  flagDialog: Boolean = false
  //form de carga
  flagEditar: Boolean = false
  crearRegistro() {
    // //console.log("selected",this.selected);

    if (this.BASE !== "")
      this.flagEditar = this.flagEditar ? false : true

  }

  selected = {}

  // opp = "hola"
  // AUX= {}
  flagEditar2: Boolean = false
  editarRegistro() {
    if (this.flagSelected) {

      // //console.log("this.selected",this.selected);


      const a = { ...this.selected }
      // //console.log("aaaaaaaaaaaaaaa",a);

      this.nuevoRegistro = a
      //console.log("this.nuevoRegistro",this.nuevoRegistro);
      // matselect5['profesiones'] = new FormControl();
      for (const key in this.tipoColumnas) {
        if (this.tipoColumnas.hasOwnProperty(key)) {
          const element = this.tipoColumnas[key];
          if (element == 'Array') {
            // console.log(" key ", key);
            const c = []
            a[key].forEach(b => c.push(b._id))

            this.matselect5[key] = new FormControl(c)
            // console.log("this.matselect5[",key,"]",this.matselect5[key]);

          }

        }
      }

      this.flagEditar = true // muestra o no el form para crear o editar
      this.flagEditar2 = true // muestra se entro para editar pero no crear

      this.flagDialog = this.flagDialog ? false : true
      // console.log("this.flagDialog", this.flagDialog);


    }



  }

  // tienePropiedad(objeto, propiedad) {
  //   // //console.log("value",value);

  //   if (objeto == undefined)
  //     return false;
  //   else return objeto.hasOwnProperty(propiedad);


  // }
  typeOf(value) {
    // //console.log("value",value);
    return typeof value;


  }
  // esArray(value) {
  //   // //console.log("value",value);
  //   // //console.log("tArray.isArray( value)",Array.isArray( value));
  //   return Array.isArray(value);

  // }

  opciones = {}
  columnasRes = []
  tipoColumnas = []
  BuscarBase(base) {
    this.prestServ.BuscarBase2(base).subscribe(
      res => {
        const datosRes = res[0]
        // console.log("datosRes",datosRes);

        this.columnasRes = res[1]
        this.tipoColumnas = []
        for (const key of this.columnasRes) {

          if (res[2].hasOwnProperty(key)) {
            this.tipoColumnas[key] = res[2][key];

          }
        }


        // console.log(base,"this.columnasRes",this.columnasRes);
        // console.log(base,"this.tipoColumnas",this.tipoColumnas)


        //console.log("this.tipoColumnas", typeof this.tipoColumnas);




        /*Busca opciones de los array de objetos */
        for (const iterator of this.columnasRes) {

          if (this.tipoColumnas[iterator] == 'Array'
            || this.tipoColumnas[iterator] == 'ObjectID'
            || typeof this.tipoColumnas[iterator] == 'object'
          ) {


            this.prestServ.BuscarBase2(iterator).subscribe(
              ress => {


                this.opciones[iterator] = new Array
                // console.log('==================iterator==================');
                // console.log(iterator);
                // console.log('===================iterator=================');
                for (const elem of ress[0]) {
                  this.opciones[iterator].push(
                    {
                      _id: elem._id,
                      mostrar: elem.mostrar
                    }
                  )

                }

                // console.log("this.opciones", this.opciones);



              }

            )

          }

        }

        //console.log("this.opciones", this.opciones);


        // //console.log(Object.keys(this.opciones));


        // //console.log("columnasRes",columnasRes);
        // //console.log("Object.keys(datosRes)",Object.keys(datosRes[0]));


        if (datosRes.length != 0) // si la base tiene datos
        { this.dataSource = new MatTableDataSource(datosRes); }


        this.displayedColumns = this.columnasRes
        console.log('====================================');
        console.log(this.displayedColumns);
        console.log('====================================');
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }
    )
  }


  Cancelar() {
    //console.log("cancelar");
    this.flagEditar = false

    if (this.flagEditar2) {
      this.flagEditar2 = false

      this.dataSource = new MatTableDataSource();
      this.BuscarBase(this.BASE)

    }


    this.nuevoRegistro = {};

  }


  Guardar() {

    /*Actualiza el registro */
    if (this.flagEditar2) {
      this.flagEditar2 = false

      // console.log("editar registro cargado ", this.nuevoRegistro);

      // this.prestServ.ActualizarRegistro(this.BASE, this.nuevoRegistro).subscribe(
      //   res => {
      //     console.log(res)
      // //     this.nuevoRegistro = {}
      //   }

      // )





    }

    else { // nuevo registro
      // //console.log("guardar nuevo registro",this.nuevoRegistro);

      this.prestServ.GuardarRegistro(this.BASE, this.nuevoRegistro).subscribe(
        res => {
          //console.log(res)

        }

      )
    }




    this.dataSource = new MatTableDataSource();
    this.BuscarBase(this.BASE)
    this.flagEditar = false;
    // this.nuevoRegistro = {};



  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();



  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '650px',
  //     // data: {name: this.name, animal: this.animal}
  //     data: { base: this.BASE, tipo: this.tipoColumnas},

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed',result);
  //     // this.animal = result;
  //   });
  // }

}


