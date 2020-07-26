import { Component, OnInit, Input,Output, ViewChild, Inject, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { prestServ } from '../../servicios/prestadores.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MatAccordion } from '@angular/material/expansion';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
// import { TEAuditoriasDialogComponent } from './t-e-auditorias-dialog.component';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 't-e-auditorias',
  templateUrl: './t-e-auditorias.component.html',
  styleUrls: ['./t-e-auditorias.component.css'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0' })),
  //     state('expanded', style({ maxHeight: '50000px', height: '*' })),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ]
})
export class TEAuditoriasComponent implements OnInit {
  // filters = [];
  // @Input() base: String;
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = []

  @Output() idElejido  = new EventEmitter<string>();
  base: any;

  constructor(
    private prestServ: prestServ,
    private dialog: MatDialog,
  ) {

    this.prestServ.BuscarBaseGetPopulate('auditorias').subscribe(
      res => {
        // console.log('===================res=================');
        // console.log(res,Object.keys(res[0]));
        // console.log('==================res==================');

        this.base = [...res[0]]
        
        
        
        
        this.displayedColumns =['fechaReal', 'prestadores' ,'UGL', 'estado' ,'cumplimiento' ,'GDE']
          // ['fechaReal',
          //   "usuarios",
          //   'integrantes',
          //   "prestadores",
          //   "puntajeObtenido"]
        let data = []
        
         res[0].map(a => {

         
          
           let aux = {}
          for (const key in a) {
            if (a.hasOwnProperty(key)) {
              const elementt = a[key];
              aux[key] = this.tablaFormat(elementt)
            }
          }
          // console.log(aux);
          data.push( aux)

        });

        // console.log("data",data);
        // console.log(this.base,"this.base");
        this.dataSource = new MatTableDataSource(data);

      }
    )

  }

  tablaFormat(value) {
    let res = ''


    if (typeof value == "object") {
      if (Array.isArray(value)) {
        res = String(value.map(a => " " + a['usuarios'].mostrar))
      }
      else {


        // console.log(value);
        if(value != null)
        res = value.mostrar
      }
    }
    else res = value

    return res;
  }

  selectedRowIndex: number = -1;
  highlight(row) {
    //  console.log("highlight",row);
    this.selectedRowIndex = row._id;
    this.idElejido.emit(this.base.filter(a => a._id == row._id));
   
    

  }


  // @ViewChild(MatAccordion) accordion: MatAccordion;

  // expandedElement: null
  // columnsToDisplay = ["fechaReal", "prestadores", "puntajeObtenido", "usuarios", "estado"]

  // tipoColumnas = {}

  // fileNameDialogRef: MatDialogRef<TEAuditoriasDialogComponent>;

  ngOnInit(): void {



    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.prestServ.BuscarBaseGetPopulate("auditorias").subscribe(
    //   res => {
    //     let aux = res[0]

    //     aux.forEach(element => {
    //       element['otrasAuditorias'] = res[0].filter(a => a.prestadores._id == element.prestadores._id)
    //     });

    //     this.dataSource = new MatTableDataSource(aux)
    //     this.tipoColumnas = res[2]
    //     // let opciones = {
    //     //   $in: res[0].map(a=>  a.prestadores._id )
    //     // }
    //     console.log('=================auditorias===================');
    //     console.log(aux);
    //     console.log('================auditorias====================');
    //     // this.prestServ.BuscarBaseOpciones("auditorias",{ prestadores: opciones}).subscribe(
    //     //   res => {
    //     //     console.log('===============res=====================');
    //     //   console.log(res);
    //     //   console.log('===================res=================')
    //     // }
    //     // )
    //   }
    // )

    // this.dataSource.filterPredicate =
    //   (data, filtersJson: string) => {
    //     const matchFilter = [];
    //     const filters = JSON.parse(filtersJson);

    //     filters.forEach(filter => {
    //       const val = data[filter.id] === null ? '' : data[filter.id];
    //       matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
    //     });
    //     return matchFilter.every(Boolean);
    //   };
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // applyFilters(filterValue: string) {
  //   const tableFilters = [];
  //   tableFilters.push({
  //     id: 'prestadores',
  //     value: filterValue
  //   });


  //   this.dataSource.filter = JSON.stringify(tableFilters);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // applyFiltersss(filterValue: string) {

  //   const tableFilters = [];
  //   tableFilters.push({
  //     id: 'prestadores',
  //     value: filterValue
  //   });
  //   console.log('=================tableFilters===================');
  //   console.log(tableFilters);
  //   console.log('=================tableFilters===================');
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }
  // applyFilterss() {
  //   const tableFilters = [];
  //   this.filters.forEach((filter) => {
  //     tableFilters.push({
  //       id: filter.columnId,
  //       value: filter.value
  //     });
  //   });
  //   this.dataSource.filter = JSON.stringify(tableFilters);
  // }

  esObject(a) {
    if (typeof a == 'object' && a != null)
      return true
    else
      return false
  }

  openDialog(a) {



    const dialogRef = this.dialog.open(TEAuditoriaeDialog,
      {
        data: a
      }
    );
    console.log('=================a===================');
    console.log(a);
    console.log('================a====================');
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openAddFileDialog(a) {

  //   // console.log(a);

  //   // let baseDialog= {}

  //   if (a == 'crear' && this.BASE !== "") {
  //     this.fileNameDialogRef = this.dialog.open(TEAuditoriasDialogComponent,
  //       {
  //         width: '700px',
  //         data: {
  //           base: this.BASE,
  //           registro: this.inicializar(this.tipoColumnas),
  //           tipo: this.tipoColumnas,
  //           opciones: this.opciones,
  //           titulo: "Crear nuevo registro",
  //           accion: a,
  //         }
  //       }
  //     )
  //   }
  //   if (a == 'editar' && this.BASE !== "" && this.flagSelected) {
  //     this.fileNameDialogRef = this.dialog.open(TEAuditoriasDialogComponent,
  //       {
  //         width: '700px',
  //         data: {
  //           base: this.BASE,
  //           registro: this.selected,
  //           tipo: this.tipoColumnas,
  //           opciones: this.opciones,
  //           titulo: "Editar registro",
  //           accion: a,
  //         }
  //       }
  //     )
  //   }

  //   // console.log("this.fileNameDialogRef",this.fileNameDialogRef);



  // }




  // inicializar(a) {
  //   // console.log("a['apellido']",a['apellido']);
  //   let e = {};
  //   for (const key in a) {
  //     if (a.hasOwnProperty(key)) {

  //       switch (a[key]) {
  //         case 'String':
  //           e[key] = ''
  //           break;
  //         case 'Array':
  //           e[key] = []
  //           break;
  //         case 'Boolean':
  //           e[key] = false
  //           break;
  //         case 'Number':
  //           e[key] = ''
  //           break;
  //         case 'Date':
  //           e[key] = ''
  //           break;
  //         case 'ObjectID':
  //           e[key] = ''
  //           break;

  //         default:

  //           if (typeof a[key] == 'object') {
  //             // console.log('a[key]',a[key]);

  //             e[key] = ''
  //           }
  //           else {
  //             e[key] = "inicializar(a)"
  //           }
  //           break;
  //       }


  //     }
  //   }

  //   return e

  // }




}



@Component({
  selector: 't-e-auditoria-dialog',
  templateUrl: './t-e-auditoria-dialog.html',//'dialog-content-example-dialog.html',
})
export class TEAuditoriaeDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    console.log('==================data==================');
    console.log(this.data);
    console.log('==============data======================');
  }


}