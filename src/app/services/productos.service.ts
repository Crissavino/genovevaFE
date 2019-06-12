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

  nuevoProducto(producto: Producto) {
    // let body = JSON.stringify(producto);
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    // const url = `${this.urlAPI}/productos`;

    // return this.http.post(this.heroesURL, body, { headers })
    //   .pipe(map(res => {
    //     console.log(res);
    //     return res;
    //   }));
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

  actualizarProducto(producto: Producto, id: number) {

    let body = JSON.stringify(producto);
    console.log(body);

    let headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json'
      'Content-Type': 'application/json'
    });

    let url = `${this.urlAPI}/producto/edicion/${id}`;

    return this.http.put(url, body, { headers })
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  enviarImagenes(imagenes: FileItem[]) {
    // console.log(imagenes[0].archivo);
    let formData = new FormData();
    formData.append('imagen1', imagenes[0].archivo);
    // setTimeout(() => {
    console.log(formData);
    // }, 1000);
    
    // let headers = new HttpHeaders({
    //   // 'Content-Type': 'multipart/form-data',
    //   // 'Accept': 'application/json'
    //   // 'Content-Type': 'application/json'
    //   // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    // });
    let headers = new HttpHeaders();


    let url = `${this.urlAPI}/producto/imagenes`;

    return this.http.post(url, formData, { headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      })).subscribe( res => {
        console.log(res);
      });
  }

  // cargarImagen(imagen: FileItem) {
  //   // guarda la imagen/archivo en una carpeta
  //   console.log(imagen);
  // }

  // private guardarImagen(imagen: { nombre: string, url: string }) {
  //   // guarda la imagen/archivo en la base de datos
  //   console.log(imagen);
  // }

}
