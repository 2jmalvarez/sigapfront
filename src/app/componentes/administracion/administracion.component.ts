import { Component, OnInit } from '@angular/core';
import { prestServ } from "../../servicios/prestadores.service";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  selected = '';
  colecciones= []

  constructor(
    private prestServ: prestServ,
  ) { 

  }

  ngOnInit(): void {
    this.prestServ.BuscarBase("colecciones").subscribe(
      res => {
        this.colecciones = res
        // console.log(this.colecciones);
        
      }
      
    )

    
  }

}
