import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatAccordion } from '@angular/material/expansion';

import { prestServ } from '../servicios/prestadores.service';
import { async } from '@angular/core/testing';

import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper'

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

const moment = _moment;
import { ComunicService } from "../servicios/comunic.service"
import { CumplimientoPipe } from '../cumplimiento.pipe';

@Component({
  selector: 't-e-informeauditorias',
  templateUrl: './t-e-informeauditorias.component.html',
  styleUrls: ['./t-e-informeauditorias.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class TEInformeauditoriasComponent implements OnInit {
  @Input() base

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  form: FormGroup;

  @ViewChild('contenido') contenido: ElementRef;
  @ViewChild('pdf') pdf: ElementRef;
  flagAuditoriaCerrada: boolean;
  usuario: string;
  dateRange: FormGroup;
  integrantes = [];

  constructor(
    private prestServ: prestServ,
    private formBuilder: FormBuilder,
    private ComunicService: ComunicService,
    private renderer: Renderer2
  ) {

  }
  flagEditar = false
  informe = {}
  ngOnInit() {
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // this.form = this.formBuilder.group({
    //   secciones: [[{a:''}], Validators.required],
    //   val: [0, Validators.required],
    // });

    this.base['integrantes'].forEach(element => {
      if (this.integrantes.indexOf(element.usuarios) == -1)
        {this.integrantes.push(element.usuarios)}
      console.log(this.integrantes,this.integrantes.indexOf(element.usuarios) == -1);
    });
    console.log('=================this.integrantes===================');
    console.log(this.integrantes);
    console.log('===============this.integrantes=====================');
    this.crearForm(this.base, undefined)
    this.flagEditar = false
    console.log("this.base t-e-informeauditoria", this.base);


    this.prestServ.BuscarRegistroOpciones('informes', { auditorias: this.base._id }).subscribe(
      {
        next: x => {
          // console.log('Observer got a next value: ' , x)
          this.informe = x
        },
        error: err => console.error('Observer got an error: ', err),
        complete: () => {
          // console.log('Observer got a complete notification')
          this.crearForm(this.base, this.informe)
        },
      }

    )
    this.flagAuditoriaCerrada = this.base['estado'] == "Cerrada" ? true : false
    // this.crearForm(this.base)

    this.form.disable()



    this.usuario = localStorage.getItem('usuar')


  }

  editar() {
    this.form.enable()
    this.flagEditar = true
  }

  save() {
    this.flagEditar = false

    let formCargado = this.form.value
    // console.log("FormCargado", formCargado);
    // let formGuardar = this.base
    let formGuardarInforme = {
      auditorias: formCargado._id,
      subitems: [],
      items: [],
      hojas: [],
      val: formCargado.val,
      comentarios: formCargado.comentarios,
      GDE: formCargado.GDE,
      fechaInicio: formCargado.fechaInicio,
      fechaFin: formCargado.fechaFin,
      ConsideracionesGenerales: formCargado.ConsideracionesGenerales,
      CumplimientoTiempos: formCargado.CumplimientoTiempos,
      DisposicionLlamado: formCargado.DisposicionLlamado,
      ActitudDuranteLlamado: formCargado.ActitudDuranteLlamado,
      Fortalezas: formCargado.Fortalezas,
      Oportunidades: formCargado.Oportunidades,

      // usuarios: this.
    }

    formCargado.secciones.map(
      a => a.hojas.map(
        b => b.items.map(
          c => c.subitems.map(
            d => formGuardarInforme['subitems'].push(d)
          )
        )
      )
    )
    formCargado.secciones.map(
      a => a.hojas.map(
        b => {
          b.items.map(
            c => {
              formGuardarInforme['items'].push(
                {
                  _id: c._id,
                  observaciones: c.observaciones

                }
              )

            }

          )

          formGuardarInforme['hojas'].push(
            {
              _id: b._id,
              Fortalezas: b.Fortalezas,
              Oportunidades: b.Oportunidades,
            }

          )

          // console.log('================bbbbbbbbbbbbbbbbbbb====================');
          // console.log(b);
          // console.log('===============bbbbbbbbbbbbbbbbbbbbb=====================');
        }
      )
    )


    // console.log("formGuardarInforme", formGuardarInforme);

    this.prestServ.ActualizarRegistroInforme("informes", formGuardarInforme).subscribe(
      res => {
        // console.log("res",res)

        if (res != null)
          this.base['estado'] = res.auditorias.estado
        else this.base['estado'] = 'En proceso'
      }

    )

    this.form.disable()
  }



  CerrarInforme() {
    // console.log(confirm('Desea cerrar la auditoria'));
    if (confirm('¿Desea cerrar la auditoria? \n Esto impedirá cualquier tipo de modificación posterior.')) {
      this.base.estado = "Cerrada"
      this.flagAuditoriaCerrada = true
      // console.log("Elemento a guardar", this.base);

      this.prestServ.ActualizarRegistroInforme("auditorias", this.base).subscribe(
        res => {
          // console.log("res",res)
        }

      )


    }

  }


  crearForm(baseForm, informe) {
    // crearForm(baseForm) {


    // console.log("informe", informe);


    let Secciones = baseForm['plantillasInformes']['secciones']

    this.dateRange = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })


    let buildForm3 = {
      _id: baseForm['_id'],
      val: 0,
      fechaInicio: informe == undefined ? this.dateToYMD(new Date()) : informe.fechaInicio == undefined ? this.dateToYMD(new Date()) : this.dateToYMD(informe.fechaInicio),
      fechaFin: informe == undefined ? this.dateToYMD(new Date()) : informe.fechaFin == undefined ? this.dateToYMD(new Date()) : this.dateToYMD(informe.fechaFin),
      ConsideracionesGenerales: informe == undefined ? '' : informe.ConsideracionesGenerales == undefined ? '' : informe.ConsideracionesGenerales,
      CumplimientoTiempos: informe == undefined ? '' : informe.CumplimientoTiempos == undefined ? '' : informe.CumplimientoTiempos,
      DisposicionLlamado: informe == undefined ? '' : informe.DisposicionLlamado == undefined ? '' : informe.DisposicionLlamado,
      ActitudDuranteLlamado: informe == undefined ? '' : informe.ActitudDuranteLlamado == undefined ? '' : informe.ActitudDuranteLlamado,
      Fortalezas: informe == undefined ? '' : informe.Fortalezas == undefined ? '' : informe.Fortalezas,
      Oportunidades: informe == undefined ? '' : informe.Oportunidades == undefined ? '' : informe.Oportunidades,
      Range: this.formBuilder.group({
        fechaFin: this.formBuilder.control(this.dateToYMD(new Date())),
        fechaInicio: this.formBuilder.control(this.dateToYMD(new Date())),
      }),
      // fechaFin: [{value: this.dateToYMD(new Date()),disable: true}],
      secciones: this.formBuilder.array(
        Secciones.map(
          sec =>
            this.formBuilder.group(
              {
                _id: sec['_id'],
                aplica: sec['aplica'] == null || sec['aplica'] == true ? true : false,
                val: 0,
                hojas: this.formBuilder.array(
                  // []
                  sec['secciones']['hojas'].map(
                    hoj =>
                      this.formBuilder.group(
                        {
                          _id: hoj['_id'],
                          val: 0,
                          Fortalezas: informe == undefined ? '' : (informe.hojas == undefined ? '' : (informe.hojas.filter(a => a._id == hoj['_id']) == 0 ? '' : informe.hojas.filter(a => a._id == hoj['_id'])[0].Fortalezas)),
                          Oportunidades: informe == undefined ? '' : informe.hojas == undefined ? '' : informe.hojas.filter(a => a._id == hoj['_id']) == 0 ? '' : informe.hojas.filter(a => a._id == hoj['_id'])[0].Oportunidades,
                          items: this.formBuilder.array(
                            // []
                            hoj['hojas']['items'].map(
                              items =>
                                this.formBuilder.group(
                                  {
                                    _id: items['_id'],
                                    aplica: items['aplica'] == null || items['aplica'] == true ? true : false,
                                    val: 0,
                                    observaciones: informe == undefined ? '' : informe.items == undefined ? '' : informe.items.filter(a => a._id == items['_id']) == 0 ? '' : informe.items.filter(a => a._id == items['_id'])[0].observaciones,
                                    subitems: this.formBuilder.array(
                                      // []
                                      items['items']['subitems'].map(
                                        subitem =>
                                          this.formBuilder.group(
                                            {
                                              _id: subitem['_id'],
                                              // aplica: subitem['aplica'] == null || subitem['aplica'] == true ? true : false,
                                              aplica: informe != undefined ? (informe.subitems.filter(a => a._id == subitem['_id'])[0] != undefined ? informe.subitems.filter(a => a._id == subitem['_id'])[0].aplica : true) : true,
                                              val: informe != undefined ? (informe.subitems.filter(a => a._id == subitem['_id'])[0] != undefined ? informe.subitems.filter(a => a._id == subitem['_id'])[0].val : false) : false,
                                              // val: informe != undefined ? informe.subitems.filter(a => a._id == subitem['_id'])[0].val : false,
                                              tipo: subitem.subitems['tipo'],
                                              // tipo: informe != undefined ? informe.subitems.filter(a => a._id == subitem['_id'])[0].tipo : '',
                                              // tipo: informe != undefined ? (informe.subitems.filter(a => a._id == subitem['_id'])[0].tipo?informe.subitems.filter(a => a._id == subitem['_id'])[0].tipo:'') : '',
                                              // observaciones: informe != undefined ?informe.observaciones:''

                                            }
                                          )
                                      )
                                    )
                                  }
                                )
                            )
                          )
                        }
                      )
                  )
                )

              }
            )

        )

      ),
      comentarios: informe != undefined ? informe.comentarios : '',
      GDE: informe != undefined ? informe.GDE : '',

    }




    // if(informe == undefined)
    //   this.form = this.formBuilder.group(buildForm2)
    // else this.form = this.formBuilder.group(buildForm)

    this.form = this.formBuilder.group(buildForm3)

    // console.log("this.formBuilder.group(buildForm3)",this.form,informe);


    this.calculosInicialesPorcentajes(buildForm3.secciones.value)

    this.form.get('secciones').valueChanges.subscribe(
      // value => this.calculosInicialesPorcentajes(value)
      value => {
        let aux = []
        value.map(
          a => {
            a.hojas.map(
              b => {
                b.items.map(
                  // c => c.val = c.subitems.filter(d => d.val && d.aplica).length / c.subitems.filter(d => d.aplica).length
                  c => {
                    c.val = c.subitems.filter(d => d.val && d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false)).length / c.subitems.filter(d => d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false)).length
                    let auz = c.subitems.filter(d => d.tipo == 'Criterio informativo')
                    c.subitems.map(e => {
                      if (e.tipo == 'Subcriterio cuantitativo' && auz.length > 0) {
                        e.aplica = auz[0].val





                      }
                    })
                  }

                )
                b.val = b.items.map(a => a.val / b.items.length).reduce((aa, cc) => aa + cc)
              }
            )
            a.val = a.hojas[0]['val']
            aux.push(a.val)
          }
        )
        // console.log("aux", aux.reduce( (a,c)=> a + c)/ this.form.get('secciones').value.length )
        this.form.controls['val'].setValue(aux.reduce((a, c) => a + c) / this.form.get('secciones').value.length)
      }


    )

    // console.log("this.form", this.form);

  }





  calculosInicialesPorcentajes = value => {
    let aux = []
    value.map(
      a => {
        a.hojas.map(
          b => {
            b.items.map(
              // c => c.val = c.subitems.filter(d => d.val && d.aplica).length / c.subitems.filter(d => d.aplica).length
              c => {
                c.val = c.subitems.filter(d => d.val && d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false)).length / c.subitems.filter(d => d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false)).length
                let auz = c.subitems.filter(d => d.tipo == 'Criterio informativo')
                c.subitems.map(e => {
                  if (e.tipo == 'Subcriterio cuantitativo' && auz.length > 0) {
                    e.aplica = auz[0].val

                  }
                })
              }

            )
            b.val = b.items.map(a => a.val / b.items.length).reduce((aa, cc) => aa + cc)
          }
        )
        a.val = a.hojas[0]['val']
        aux.push(a.val)
      }
    )
    // console.log("aux", aux.reduce( (a,c)=> a + c)/ this.form.get('secciones').value.length )
    this.form.controls['secciones'].setValue(value)
    this.form.controls['val'].setValue(aux.reduce((a, c) => a + c) / this.form.get('secciones').value.length)
  }

  // calculosInicialesPorcentajes = value => {
  //   let aux = []
  //   value.map(
  //     a => {
  //       a.hojas.map(
  //         b => {
  //           b.items.map(
  //             c => c.val = c.subitems.filter(d => d.val && d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false) ).length / c.subitems.filter(d => d.aplica && (d.tipo == '' ? true : false || d.tipo == 'Subcriterio cuantitativo' ? true : false) ).length
  //             // c => c.val = c.subitems.filter(d => d.val && d.aplica ).length / c.subitems.filter(d => d.aplica ).length
  //           )
  //           b.val = b.items.map(a => a.val / b.items.length).reduce((aa, cc) => aa + cc)
  //         }
  //       )
  //       a.val = a.hojas[0]['val']
  //       aux.push(a.val)
  //     }
  //   )
  //   // console.log("aux", aux.reduce( (a,c)=> a + c)/ this.form.get('secciones').value.length )
  //   this.form.controls['secciones'].setValue(value)
  //   this.form.controls['val'].setValue(aux.reduce((a, c) => a + c) / this.form.get('secciones').value.length)
  // }





  cancelar() {
    this.prestServ.BuscarRegistroOpciones('informes', { auditorias: this.base._id }).subscribe(
      {
        next: x => {
          // console.log('Observer got a next value: ' , x)
          this.informe = x
        },
        error: err => console.error('Observer got an error: ', err),
        complete: () => {
          // console.log('Observer got a complete notification')
          this.crearForm(this.base, this.informe)
        },
      }

    )
    this.form.disable()
    // console.log(this.form);

    // this.form.reset()
    this.flagEditar = false

  }




  ExportarPDF() {
    let doc = new jsPDF("p", "mm", "a4")
    let formCargado = this.form.value

    var logo = new Image()
    logo.src = 'assets/logopami1.jpg'
    doc.addImage(logo, 'jpg', 15, 10, 180, 20)

    doc.setFontSize(20);
    doc.setTextColor(36, 63, 96)
    doc.text('INFORME DE RELEVAMIENTO A DISTANCIA', 30, 100)
    doc.text('MEDICOS DE CABECERA', 60, 110)
    doc.text('2020', 90, 120)

    var foot = new Image()
    foot.src = 'assets/footpami1.jpg'
    doc.addImage(foot, 'jpg', 35, 270, 140, 20)



    doc.addPage()

    doc.addImage(logo, 'jpg', 15, 10, 180, 20)

    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('I. Descripción técnica de la evaluación', 15, 40)

    doc.setFontSize(12);
    doc.text('Consideraciones generales:', 25, 55)

    doc.setTextColor(95, 95, 95)
    doc.setFontSize(12);
    doc.text(formCargado.ConsideracionesGenerales, 55, 60)

    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('II. Desarrollo de la evaluación', 15, 80)

    doc.setFontSize(12);
    doc.text('Cumplimiento de los tiempos sobre las actividades solicitadas por el INSSJP:', 25, 95)

    doc.setTextColor(95, 95, 95)
    doc.text(formCargado.CumplimientoTiempos, 55, 100)

    doc.setTextColor(0, 0, 0)
    doc.text('Disposición durante el Video llamado:', 25, 120)

    doc.setTextColor(95, 95, 95)
    doc.text(formCargado.DisposicionLlamado, 55, 125)

    doc.setTextColor(0, 0, 0)
    doc.text('Actitud para lo requerido por el auditor durante el Video llamado: ', 25, 145)

    doc.setTextColor(95, 95, 95)
    doc.text(formCargado.ActitudDuranteLlamado, 55, 150)




    doc.addImage(foot, 'jpg', 35, 270, 140, 20)



    doc.addPage()



    doc.addImage(logo, 'jpg', 15, 10, 180, 20)

    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('III.	Análisis por estándar', 15, 40)


    let auxY = 0
    let auxYmax = 205

    this.base.plantillasInformes.secciones.forEach((a, i) => {
      doc.addImage(foot, 'jpg', 35, 270, 140, 20)
      if (auxY >= auxYmax) {
        doc.setTextColor(0, 0, 0)
        doc.addPage()
        doc.addImage(logo, 'jpg', 15, 10, 180, 20)
        doc.addImage(foot, 'jpg', 35, 270, 140, 20)
        auxY = 0
      }
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(15);
      doc.text('Estandar ' + (i + 1) + ': ' + a.secciones.mostrar, 15, 50 + auxY)
      auxY += 7
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0)
      doc.text('        Resultado general: ' + this.cumplimiento(formCargado.secciones[i].val) + ' (' + (formCargado.secciones[i].val * 100).toFixed() + '%)', 15, 50 + auxY)
      auxY += 7
      a.secciones.hojas[0].hojas.items.forEach((aa, ii) => {
        if (auxY >= auxYmax) {
          doc.setTextColor(0, 0, 0)
          doc.addPage()
          doc.addImage(logo, 'jpg', 15, 10, 180, 20)
          doc.addImage(foot, 'jpg', 35, 270, 140, 20)
          auxY = 0
        }
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0)
        auxY += 5
        doc.text('         Resumen del subestándar ' + (i + 1) + '.' + (ii + 1) + ': ' + aa.items.mostrar + ' - ' + this.cumplimiento(formCargado.secciones[i].hojas[0].items[ii].val) + ' (' + (formCargado.secciones[i].hojas[0].items[ii].val * 100).toFixed() + '%)', 15, 50 + auxY)
        auxY += 7
        doc.setFontSize(12);
        doc.text('  Observaciones: ', 25, 50 + auxY)
        doc.setTextColor(95, 95, 95)
        // console.log("formCargado.secciones[i].hojas[0].items[ii].observaciones",formCargado.secciones[i].hojas[0].items[ii].observaciones);

        doc.text(formCargado.secciones[i].hojas[0].items[ii].observaciones == null ? '' : formCargado.secciones[i].hojas[0].items[ii].observaciones, 60, 50 + auxY)
        auxY += 7
        doc.setTextColor(0, 0, 0)
        doc.text('  Los siguientes criterios pueden considerarse cumplidos: ', 25, 50 + auxY)
        doc.setFontSize(10);
        auxY += 7
        let cumplidos = formCargado.secciones[i].hojas[0].items[ii].subitems.filter(c => c.val && c.aplica).map(cc => cc._id)
        aa.items.subitems.forEach((aaa, iii) => {

          // console.log("cumplidos.includes(aaa.subitems._id)",cumplidos.includes(aaa.subitems._id),cumplidos,aaa.subitems._id);

          if (cumplidos.includes(aaa._id)) {
            doc.setTextColor(95, 95, 95)
            doc.text(aaa.subitems.mostrar, 30, 50 + auxY)
            auxY += 5
          }

          if (auxY >= auxYmax) {
            doc.setTextColor(0, 0, 0)
            doc.addPage()
            doc.addImage(logo, 'jpg', 15, 10, 180, 20)
            doc.addImage(foot, 'jpg', 35, 270, 140, 20)
            auxY = 0
          }
        });

        auxY += 7
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0)
        doc.text('  Consideraciones generales del subestándar ' + (i + 1) + "." + (ii + 1), 25, 50 + auxY)
        doc.setFontSize(10);
        auxY += 7
        let Nocumplidos = formCargado.secciones[i].hojas[0].items[ii].subitems.filter(c => !c.val && c.aplica).map(cc => cc._id)
        aa.items.subitems.forEach((aaa, iii) => {

          // console.log("cumplidos.includes(aaa.subitems._id)",cumplidos.includes(aaa.subitems._id),cumplidos,aaa.subitems._id);

          if (Nocumplidos.includes(aaa._id)) {
            doc.setTextColor(95, 95, 95)
            doc.text(aaa.subitems.mostrar, 30, 50 + auxY)
            auxY += 5
          }

          if (auxY >= auxYmax) {
            doc.setTextColor(0, 0, 0)
            doc.addPage()
            doc.addImage(logo, 'jpg', 15, 10, 180, 20)
            doc.addImage(foot, 'jpg', 35, 270, 140, 20)
            auxY = 0
          }
        });

      });
      auxY += 10



      if (auxY >= auxYmax) {
        doc.setTextColor(0, 0, 0)
        doc.addPage()
        doc.addImage(logo, 'jpg', 15, 10, 180, 20)
        doc.addImage(foot, 'jpg', 35, 270, 140, 20)
        auxY = 0
      }





    });

    doc.setTextColor(0, 0, 0)
    auxY = 0
    doc.addPage()
    doc.addImage(logo, 'jpg', 15, 10, 180, 20)
    doc.addImage(foot, 'jpg', 35, 270, 140, 20)
    doc.setFontSize(13);
    doc.text('Consideraciones Especiales y Sugerencias al Establecimiento', 15, 40)
    auxY += 5
    doc.setFontSize(11);
    doc.text('1. Se han evaluado los siguientes estándares:', 25, 45 + auxY)


    this.base.plantillasInformes.secciones.forEach((a, i) => {
      doc.text((i + 1) + '. ' + a.secciones.mostrar, 30, 50 + auxY)
      auxY += 5
    })
    auxY += 5
    doc.text('2. De acuerdo con el trabajo de relevamiento, se han detectado las siguientes fortalezas distribuidas en los siguientes estándares:', 25, 50 + auxY)
    auxY += 5
    doc.text('distribuidas en los siguientes estándares:', 25, 50 + auxY)
    auxY += 10
    this.base.plantillasInformes.secciones.forEach((a, i) => {
      doc.setTextColor(0, 0, 0)
      doc.text("Estándar " + (i + 1) + ' - ' + a.secciones.mostrar + ":", 40, 50 + auxY)
      auxY += 5
      doc.setTextColor(95, 95, 95)
      doc.text(formCargado.secciones[i].hojas[0].Fortalezas, 62, 50 + auxY)
      auxY += 8

    })

    if (auxY >= auxYmax) {
      doc.setTextColor(0, 0, 0)
      doc.addPage()
      doc.addImage(logo, 'jpg', 15, 10, 180, 20)
      doc.addImage(foot, 'jpg', 35, 270, 140, 20)
      auxY = 0
    }
    auxY += 5
    doc.setTextColor(0, 0, 0)
    doc.text('3. De acuerdo con el trabajo de relevamiento, se han detectado las siguientes', 25, 50 + auxY)
    auxY += 5
    doc.text('oportunidades distribuidas en los siguientes estándares:', 25, 50 + auxY)
    auxY += 10
    this.base.plantillasInformes.secciones.forEach((a, i) => {
      doc.setTextColor(0, 0, 0)
      doc.text("Estándar " + (i + 1) + ' - ' + a.secciones.mostrar + ":", 40, 50 + auxY)
      auxY += 5
      doc.setTextColor(95, 95, 95)
      doc.text(formCargado.secciones[i].hojas[0].Oportunidades, 62, 50 + auxY)
      auxY += 8

    })

    doc.setTextColor(0, 0, 0)
    doc.addPage()
    doc.addImage(logo, 'jpg', 15, 10, 180, 20)
    doc.addImage(foot, 'jpg', 35, 270, 140, 20)
    auxY = 0


    auxY += 20
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('IV. Observaciones', 15, 20 + auxY)

    auxY += 10
    doc.setFontSize(12);
    doc.text('Fortalezas:', 25, 20 + auxY)
    doc.setTextColor(95, 95, 95)
    doc.text(formCargado.Fortalezas, 47, 20 + auxY)




    auxY += 10
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('V. Recomendaciones', 15, 20 + auxY)

    auxY += 10
    doc.setFontSize(12);
    doc.text('Oportunidades:', 25, 20 + auxY)
    doc.setTextColor(95, 95, 95)
    doc.text(formCargado.Oportunidades, 57, 20 + auxY)



    auxY += 10
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0)
    doc.text('VI. Conclusiones', 15, 20 + auxY)
    doc.setFontSize(12);
    auxY += 10
    doc.text("En mi carácter de auditor/a del/la Médico/a de Cabecera Dr./Dra. " + this.base['prestadores']['mostrar'], 10, 20 + auxY)
    auxY += 5
    doc.text("(" + this.base['prestadores']['N_CUIT_CUIL'] + ")" + ", y de acuerdo con las constancias recogidas durante la evaluación, llevada a cabo ", 10, 20 + auxY)
    auxY += 5
    doc.text("entre el " + this.form.controls['fechaInicio'].value + " y " + this.form.controls['fechaFin'].value + ", que muestran que el" + "Dr./Dra. mencionado/a precedentemente, ", 10, 20 + auxY)
    auxY += 5
    doc.text("cumple con los 4 estándares del total de 4 que han" + "sido relevados, es mi opinión que el/la profesional", 10, 20 + auxY)
    auxY += 5
    doc.text("cumple en un " + (this.form.controls['val'].value * 100).toFixed() + "%" + " de lo considerado, por lo tanto " + this.cumplimiento(this.form.controls['val'].value) + " con lo solicitado por el INSSJP.", 10, 20 + auxY)







    // console.log('====================================');
    // console.log(this.base, formCargado);
    // console.log('====================================');



    doc.addImage(foot, 'jpg', 35, 270, 140, 20)



    // doc = this.addWaterMark(doc);

    doc.save('test.pdf')
  }

  cumplimiento(value) {
    if (value < 0.5)
      return 'No cumple'
    else if (value >= 0.5 && value < 0.8)
      return 'Cumple parcialmente'
    else if (value >= 0.8)
      return 'Cumple totalmente'
  }



  addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      doc.text(50, doc.internal.pageSize.height - 30, 'Watermark');
    }

    return doc;
  }


  // let contenido = this.contenido.nativeElement;

  // let h1 = this.renderer.createElement('h2')
  // // this.renderer.setStyle(h1,'text-align','center')
  // this.renderer.setStyle(h1,'color','#324b6a')
  // let text1= this.renderer.createText('INFORME DE RELEVAMIENTO A DISTANCIA')
  // let text2= this.renderer.createText('MEDICOS DE CABECERA')
  // let text3= this.renderer.createText('2020')
  // this.renderer.appendChild(h1,text1)
  // this.renderer.appendChild(h1,this.renderer.createElement('br'))
  // this.renderer.appendChild(h1,text2)
  // this.renderer.appendChild(h1,this.renderer.createElement('br'))
  // this.renderer.appendChild(h1,text3)





  // let pagina1 = this.renderer.createElement('div')
  // this.renderer.addClass(pagina1,'container')

  // for (let index = 0; index < 20; index++)
  //   this.renderer.appendChild(pagina1,this.renderer.createElement('br'))

  // this.renderer.appendChild(pagina1,h1)


  // let pagina2 = this.renderer.createElement('div')
  // this.renderer.addClass(pagina2,'container')

  // let text4= this.renderer.createText('I. Descripción técnica de la evaluación')
  // let strong1 = this.renderer.createElement('strong')
  // this.renderer.appendChild(strong1,text4)
  // this.renderer.appendChild(pagina2,strong1)

  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))

  // let text5= this.renderer.createText('Consideraciones generales:')
  // let strong2 = this.renderer.createElement('strong')
  // this.renderer.appendChild(strong2,text5)
  // this.renderer.appendChild(pagina2,strong2)

  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))

  // let text6= this.renderer.createText(formCargado.ConsideracionesGenerales)
  // this.renderer.appendChild(pagina2, text6)

  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))

  // let text7= this.renderer.createText('II. Desarrollo de la evaluación')
  // let strong3 = this.renderer.createElement('strong')
  // this.renderer.appendChild(strong3,text7)
  // this.renderer.appendChild(pagina2,strong3)

  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))

  // let text8= this.renderer.createText('Cumplimiento de los tiempos sobre las actividades solicitadas por el INSSJP:')
  // let strong4 = this.renderer.createElement('strong')
  // this.renderer.appendChild(strong4,text8)
  // this.renderer.appendChild(pagina2,strong4)
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))
  // let text9= this.renderer.createText(formCargado.CumplimientoTiempos)
  // this.renderer.appendChild(pagina2, text9)
  // this.renderer.appendChild(pagina2,this.renderer.createElement('br'))


  // let pdf = this.pdf.nativeElement
  // doc.fromHTML(pagina1.innerHTML, 15, 15, {
  //   'width': 190,
  //   'elementHandlers': specialElementHandlers
  // })
  // doc.addPage()
  // doc.fromHTML(pagina2.innerHTML, 15, 15, {
  //   // 'width': 150,
  //   'elementHandlers': specialElementHandlers
  // })

  // console.log(contenido.innerHTML);


  ExportarPDF2() {


    const div = document.getElementById('contenido');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', 1);

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, 1100, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save('test.pdf');
    });
  }

  flagAcordeon: Boolean = false
  acordeon(accion: String) {

    if (accion == 'expandir')
      this.flagAcordeon = true
    else if (accion == "contraer") {


      this.flagAcordeon = false
    }



  }

  flagAuditoria = false
  editarAuditoria() {
    this.flagAuditoria = true
  }

  dateToYMD(date) {
    if (!(date instanceof Date))
      date = new Date(date)

    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  ElemSelecionado(e) {
    // console.log("informe ",e);
    this.flagAuditoria = false;
    // this.prestServ.BuscarPrest(e._id).subscribe(
    //   PrestadorBuscado => {
    //     this.flagAuditoria = PrestadorBuscado;
    //     // console.log("PrestadorBuscado",PrestadorBuscado);



    //   }
    // )

  }



  allComplete: boolean = false;

  updateAllComplete() {

    // this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete() {
    // if (this.task.subtasks == null) {
    //   return false;
    // }
    // return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  habilitarSubcriterios
  setAll(completed: boolean, pointIndex, pointIndexx, pointIndexxx) {
    this.allComplete = completed;

    this.form.controls['secciones'].value[pointIndex]['hojas'][pointIndexx]['items'][pointIndexxx]['subitems']

    this.calculosInicialesPorcentajes(this.form.controls['secciones'].value)

    // this.form.controls['']
    console.log('==============setAll(completed: boolean)======================');
    console.log(completed, this.form.controls['secciones'].value[pointIndex]['hojas'][pointIndexx]['items'][pointIndexxx]['subitems'].filter(a => a.tipo == 'Subcriterio cuantitativo'));
    console.log('================setAll(completed: boolean)====================');
    // if (this.task.subtasks == null) {
    //   return;
    // }
    // this.task.subtasks.forEach(t => t.completed = completed);
  }


}

