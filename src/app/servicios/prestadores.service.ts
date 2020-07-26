import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class prestServ {
  // private URL = 'https://4000-fc49cf57-8ea7-4010-a81b-040fe867b8ab.ws-us02.gitpod.io/api';
  private URL = 'http://192.168.0.95:4000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  BuscarBasePrest(PresBuscado) {
    // console.log("servicio");
    // console.log({campoBusqueda: PresBuscado});

    return this.http.post<any>(this.URL + '/BasePrest', {campoBusqueda: PresBuscado});

  }

  BuscarPrest(IDPresBuscado) {
    // console.log("servicio");
    // console.log({ID: IDPresBuscado});

    return this.http.post<any>(this.URL + '/prestador', {ID: IDPresBuscado});

  }

  // BasePrestadores() {
  //   return this.http.get<any>(this.URL + '/prestadores/todos');
  // }

  HojasInforme(){
    return this.http.get<any>(this.URL + '/informe/hojas');
  }


  BuscarBase(base: String){

    return this.http.get<any>(this.URL + '/'+ base);
  }

  BuscarBasePublica(base: String){

    return this.http.get<any>(this.URL + '/pub/'+ base);
  }

  BuscarBase2(base: String){

    return this.http.get<any>(this.URL + '/for/'+ base);
  }

  BuscarBasePopulate(base: String, populate: {}){

    return this.http.post<any>(this.URL + '/pop/'+ base,populate);
  }
  BuscarBaseGetPopulate(base: String){

    return this.http.get<any>(this.URL + '/pop/'+ base);
  }

  BuscarBaseOpciones(base: String, opciones: {}){

    return this.http.post<any>(this.URL + '/opc/'+ base,opciones);
  }

  GuardarRegistro(base: String, registro: {}){

    return this.http.post<any>(this.URL + '/for/'+ base,registro);
  }

  ActualizarRegistro(base: String, registro: {}){

    return this.http.put<any>(this.URL + '/for/'+ base,registro);
  }
  ActualizarRegistroInforme(base: String, registro: {}){

    return this.http.put<any>(this.URL + '/reginforme/'+ base,registro);
  }

  EliminarRegistro(base: String, registro: {}){

    return this.http.put<any>(this.URL + '/for/delete/'+ base,{...registro});
  }
  BuscarRegistro(base: String, registro: {}){

    return this.http.post<any>(this.URL + '/getone/'+ base,registro);
  }
  BuscarRegistroOpciones(base: String,opciones: {}){

    return this.http.post<any>(this.URL + '/getoneopc/'+ base,opciones);
  }





  // signUpUser(user) {
  //   return this.http.post<any>(this.URL + '/signup', user);
  // }

  // signInUser(user) {
  //   console.log("user: ");
  //   console.log(user);

  //   return this.http.post<any>(this.URL + '/signin', user);
  // }

  // loggedIn() {
  //   return !!localStorage.getItem('token');
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/signin']);
  // }

  getToken() {
    return localStorage.getItem('token');
  }

}
