import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CheckoutService {
  private urlAPI = "https://genovevabe.cf/api";
  // private urlAPI = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
    this.obtenerMediosDePago();
  }

  realizarPedido(infoPedido) {
    const url = `${this.urlAPI}/realizarPedido`;

    const body = JSON.stringify(infoPedido);

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      // return this.http.post(url, body).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  borrarPedido(idUser) {
    const url = `${this.urlAPI}/deletePedido/${idUser}`;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.delete(url, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  obtenerMediosDePago() {
    const url = `${this.urlAPI}/obtenerMediosDePago`;

    // const headers = new HttpHeaders({
    //   "Content-Type": "application/json"
    // });

    return this.http
      .get(url)
      .pipe()
      .subscribe((mediosDePago: any) => {
        console.log(mediosDePago);
        const mediosDePagoString = JSON.stringify(mediosDePago.body);

        localStorage.setItem("mediosDePago", mediosDePagoString);
        // mediosDePago.body.forEach(tarjeta => {

        // });
        return mediosDePago;
      });
  }

  // enviarPago() {
  //   const url = `${this.urlAPI}/pagarMP`;

  //   this.http.get(url).pipe().subscribe( res => {
  //     console.log(res);
  //     return res;
  //   });
  // }

  enviarPago(datos) {
    const url = `${this.urlAPI}/pagarMP`;

    const body = JSON.stringify(datos);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
}
