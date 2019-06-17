import { Producto } from './../interfaces/producto.interface';
import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // private urlAPI = 'http://genovevabe.cf/api';
  private urlAPI = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getProductos() {
    const url = `${this.urlAPI}/productos`;
    // return this.http.get('http://127.0.0.1:8000/api/ejemplo').pipe( map( (res: any) => {
    //   console.log(res);
    //   console.log('res');
    // }));

    return this.http.get(url).pipe();

  }

  getProducto( id: number ) {
    const url = `${this.urlAPI}/producto/${id}`;

    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getDatos() {
    const url = `${this.urlAPI}/datos`;

    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getImagenesShop() {
    const url = `${this.urlAPI}/imagenesShop`;

    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getImagenesDetalle( id: number ) {
    const url = `${this.urlAPI}/imagenesDetalle/${id}`;

    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getStockProducto( id: number ) {
    const url = `${this.urlAPI}/producto/${id}/stock`;

    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  cargarScript( scriptUrl: string ) {
    return new Promise( resolve => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  cargarEstilos( styleUrl: string ) {
    return new Promise( (resolve, reject ) => {
      const styleElement = document.createElement('link');
      styleElement.href = styleUrl;
      styleElement.rel = 'stylesheet';
      styleElement.onload = resolve;
      document.head.appendChild(styleElement);
    });
  }

}
