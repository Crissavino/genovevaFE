import { Producto } from 'src/app/interfaces/producto.interface';
import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito.models';

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  // private urlAPI = 'http://genovevaok.com/api';
  private urlAPI = 'http://genovevabe.cf/api';
  // private urlAPI = "http://127.0.0.1:8000/api";

  public numeroProdCarrito = 0;

  public carrito: any[] = [];

  constructor(private http: HttpClient) {}

  getProductos() {
    const url = `${this.urlAPI}/productos`;
    // return this.http.get('http://127.0.0.1:8000/api/ejemplo').pipe( map( (res: any) => {
    //   console.log(res);
    //   console.log('res');
    // }));

    return this.http.get(url).pipe();
  }

  getProductosDestacados() {
    const url = `${this.urlAPI}/productosdestacados`;

    return this.http.get(url).pipe();
  }

  getProducto(id: number, otro?) {
    const url = `${this.urlAPI}/producto/${id}`;

    return this.http.get(url).pipe(
      map((producto: Producto) => {
        return producto;
      })
    );
  }

  getDatos() {
    const url = `${this.urlAPI}/datos`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  getImagenesShop() {
    const url = `${this.urlAPI}/imagenesShop`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  getImagenesDetalle(id: number) {
    const url = `${this.urlAPI}/imagenesDetalle/${id}`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  getStockProducto(id: number) {
    const url = `${this.urlAPI}/producto/${id}/stock`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  cargarScript(scriptUrl: string) {
    return new Promise(resolve => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.charset = "utf-8";
      scriptElement.onload = resolve;
      const ultimo = document.body.lastChild;
      document.body.insertBefore(scriptElement, ultimo);
      // document.getElementsByTagName('body')[5].appendChild(scriptElement);
    });
  }

  borrarScript(scriptUrl: string) {
    const url = "http://localhost:4200/";
    let arreglo = document.body.getElementsByTagName("script");
    for (const i in arreglo) {
      if (arreglo.hasOwnProperty(i)) {
        const element = arreglo[i];
        if (element.src === url + scriptUrl) {
          document.body.removeChild(element);
        }
      }
    }
  }

  cargarEstilos(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement("link");
      styleElement.href = styleUrl;
      styleElement.rel = "stylesheet";
      styleElement.onload = resolve;
      document.head.appendChild(styleElement);
    });
  }

  guardarCarrito(carrito: Carrito) {
    const url = `${this.urlAPI}/guardarCarrito`;
    const body = JSON.stringify(carrito);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log(body);

    return this.http.post(url, body, { headers }).pipe(
      map((cart: any) => {
        return cart;
      })
    );
  }

  getCarrito(userId) {
    const url = `${this.urlAPI}/getCarrito/${userId}`;

    return this.http.get(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  deleteCarrito(id) {
    const url = `${this.urlAPI}/deleteCarrito/${id}`;

    return this.http.delete(url).pipe(
      map(res => {
        return res;
      })
    );
  }

  cantProdCarrito(userId) {
    this.getCarrito(userId).subscribe((productos: any) => {
      // setTimeout(() => {
      return productos.length;
      // }, 1000);
    });
  }
}
