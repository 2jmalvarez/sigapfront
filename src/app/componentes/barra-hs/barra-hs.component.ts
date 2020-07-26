import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ComunicService } from "../../servicios/comunic.service";
import { AuthService } from '../../servicios/auth.service';
// import { PrivateTasksComponent } from "../private-tasks/private-tasks.component";

@Component({
  selector: 'barra-hs',
  templateUrl: './barra-hs.component.html',
  styleUrls: ['./barra-hs.component.css']
})
export class BarraHSComponent implements OnInit {

  // public get PrivateTasks(): PrivateTasksComponent {
  //   return this._PrivateTasksComponent;
  // }
  // public set PrivateTasks(value: PrivateTasksComponent) {
  //   this._PrivateTasksComponent = value;
  // }

  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // PTC: PrivateTasksComponent ;

  
  // lataskprivada= [{ name:, route: "", icon: "home"}, ]


  fillerNav = [
    { name: "home", route: "", icon: "home"},
    { name: "informe", route: "informes", icon: "description"},
    { name: "signup", route: "signup", icon: "face"},
    { name: "signin", route: "signin", icon: "face"},
    { name: "private", route: "private", icon: "vpn_key"},

  ]

  // fillerContent = Array.from({length: 50}, () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  usuario= {};
  nombreUsuario= ''
  public get authService(): AuthService {
    return this._authService;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private _authService: AuthService,
    private servicioComunicacion: ComunicService,
    // private _PrivateTasksComponent: PrivateTasksComponent
  ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        
        this.servicioComunicacion.usuarioObservable.subscribe(
          res => {
            // console.log(this.usuario);
            this.nombreUsuario= res['nombre'] + " " + res['apellido']
            this.usuario = res
          }
          
        )
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  
  ngOnInit(): void {

    this.nombreUsuario= localStorage.getItem('usuar')
    // this._authService.getUsuario().subscribe(
    //   res => {
    //     this.usuario = res
    //     console.log('==================usuaario==================');
    //     console.log(res);
    //     console.log('====================================');
    //   }
    // )
    
  }


  // crearInforme():void{

  //   this.servicioComunicacion.Flags({flagCrearInforme: true})



  // }

}
