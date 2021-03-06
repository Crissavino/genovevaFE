import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carrito } from '../models/carrito.models';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CarritoService {
  // carritoJson = [];
  cantidadProdCarrito = 0;
  private urlAPI = "https://genovevabe.cf/api";
  // private urlAPI = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  guardarProductoCarrito(carrito: Carrito) {
    if (localStorage.getItem("carritoDeCompras")) {
      const carritoDeComprasJson = JSON.parse(
        localStorage.getItem("carritoDeCompras")
      );

      carritoDeComprasJson.push({
        // id: Math.random().toString(36).substr(2, 9),
        id: carrito.id,
        productId: carrito.productId,
        userId: carrito.userId,
        talle: carrito.talle,
        talle_id: carrito.talle_id,
        cantidad: carrito.cantidad,
        orden_id: carrito.orden_id
      });

      localStorage.removeItem("carritoDeCompras");

      const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);

      localStorage.setItem("carritoDeCompras", carritoDeComprasString);
    } else {
      const carritoJson = [
        {
          // id: Math.random().toString(36).substr(2, 9),
          id: carrito.id,
          productId: carrito.productId,
          userId: carrito.userId,
          talle: carrito.talle,
          talle_id: carrito.talle_id,
          cantidad: carrito.cantidad,
          orden_id: carrito.orden_id
        }
      ];

      const carritoDeComprasString = JSON.stringify(carritoJson);

      localStorage.setItem("carritoDeCompras", carritoDeComprasString);
    }
  }

  guardarCarritoBD(carrito) {
    const url = `${this.urlAPI}/guardarCarrito`;

    const body = JSON.stringify(carrito);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post(url, body, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  deleteCarritoBD(idCarrito) {
    const url = `${this.urlAPI}/deleteCarrito/${idCarrito}`;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.delete(url, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  getCarritoBD(userId) {
    const url = `${this.urlAPI}/getCarrito/${userId}`;

    let carritoDeComprasJson = [];
    this.http
      .get(url)
      .pipe()
      .subscribe((arregloCarrito: any) => {
        if (arregloCarrito.length !== 0) {
          if (arregloCarrito.length === 1) {
            carritoDeComprasJson.push({
              id: arregloCarrito[0].id,
              productId: arregloCarrito[0].producto_id,
              userId: arregloCarrito[0].user_id,
              talle: arregloCarrito[0].talle,
              talle_id: arregloCarrito[0].talle_id,
              cantidad: arregloCarrito[0].cantidad,
              orden_id: arregloCarrito[0].ordene_id
            });
            const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);
            localStorage.setItem("carritoDeCompras", carritoDeComprasString);
          } else {
            arregloCarrito.forEach(carrito => {
              carritoDeComprasJson.push({
                id: carrito.id,
                productId: carrito.producto_id,
                userId: carrito.user_id,
                talle: carrito.talle,
                talle_id: carrito.talle_id,
                cantidad: carrito.cantidad,
                orden_id: carrito.ordene_id
              });
            });

            const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);
            localStorage.setItem("carritoDeCompras", carritoDeComprasString);
          }
        }
      });
    return carritoDeComprasJson;
  }

  getTablaCarritos(userId){
    const url = `${this.urlAPI}/getCarrito/${userId}`;

    let arregloCarrito = [];

    this.http.get(url).pipe().subscribe((filasTabla: any) => {
      if (filasTabla.length !== 0) {
        if (filasTabla.length === 1) {
          arregloCarrito.push(filasTabla[0]);
        } else {
          filasTabla.forEach(fila => {
            arregloCarrito.push(fila);
          });
        }
      }
    });

    return arregloCarrito;
  }

  getCarrito() {
    const carritoDeComprasJsonUsuario = [];
    if (localStorage.getItem("carritoDeCompras")) {
      const carritoDeComprasJson = JSON.parse(
        localStorage.getItem("carritoDeCompras")
      );

      carritoDeComprasJson.forEach(carrito => {
        if (carrito.userId == localStorage.getItem("userId") && carrito.orden_id === 0) {
          carritoDeComprasJsonUsuario.push(carrito);
        }
      });
    }

    return carritoDeComprasJsonUsuario;
  }

  deleteProductoCarrito(idCarritoAborrar) {
    const carritoDeComprasJson = JSON.parse(
      localStorage.getItem("carritoDeCompras")
    );
    carritoDeComprasJson.forEach((productoCarrito: any, index) => {
      if (productoCarrito.id === idCarritoAborrar) {
        // entra
        carritoDeComprasJson.splice(index, 1);
      }
    });

    const carritoDeComprasString = JSON.stringify(carritoDeComprasJson);
    // console.log(carritoDeComprasString);
    localStorage.removeItem("carritoDeCompras");
    // console.log(carritoDeComprasString);

    localStorage.setItem("carritoDeCompras", carritoDeComprasString);

    if (carritoDeComprasJson.length === 0) {
      localStorage.removeItem("carritoDeCompras");
    }
  }

  cantidadPodructos() {
    return this.getCarrito().length;
  }

  getOrdenes() {
    const url = `${this.urlAPI}/ordenes`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
