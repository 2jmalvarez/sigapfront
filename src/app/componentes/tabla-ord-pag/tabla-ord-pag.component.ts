import { Component, OnInit, ViewChild , Input, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { prestServ } from '../../servicios/prestadores.service';

export interface pres {
  D_PRESTADOR: string;
  N_SAP: string;

}

@Component({
  selector: 'tabla-ord-pag',
  templateUrl: './tabla-ord-pag.component.html',
  styleUrls: ['./tabla-ord-pag.component.css']
})

export class TablaOrdPagComponent implements OnInit {
  // displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  displayedColumns= ["N_SAP" ,  "D_PRESTADOR"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @Input() Datos: any
  @Output() Seleccionado = new EventEmitter<string>();


  constructor(
    private prestServ: prestServ,

    ) {



    this.dataSource = new MatTableDataSource();

  }

  ngOnInit() {


  

  }
  ngafterviewinit() {
    // console.log("AfterViewInit");
    
    this.dataSource.paginator =  this.paginator;
    this.dataSource.sort =  this.sort;
  }

  selectedRowIndex: number = -1;
  highlight(row) {
    //  console.log("highlight",row);
    this.selectedRowIndex = row._id;
    this.Seleccionado.emit(row);

  }


  flagx: Boolean= false;

  PalabraAnterior: String="";
  QDigitosaBuscar: Number= 1; // define a partir de cuantos digitios empieza a buscar

  BuscarSERV(filterValue){
    this.prestServ.BuscarBasePrest(filterValue).subscribe(
      Prestadores => {
        // console.log(Prestadores);

       
        this.dataSource =  new MatTableDataSource(Prestadores);
        this.dataSource.paginator =  this.paginator;
        this.dataSource.sort =  this.sort;
        
      }
    )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;


    // Los primero digitos los envia al servidor y completa la tabla 
    if (filterValue.length == this.QDigitosaBuscar && this.PalabraAnterior != filterValue ) {
      console.log("Manda al servidor: ",filterValue);
      this.PalabraAnterior = filterValue; //para que solo envie una ves la misma palabra

      this.BuscarSERV(filterValue)
      

    }

    //Luego busca en la tabla con los resultados obtenidos
    if (filterValue.length > this.QDigitosaBuscar ) {
      console.log("filtra la tabla con: ",filterValue);
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (!this.dataSource.data) {
        this.BuscarSERV(filterValue)
      }
      
      
      
    }


    

  }




}

