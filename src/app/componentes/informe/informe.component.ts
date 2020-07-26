import { Component, OnInit } from '@angular/core';
import { ComunicService } from "../../servicios/comunic.service";
import { prestServ } from "../../servicios/prestadores.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {


  Prestador= {
    D_PRESTADOR: "",
    C_PRESTADOR: "",
    N_CUIT_CUIL: "",
    N_SAP: "",
    C_UGL: "",
    D_CALLE: "",
    N_PUERTA:"",
    C_PISO_DEPTO:"",
    C_CP8: "",
    N_POSTAL:"",
    N_X: "",
    N_Y: "",
    TELEFONO:"",
    EMAIL: "",
    M_HABILITADO:"",
    F_INICIO: "",
    C_LOCALIDAD_PAMI:"",

  }

  flagbase: boolean = false;

  constructor(
    private prestServ: prestServ,
    private _formBuilder: FormBuilder,
    ) { }

  flagInforme: boolean = false;
  flagPrestSelec: Boolean = false;
  // flagCrearInforme: boolean = false;

  verInforme() {
    this.flagInforme = this.flagInforme ? false : true;
  }

  ElemSelecionado(e){
    // console.log("informe ",e);
    this.flagPrestSelec = true;
    this.prestServ.BuscarPrest(e._id).subscribe(
      PrestadorBuscado => {
        this.Prestador = PrestadorBuscado;
        // console.log("PrestadorBuscado",PrestadorBuscado);
       

        
      }
    )
    
  }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  PlantillasInforme = []
  ValorPlantillasInforme = ""
  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.prestServ.BuscarBaseGetPopulate("plantillasInformes")
    .subscribe(
      res => {
        this.PlantillasInforme = res[0]
        // console.log('==================plantillasInformes==================');
        // console.log("res[0]",res[0]);
        // console.log('=================plantillasInformes===================');
      }
    )

    


  }
}
