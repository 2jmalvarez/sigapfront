
import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { Inject, Input, OnInit, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { prestServ } from '../../servicios/prestadores.service';
import { async } from '@angular/core/testing';
import { ComunicService } from '../../servicios/comunic.service'
import { ThemePalette } from '@angular/material/core';



@Component({

    templateUrl: './FormDialog.html',
})
export class FileNameDialogComponent implements OnInit {
    color: ThemePalette = 'primary';
    form: FormGroup;
    columnas: String[] = []
    Subcolumnas: String[] = []

    campos: {};

    panelOpenState = false;
    @ViewChild("element") element: ElementRef;
    Subelementos1 = []


    constructor(
        public dialogRef: MatDialogRef<FileNameDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private formBuilder: FormBuilder,
        private prestServ: prestServ,
        private renderer: Renderer2,
        private Comunicacion: ComunicService

    ) {
        this.columnas = Object.keys(data.registro)

    }

    EstadoFormABM = []

    ngOnInit(): void {
        this.buildForm(this.data.registro, this.data.tipo)

        // this.onChanges() // cosas reactivas

    }
    formattedMessage = ""
    // ngOnChanges(): void {
    //     // this.form.valueChanges.subscribe(val => {

    //     //   console.log('====================================');
    //     //   console.log(val);
    //     //   console.log('====================================');
    //     // });
    // }

    /* cosas reactivas */
    // onChanges(): void {
    //     this.form.valueChanges.subscribe(val => {
    //         val.mostrar = val.nombre
    //       this.form.setValue( val)
    //     });
    //   }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async AgregarHtml(objeto) {
        // console.log("registro", this.data.registro[objeto]);
        // console.log("tipo", this.data.tipo[objeto][0]);

        const tipo = this.data.tipo[objeto][0]

        let div = this.renderer.createElement('div')
        this.renderer.addClass(div, 'row')

        for (const key in tipo) {
            if (tipo.hasOwnProperty(key)) {
                const value = tipo[key];

                const mat_form_field = this.renderer.createElement('mat-form-field')
                this.renderer.addClass(mat_form_field, 'container')

                switch (value) {
                    case 'ObjectID':
                        if (key != '_id') {
                            // console.log(key, 'ObjectID');
                            const mat_select = this.renderer.createElement('mat-select');
                            this.renderer.setAttribute(mat_select, 'formControlName', key)

                            let opciones = {}
                            this.prestServ.BuscarBase2(key).subscribe(
                                res => {


                                    opciones[key] = []
                                    for (const elem of res[0]) {
                                        opciones[key].push(
                                            {
                                                _id: elem._id,
                                                mostrar: elem.mostrar
                                            }
                                        )

                                    }


                                    // console.log('====================================');
                                    // console.log("base", key);
                                    // console.log(opciones[key])
                                    // console.log('====================================');


                                    for (const a in opciones[key]) {
                                        // console.log('key', a);
                                        if (opciones[key].hasOwnProperty(a)) {
                                            const element = opciones[key][a];
                                            // console.log('element', element);


                                            const mat_option = this.renderer.createElement('mat-option');
                                            const textOp = this.renderer.createText(element.mostrar)

                                            this.renderer.appendChild(mat_option, textOp)
                                            this.renderer.setAttribute(mat_option, 'value', element._id)

                                            this.renderer.appendChild(mat_select, mat_option)
                                            this.renderer.appendChild(mat_form_field, mat_select)
                                            this.renderer.appendChild(div, mat_form_field)
                                        }
                                    }
                                    const label = this.renderer.createElement('mat-label')
                                    const text = this.renderer.createText(key)
                                    this.renderer.appendChild(label, text)
                                    // this.renderer.appendChild(this.element.nativeElement,label)
                                    // this.renderer.appendChild(this.element.nativeElement,mat_select)
                                    this.renderer.appendChild(mat_form_field, label)
                                    this.renderer.appendChild(mat_form_field, mat_select)
                                    this.renderer.appendChild(div, mat_form_field)

                                    // console.log('====================================');
                                    // console.log("mat_select",mat_select);
                                    // console.log('====================================');
                                    // return { ...opciones }
                                }

                            )

                        }
                        break;

                    case 'Number':
                        const input = this.renderer.createElement('input');
                        this.renderer.setAttribute(input, 'type', 'number')
                        this.renderer.setAttribute(input, 'formControlName', key)

                        const label = this.renderer.createElement('mat-label')
                        const text = this.renderer.createText(key)

                        this.renderer.setProperty(input, 'matInput', '')

                        this.renderer.appendChild(label, text)
                        this.renderer.appendChild(mat_form_field, label)
                        this.renderer.appendChild(mat_form_field, input)
                        this.renderer.appendChild(div, mat_form_field)
                        // this.renderer.appendChild(div,label)
                        // this.renderer.appendChild(div,input)
                        // this.renderer.appendChild(this.element.nativeElement,label)
                        // this.renderer.appendChild(this.element.nativeElement,input)

                        // console.log(key, input);

                        break;

                    case 'String':

                        break;

                    case 'Boolean':

                        break;

                    default:
                        break;
                }

            }
        }
        const hr = this.renderer.createElement('hr')
        this.renderer.appendChild(this.element.nativeElement, div)
        this.renderer.appendChild(this.element.nativeElement, hr)

        // console.log('====================================');
        // console.log(div);
        // console.log('====================================');


        /*   items: "ObjectID"
             orden: "Number"
             porcentaje: "Number"
             _id: "ObjectID" 
         */

        // this.renderer.

        // this.renderer.

    }
    async buscarOpciones(base) {
        let opciones = {}
        this.prestServ.BuscarBase2(base).subscribe(
            res => {


                opciones[base] = []
                for (const elem of res[0]) {
                    opciones[base].push(
                        {
                            _id: elem._id,
                            mostrar: elem.mostrar
                        }
                    )

                }


                // console.log('====================================');
                // console.log("base", base);
                // console.log(opciones[base])
                // console.log('====================================');
                return { ...opciones }
            }

        )


    }

    SubOpciones = {}

    private buildForm(ini, tipo) {

        console.log("ini", ini);
        console.log("tipo", tipo);
        this.campos = {};

        for (const key in ini) {


            if (ini.hasOwnProperty(key)) {

                if (typeof tipo[key] == "object") {
                    this.Subelementos = key

                    this.Subelementos1.push(key)



                    let objAux = {}
                    const tipoSubelemento = tipo[key][0]
                    console.log('=================tipoSubelemento===================');
                    console.log(tipo[key]);
                    console.log('================tipoSubelemento====================');
                    for (const keyy in tipoSubelemento) {
                        if (tipoSubelemento.hasOwnProperty(keyy)) {
                            this.Subcolumnas.push(keyy)
                            const element = tipoSubelemento[keyy];


                            if (element == "ObjectID") {

                                this.prestServ.BuscarBase2(keyy).subscribe(
                                    res => {
                                        this.SubOpciones[keyy] = []
                                        for (const elem of res[0]) {

                                            this.SubOpciones[keyy].push(
                                                {
                                                    _id: elem._id,
                                                    mostrar: elem.mostrar
                                                }
                                            )
                                            // console.log("this.SubOpciones",this.SubOpciones);

                                        }
                                        // console.log("this.SubOpciones["+keyy+"]",this.SubOpciones[keyy]);
                                        console.log("this.SubOpciones", this.SubOpciones, res[0]);

                                    }
                                )


                                // console.log("ini[" + key + "]["+keyy+"]",ini[key][keyy],ini);
                                if (this.data.accion == 'editar') {
                                    objAux[keyy] = ini[key][keyy]
                                    console.log('====================================');
                                    console.log(ini, key, keyy);
                                    console.log("objAux[keyy]", objAux[keyy]);
                                    console.log('====================================');
                                }
                                else if (this.data.accion == "crear")
                                    objAux[keyy] = ['']


                            } else if (element == "Number") {

                                if (this.data.accion == 'editar') {
                                    // console.log("ini[" + key + "]", ini[key]);
                                    // objAux[keyy]=[ini[key][keyy]]
                                    objAux[keyy] = ini[key][keyy]
                                }
                                else if (this.data.accion == "crear")
                                    objAux[keyy] = ['']

                            } else if (element == "Boolean") {

                                if (this.data.accion == 'editar') {

                                    // objAux[keyy]=[ini[key][keyy]]
                                    objAux[keyy] = ini[key][keyy]
                                }
                                else if (this.data.accion == "crear")
                                    objAux[keyy] = true

                            }

                        }
                    }

                    console.log('===============objAux=====================');
                    console.log(objAux);
                    console.log('===============objAux=====================');
                    this.campos[key] = this.formBuilder.array([this.formBuilder.group(objAux)]);

                }

                else if (tipo[key] == 'Array') {
                    let aux = []
                    ini[key].forEach(element => {
                        aux.push(
                            element
                        )
                    });

                    this.campos[key] = [aux];
                    // this.campos[key] = this.formBuilder.array(this.formBuilder.group(aux));
                }
                else if (tipo[key] == 'Boolean') {

                    if (this.data.accion == "crear")
                        this.campos[key] = [true];
                    else
                        this.campos[key] = [ini[key]]
                }
                else {
                    if (this.data.accion == "crear")
                        this.campos[key] = [''];
                    else
                        this.campos[key] = [ini[key]];
                }

            }
        }

        // console.log("campos", this.campos);



        this.form = this.formBuilder.group(this.campos);

        if (this.data.accion == 'editar') {

            this.deleteSubElemento(0)

            this.Subelementos1.forEach(KeySubElem => {
                const object = ini[KeySubElem]
                for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                        const subelement = object[key];
                        this.addSubElementoEditar(subelement, KeySubElem)

                    }
                }

            })
        }



        console.log('===============this.form=====================');
        console.log(this.form);
        console.log('==================this.form==================');

        // this.form.valueChanges
        //     .subscribe(value => {
        //         console.log("valueChanges",value);
        //     });


    }

    Subelementos = ''
    get getSubelementos() {
        return this.form.get(this.Subelementos) as FormArray
    }

    addSubElemento() {
        const control = <FormArray>this.form.controls[this.Subelementos]

        const tipoSubelemento = this.data.tipo[this.Subelementos][0]
        let iniSubelementos = {}
        for (const key in tipoSubelemento) {
            if (tipoSubelemento.hasOwnProperty(key)) {

                if (tipoSubelemento[key] == 'Boolean')
                    iniSubelementos[key] = [true]
                else
                    iniSubelementos[key] = ['']


            }
        }

        // console.log("iniSubelementos", iniSubelementos)
        control.push(this.formBuilder.group(iniSubelementos))
        // control.push(this.formBuilder.group(this.campos[this.Subelementos]))
    }
    addSubElementoEditar(argumento, ColSubElementos) {

        const control = <FormArray>this.form.controls[ColSubElementos]

        const object = this.data.tipo[ColSubElementos][0]
        let iniSubelementos = {}
        for (const key in object) {
            if (object.hasOwnProperty(key)) {



                if (typeof argumento[key] == 'object' && argumento[key] != null) {
                    console.log('===============' + key + '==========ooooooooooooooooooooooooooooo===========', argumento[key])
                    // iniSubelementos[key] = {
                    //     _id: argumento[key]['_id'],
                    //     mostrar: argumento[key]['mostrar'],
                    // }
                    iniSubelementos[key] = argumento[key]['_id']
                }
                else iniSubelementos[key] = argumento[key]

                console.log('===============' + key + '=====================');
                console.log(iniSubelementos, argumento[key]);
                console.log('===============' + key + '====================');

            }
        }

        // console.log("iniSubelementos -- addSubElementoEditar", iniSubelementos)
        control.push(this.formBuilder.group(iniSubelementos))
        // control.push(this.formBuilder.group(this.campos[this.Subelementos]))
    }
    deleteSubElemento(index) {
        const control = <FormArray>this.form.controls[this.Subelementos]
        if (control != undefined)
            control.removeAt(index)

    }
    length(o) {

        return o.length
    }

    save(event: Event) {
        event.preventDefault();

        const registro = this.form.value;
        // console.log("registro", registro);

        if (this.data.accion == 'editar') {

            this.prestServ.ActualizarRegistro(this.data.base, registro).subscribe(
                res => {
                    // console.log("Respuesta servidor: ",res)
                    this.Comunicacion.enviarEstado({ formLogABM: "RegActualizado" })
                    //     this.nuevoRegistro = {}
                }

            )
        }
        else if (this.data.accion == 'crear') {
            console.log('crear', registro);


            this.prestServ.GuardarRegistro(this.data.base, registro).subscribe(
                res => {
                    // console.log("Respuesta", res)
                    this.Comunicacion.enviarEstado({ formLogABM: "RegCreado" })

                }

            )
        }


        // if (this.form.valid) {
        //     const value = this.form.value;
        //     console.log(value);
        // } else {
        //     this.form.markAllAsTouched();
        // }
    }

    typeOf(value) {
        // //console.log("typeOf",value);
        return typeof value;


    }

}