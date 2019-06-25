import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carrito } from '../models/carrito.models';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // carritoJson = [];
  cantidadProdCarrito = 0;
  // private urlAPI = 'http://genovevabe.cf/api';
  private urlAPI = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  guardarProductoCarrito(carrito: Carrito) {

    if (localStorage.getItem('carritoDeCompras')) {
      const carritoDeComprasJson = JSON.parse(localStorage.getItem('carritoDeCompras'));

      carritoDeComprasJson.push({
        // id: Math.random().toString(36).substr(2, 9),
        id: carrito.id,
        productId: carrito.productId,
        userId: carrito.userId,
        talle: carrito.talle,
        cantidad: carrito.cantidad
      });

      localStorage.removeItem('carritoDeCompras');

      const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);

      localStorage.setItem('carritoDeCompras', carritoDeComprasString);

    } else {
      const carritoJson = [{
        // id: Math.random().toString(36).substr(2, 9),
        id: carrito.id,
        productId: carrito.productId,
        userId: carrito.userId,
        talle: carrito.talle,
        cantidad: carrito.cantidad
      }];

      const carritoDeComprasString = JSON.stringify(carritoJson);

      localStorage.setItem('carritoDeCompras', carritoDeComprasString);
    }

  }

  guardarCarritoBD(carrito) {
    const url = `${this.urlAPI}/guardarCarrito`;

    const body = JSON.stringify(carrito);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers }).pipe(map( res => {
      return res;
    }));
  }

  deleteCarritoBD(idCarrito) {
    const url = `${this.urlAPI}/deleteCarrito/${idCarrito}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(url, { headers }).pipe(map(res => {
      return res;
    }));
  }

  getCarrito() {
    const carritoDeComprasJsonUsuario = [];
    if (localStorage.getItem('carritoDeCompras')) {

      const carritoDeComprasJson = JSON.parse(localStorage.getItem('carritoDeCompras'));

      carritoDeComprasJson.forEach(carrito => {
        if (carrito.userId === localStorage.getItem('userId')) {
          carritoDeComprasJsonUsuario.push(carrito);
        }
      });
    }
    return carritoDeComprasJsonUsuario;
  }

  deleteProductoCarrito(idCarritoAborrar) {

    const carritoDeComprasJson = JSON.parse(localStorage.getItem('carritoDeCompras'));
    carritoDeComprasJson.forEach((productoCarrito: any, index) => {
      if (productoCarrito.id === idCarritoAborrar) {
        // entra
        carritoDeComprasJson.splice(index, 1);
      }
    });

    const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);
    // console.log(carritoDeComprasString);
    localStorage.removeItem('carritoDeCompras');
    // console.log(carritoDeComprasString);

    localStorage.setItem('carritoDeCompras', carritoDeComprasString);

    if (carritoDeComprasJson.length === 0) {
      localStorage.removeItem('carritoDeCompras');
    }
  }

  cantidadPodructos() {
    return this.getCarrito().length;
  }

}
