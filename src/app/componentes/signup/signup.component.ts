import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { prestServ } from "../../servicios/prestadores.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})




export class SignupComponent implements OnInit {
  public get authService(): AuthService {
    return this._authService;
  }




  profesiones = []


  usuarios : FormGroup;
  constructor(
    private _authService: AuthService,
    private prestServ: prestServ,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.usuarios = this.formBuilder.group({
      nombre: ["", { validators: Validators.required }],
      apellido: ["", { validators: Validators.required }],
      correo: ["", { validators: Validators.required }],
      legajo: ["", { validators: Validators.required }],
      contrasenia: ["", { validators: Validators.required }],
      profesiones: [[], { validators: Validators.required }]
    }, { updateOn: 'change' });

    this.prestServ.BuscarBasePublica("profesiones").subscribe(
      res => {
        this.profesiones = res[0]
        console.log("res")
        console.log(res[0])



      }

    )
  }

  ngOnInit() {

  }
  funcionSubmit(usuarios) {
    console.log(usuarios);

    if(usuarios.status == 'VALID')
    this.authService.signUpUser(this.usuarios.value)
    .subscribe(
      res => {
        // console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      err => {
        console.log(err);
        console.log("jeje");

      }
    )

  }


}
