import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'
import { ComunicService } from '../../servicios/comunic.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public get authService(): AuthService {
    return this._authService;
  }
  // public set authService(value: AuthService) {
  //   this._authService = value;
  // }

  // user = { email:"" , password:"" };
  user = {};

  constructor(
    private _authService: AuthService,
    private router: Router,
    private servicioComunicacion: ComunicService
  ) { }

  ngOnInit() {
  }

  signIn() {

    if (!this._authService.loggedIn()) {
      this.router.navigate(['/private'])

    }

    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          // console.log(res);
          localStorage.clear()
          this.servicioComunicacion.usuarioLog({ nombre: res.nombre, apellido: res.apellido })
          localStorage.setItem('usuar', res.nombre + " " + res.apellido);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        },
        err => {
          this.router.navigate(['/signin']);
        }
      )
  }

}
