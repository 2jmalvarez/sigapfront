import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { prestServ } from "../../servicios/prestadores.service"
import { Router } from '@angular/router'
// import { type } from 'os';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// // Depending on whether rollup is used, moment needs to be imported differently.
// // Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// // syntax. However, rollup creates a synthetic default module and we thus need to import it using
// // the `default as` syntax.
// import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports
// // import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;

// // See the Moment.js docs for the meaning of these formats:
// // https://momentjs.com/docs/#/displaying/format/
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };


@Component({
  selector: 'nueva-auditoria',
  templateUrl: './nueva-auditoria.component.html',
  styleUrls: ['./nueva-auditoria.component.css'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})
export class NuevaAuditoriaComponent implements OnInit {

  form: FormGroup;

  @Input() baseEditar
  @Output() Evento = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private prestServ: prestServ,
    private router: Router
  ) {
    // this.buildForm();
  }

  usuarios = []
  PlantillasInformes = []
  // integrantes = []
  ngOnInit(): void {
    this.buildForm();
    this.form.get('modalidad').setValue('A distancia')
    this.form.controls['modalidad'].setValue('A distancia')

    this.prestServ.BuscarBaseOpciones("usuarios", {
      columnas: "nombre apellido legajo profesiones"
    }).subscribe(
      res => {

        for (const iterator of res) {
          let aux = {}
          aux['_id'] = iterator._id
          aux['nombre'] = iterator.apellido + "," + iterator.nombre
          aux['legajo'] = iterator.legajo
          aux['profesion'] = String(iterator.profesiones.map(a => a.mostrar))
          this.usuarios.push(aux)
          // console.log("iterator",iterator.profesiones);

        }
        // console.log("this.usuarios", this.usuarios)
      }

    )


    this.prestServ.BuscarBase2("plantillasInformes").subscribe(
      res => {
        // console.log("plantillasInformes", res)
        this.PlantillasInformes = res[0].map(
          a => {
            // this.Area = a.secciones.map(b => b.secciones.mostrar)

            return {
              _id: a._id,
              mostrar: a.mostrar,
              secciones: a.secciones.map(b => {
                return {
                  _id: b.secciones._id,
                  mostrar: b.secciones.mostrar,
                }
              }
              )
            }
          }
        )
      }

    )


    // this.prestServ.BuscarBaseOpciones("secciones", {
    //   columnas: "mostrar "
    // }).subscribe(
    //   res => {
    //     this.Area = res.map(a => a.mostrar)
    //   }
    // )

  }
  guardarUGL(e) {
    this.form.controls['UGL'].setValue(e);
  }
  Prestadores = []
  auxPrestador = ""
  private buildForm() {


    console.log('====================================');
    console.log(this.baseEditar ? this.baseEditar : '');
    console.log('====================================');
    this.form = this.formBuilder.group({
      plantillasInformes: [this.baseEditar ? this.baseEditar.plantillasInformes._id : '', []],
      modalidad: ['', []],
      prestadores: [this.baseEditar ? this.baseEditar.prestadores._id : '', []],
      fechaReal: [this.baseEditar ?  this.dateToYMD(this.baseEditar.fechaReal) : this.dateToYMD(new Date()), []],
      usuarios: [this.baseEditar ? this.baseEditar.usuarios._id : '', []],
      estado: [this.baseEditar ? this.baseEditar.estado : '', []],
      GDE: [this.baseEditar ? this.baseEditar.GDE : '', []],
      UGL: [this.baseEditar ? this.baseEditar.UGL : '', []],
      cumplimiento: [this.baseEditar ? this.baseEditar.cumplimiento : '', []],
      // integrantes: this.formBuilder.group(
      //   {
      //     tabla: this.formBuilder.array([])
      //   }
      // ),
      integrantes: this.formBuilder.array([
        this.formBuilder.group({
          secciones: ['', []],
          usuarios: ['', []],
          // legajo: ['', []],
          // profesion: ['', []],
          responsable: [false, []],
        })
      ]),
      // name: ['',  [Validators.required]],
      // date: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      // text: ['', [Validators.required, Validators.maxLength(200)]],
      // category: ['', [Validators.required]],
      // gender: ['', [Validators.required]],
    });
    if (this.baseEditar) {


      // this.Prestadores =this.baseEditar.prestadores

      this.form.controls['prestadores'].setValue(this.baseEditar ? this.baseEditar.prestadores._id : '')
    }
    this.form.get("prestadores").valueChanges
      .subscribe(value => {
        // console.log("value", value);
        if (this.auxPrestador != value) {
          this.prestServ.BuscarBasePrest(value).subscribe(
            res => {
              this.Prestadores = res
              // console.log('==============aaaa======================')
              // console.log(res)
              // console.log('====================================')
            }
          )

        }
        this.auxPrestador = value
      });

    this.form.get("plantillasInformes").valueChanges
      .subscribe(value => {
        let aux = this.PlantillasInformes.filter(a => a._id == value)
        this.Area = aux.map(a => a.secciones)[0]
        console.log("plantillaInforme Select", this.Area);

        // this.auxPrestador = value
      });


  }

  // save(event: Event) {
  //   event.preventDefault();
  //   const value = this.form.value;
  //   console.log("value", value);
  // }

  save() {
    this.form.controls['estado'].setValue('Programada');
    // this.form.controls['UGL'].setValue(this.Prestadores);
    // console.log('====================this.form================');
    // console.log(this.form.value,this.Prestadores);
    // console.log('=================this.form===================');


    this.prestServ.GuardarRegistro('auditorias', this.form.value).subscribe(
      res => {
        console.log('=============res=======================');
        console.log(res);
        console.log('==============res======================');
        this.router.navigate(['/private'])
      }
    )

  }

  Subelementos = ''
  get getSubelementos() {
    return this.form.get('integrantes') as FormArray
  }
  Area = [];
  iniSubelementos = {
    secciones: '',
    usuarios: '',
    // legajo: '',
    // profesion: '',
    responsable: false,
  }
  Typeof(a) {
    return typeof a
  }
  deleteSubElemento(index) {
    const control = <FormArray>this.form.controls['integrantes']
    if (control != undefined)
      control.removeAt(index)

  }
  length(o) {

    return o.length
  }
  addSubElemento() {
    const control = <FormArray>this.form.controls['integrantes']

    control.push(this.formBuilder.group(this.iniSubelementos))

  }


  displayFn(state) {

    if (this.baseEditar) {
      return this.baseEditar.prestadores.D_PRESTADOR
    } else {
      let aux = this.Prestadores.filter(a => a._id == state)[0]
      return aux ? aux.D_PRESTADOR : undefined
    }

  }


  dateToYMD(date) {
    if (!(date instanceof Date))
      date = new Date(date)

    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }


  cancelar(){


    if(this.baseEditar)
      {
        this.Evento.emit("cancelar")
      }
    else this.router.navigate(['/private'])
  }
}
