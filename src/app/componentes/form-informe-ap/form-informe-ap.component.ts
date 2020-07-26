import { Component, OnInit, Input } from '@angular/core';
import { ComunicService } from "../../servicios/comunic.service";
import { prestServ } from "../../servicios/prestadores.service";
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'form-informe-ap',
  templateUrl: './form-informe-ap.component.html',
  styleUrls: ['./form-informe-ap.component.css']
})
export class FormInformeAPComponent implements OnInit {

  DatosAuditoria: [];
  nombre: string;
  prestador: string;
  date: string;
  
  flagInforme: boolean = false;
  flagAuditoria: boolean = true;
  auditoriaSelecionada: any;
  // displayedColumns: string[];
  // BasePrest: MatTableDataSource<unknown>


  constructor(
    private servicioComunicacion: ComunicService,
    private prestServ: prestServ,
    ) { }

  // flagCrearInforme: boolean = false;

  verInforme(){
    this.flagInforme = this.flagInforme ? false: true;
  }

  auditoriaElejida(e){
    // console.log("eeeeeeeeeeeeeeeeeeeeeeeeee",e,this.flagAuditoria);
    this.auditoriaSelecionada = e
    this.flagAuditoria = false;

    // console.log(this.flagAuditoria);
    
  }



  ngOnInit(): void {


    this.servicioComunicacion.enviarMensajeObservable.subscribe(
      mensaje => {
        this.DatosAuditoria = mensaje
        // console.log("asd  "+this.DatosAuditoria["name"]);
        this.nombre = mensaje["name"]
        this.prestador = mensaje["prestador"]
        this.date = mensaje["date"]
      }
    );

    // this.prestServ.BasePrestadores()
    // .subscribe(
    //   res => {

    //     var ColumnasRespuesta: string[]
    //     ColumnasRespuesta = Object.keys(res[0])
    //     ColumnasRespuesta.shift()
    //     // console.log(`aux: ${aux}`);

    //     this.BasePrest = new MatTableDataSource(res);
    //     this.displayedColumns = ColumnasRespuesta


    //   }
    // )

    // this.servicioComunicacion.enviarFlagObservable.subscribe(
    //   mensaje => {
    //     this.flagCrearInforme = mensaje["flagCrearInforme"];
        
    //     console.log("forminforme");
    //     console.log(this.flagCrearInforme);
    //   }
    // );


  }

}
