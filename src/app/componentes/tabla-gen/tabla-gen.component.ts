import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { prestServ } from '../../servicios/prestadores.service';

// export interface pres {
//   D_PRESTADOR: string;
//   N_SAP: string;

// }

@Component({
  selector: 'app-tabla-gen',
  templateUrl: './tabla-gen.component.html',
  styleUrls: ['./tabla-gen.component.css']
})
export class TablaGenComponent implements OnInit {

  // displayedColumns= ["N_SAP" ,  "D_PRESTADOR"];
  displayedColumns = []
  dataSource: MatTableDataSource<any>;

  baseRes = []
  tipoRes = {}
  @Input() base
  @Input() columnas: [String]
  @Input() columnasDesc

  @Output() idElejido = new EventEmitter<string>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private prestServ: prestServ,
  ) { }

  ngOnInit(): void {


    // console.log(this.columnasDesc);

    this.prestServ.BuscarBaseGetPopulate(this.base).subscribe(
      res => {

        this.baseRes = res[0]
        this.tipoRes = res[2]


        // console.log(this.tipoRes);
        
        if (this.columnas)
          this.displayedColumns = this.columnas[0].split(',')
        else this.displayedColumns = res[1]


        if (this.columnasDesc)
          this.columnasDesc = this.columnasDesc[0].split(',')
        else this.columnasDesc = this.displayedColumns

        //aplasta la data ;)
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
          data.push(aux)

        });

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    )


  }

  selectedRowIndex: number = -1;
  highlight(row) {
    //  console.log("highlight",row);
    let aux = this.baseRes
    this.selectedRowIndex = row._id;
    this.idElejido.emit(aux.filter(a => a._id == row._id)[0]);

  }


  tablaFormat(value) {
    let res = ''


    if (typeof value == "object") {
      if (Array.isArray(value)) {
        res = String(value.map(a => " " + a.usuarios.mostrar))
      }
      else {
        if (value != null)
          res = value.mostrar
      }
    }
    else res = value

    return res;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
