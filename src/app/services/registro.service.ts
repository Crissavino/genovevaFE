import { Injectable, } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: "root"
})
export class RegistroService {
  // private urlAPI = "http://127.0.0.1:8000/api";
  private urlAPI = 'https://genovevabe.cf/api';

  constructor(private http: HttpClient) {}

  esAdmin(id) {
    return this.getUsuario(id).subscribe( (user: any) => {
      let esAdmin: boolean;

      if (user.isAdmin === 1) {
        console.log('entra 1');
        esAdmin = true;
      } else {
        console.log('entra no');
        if (localStorage.getItem('esAdmin') !== null) {
          localStorage.removeItem('esAdmin');
        }
        esAdmin = false;
      }
    });
  }

  enviarRegistro(usuario: UsuarioModel) {
    const url = `${this.urlAPI}/registro`;

    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      map((usuario: UsuarioModel) => {
        localStorage.setItem("email", usuario.email);
        return usuario;
      })
    );
  }

  enviarLogin(usuario: UsuarioModel) {
    const url = `${this.urlAPI}/login`;

    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  getUsuario(id) {
    const url = `${this.urlAPI}/usuario/${id}`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  estaLogueado() {
    if (localStorage.getItem("userId")) {
      return true;
    }
  }

  logout() {
    const url = `${this.urlAPI}/logout`;

    return this.http.get(url);
  }

  getUsuarios() {
    const url = `${this.urlAPI}/usuarios`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  cambiarContraseña(passYid) {
    const url = `${this.urlAPI}/cambiarpass`;

    const body = JSON.stringify(passYid);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
