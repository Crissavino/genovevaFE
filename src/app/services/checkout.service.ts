import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CheckoutService {
  // private urlAPI = 'http://genovevabe.cf/api';
  private urlAPI = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  realizarPedido(infoPedido) {
    const url = `${this.urlAPI}/realizarPedido`;

    const body = JSON.stringify(infoPedido);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers }).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
}
