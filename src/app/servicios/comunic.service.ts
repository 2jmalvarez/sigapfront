import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import "rxjs/Rx";
@Injectable({
  providedIn: 'root'
})
export class ComunicService {
  // private URL = 'https://4000-fc49cf57-8ea7-4010-a81b-040fe867b8ab.ws-us02.gitpod.io/api';
  private URL = 'http://192.168.0.95:4000/api';

  constructor(
    private http: HttpClient,

  ) { }

  private enviarMensajeSudject = new Subject<[]>();
  enviarMensajeObservable = this.enviarMensajeSudject.asObservable();

  private EstadoSudject = new Subject<{}>();
  EstadoObservable = this.EstadoSudject.asObservable();


  private usuarioSudject = new Subject<{}>();
  usuarioObservable = this.usuarioSudject.asObservable();
  usuario= {}
  usuarioLog(usuario: {}) {
    this.usuario = usuario;
    this.usuarioSudject.next(usuario)
  }


  mensajeVec: [];

  EstadoGlob = {}


  enviarMensaje(mensaje: []) {
    this.mensajeVec = mensaje;
    this.enviarMensajeSudject.next(mensaje)
  }
  enviarEstado(nEstado: {}) { //ejem {formDialog: "guardado"}
    for (const key in nEstado) {
      if (nEstado.hasOwnProperty(key)) {
        const element = nEstado[key];
        this.EstadoGlob[key] = element
      }
    }

    // console.log('===============Servicio=====================');
    // console.log(this.EstadoGlob);
    // console.log('==================Servicio==================');
    this.EstadoSudject.next(nEstado)
  }

  //Flags
  private enviarFlagSudject = new Subject<{}>();
  enviarFlagObservable = this.enviarFlagSudject.asObservable();
  flags = {
    flagCrearInforme: Boolean,

  }

  Flags(mensaje) {
    this.flags.flagCrearInforme = mensaje.flagCrearInforme;
    console.log(this.flags.flagCrearInforme);


  }


  // prest
  private enviarPrestSudject = new Subject<[]>();
  enviarPrestObservable = this.enviarPrestSudject.asObservable();
  base = []

  BasePrestadores() {
    return this.http.get<any>(this.URL + '/prestadores/todos')//.map(res => res.json);
  }

  Base(mensaje) {
    this.base = mensaje;
    console.log(this.base);


  }



}
