import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../models/carrito.models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // carritoJson = [];
  cantidadProdCarrito = 0;

  constructor(private http: HttpClient) {}

  guardarProductoCarrito(carrito: Carrito) {

    if (localStorage.getItem('carritoDeCompras')) {
      const carritoDeComprasJson = JSON.parse(localStorage.getItem('carritoDeCompras'));

      carritoDeComprasJson.push({
        id: Math.random().toString(36).substr(2, 9),
        productId: carrito.productId,
        userId: carrito.userId,
        talle: carrito.talle,
        cantidad: carrito.cantidad
      });

      localStorage.removeItem("carritoDeCompras");
      sessionStorage.removeItem("carritoDeCompras");

      const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);

      localStorage.setItem("carritoDeCompras", carritoDeComprasString);
    } else {
      const carritoJson = [{
        id: Math.random().toString(36).substr(2, 9),
        productId: carrito.productId,
        userId: carrito.userId,
        talle: carrito.talle,
        cantidad: carrito.cantidad
      }];

      const carritoDeComprasString = JSON.stringify(carritoJson);

      localStorage.setItem("carritoDeCompras", carritoDeComprasString);
    }

  }

  getCarrito() {
    const carritoDeComprasJson = JSON.parse(localStorage.getItem('carritoDeCompras'));
    return carritoDeComprasJson;
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
    if (localStorage.getItem('carritoDeCompras')) {
      const cantidadPodructos = JSON.parse(localStorage.getItem('carritoDeCompras')).length;
      return cantidadPodructos;
    }
  }
}
