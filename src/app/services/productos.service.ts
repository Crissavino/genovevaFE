import { Producto } from 'src/app/interfaces/producto.interface';
import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Carrito } from '../models/carrito.models';

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  private urlAPI = "https://genovevabe.cf/api";
  // private urlAPI = 'http://127.0.0.1:8000/api';
  // para compartir data
  private terminoBuscado$ = new Subject();

  constructor(private http: HttpClient) {
    // const url = `${this.urlAPI}/productos`;

    this.http
      .get(`${this.urlAPI}/productos`)
      .pipe()
      .subscribe(productos => {
        const todosLosProductos = JSON.stringify(productos);
        localStorage.setItem("todosLosProductos", todosLosProductos);
      });

    this.http
      .get(`${this.urlAPI}/datos`)
      .pipe()
      .subscribe(datos => {
        const todosLosDatos = JSON.stringify(datos);
        localStorage.setItem("todosLosDatos", todosLosDatos);
      });

    this.http
      .get(`${this.urlAPI}/imagenesShop`)
      .pipe()
      .subscribe(imagenesShop => {
        const todosLasImagenesShop = JSON.stringify(imagenesShop);
        localStorage.setItem("todosLasImagenesShop", todosLasImagenesShop);
      });

    this.http
      .get(`${this.urlAPI}/imagenesDetalle`)
      .pipe()
      .subscribe(imagenesDetalle => {
        const todosLasImagenesDetalle = JSON.stringify(imagenesDetalle);
        localStorage.setItem(
          "todosLasImagenesDetalle",
          todosLasImagenesDetalle
        );
      });

    // this.http
    //   .get(`${this.urlAPI}/productos/stock`)
    //   .pipe()
    //   .subscribe(stock => {
    //     const todoElStock = JSON.stringify(stock);
    //     localStorage.setItem("todoElStock", todoElStock);
    //   });

    this.http
      .get(`${this.urlAPI}/relcolores`)
      .pipe()
      .subscribe(relColores => {
        const todasRelColores = JSON.stringify(relColores);
        localStorage.setItem("todasRelColores", todasRelColores);
      });

    if (localStorage.getItem("userId")) {
      if (!localStorage.getItem("favoritosUsuario")) {
        this.http
          .get(
            `${this.urlAPI}/getProductosFavoritos/${localStorage.getItem(
              "userId"
            )}`
          )
          .pipe()
          .subscribe((favoritos: any) => {
            if (favoritos) {
              let favoritosUsuarioJson = [];
              if (favoritos.length === 1) {
                favoritosUsuarioJson = [
                  {
                    id: favoritos.id,
                    productId: favoritos.producto_id,
                    userId: favoritos.userId
                  }
                ];
                const favoritosUsuarioString = JSON.stringify(
                  favoritosUsuarioJson
                );
                localStorage.setItem(
                  "favoritosUsuario",
                  favoritosUsuarioString
                );
              } else {
                favoritos.forEach(fav => {
                  favoritosUsuarioJson.push({
                    id: fav.id,
                    productId: fav.producto_id,
                    userId: fav.user_id
                  });
                });
              }
              const favoritosUsuarioString = JSON.stringify(
                favoritosUsuarioJson
              );
              localStorage.setItem("favoritosUsuario", favoritosUsuarioString);
            }
          });
      }
    }
  }

  editarTitulo(titulo: string){
    let titleElement = document.getElementsByTagName('title');
    titleElement[0].innerText = titulo 
  }

  reiniciarTitulo(titulo: string){
    let titleElement = document.getElementsByTagName('title');
    titleElement[0].innerText = titleElement[0].innerText.replace(titulo,''); 
  }

  productosDestacados() {
    if (localStorage.getItem("todosLosProductos")) {
      const todosLosProductosJson = JSON.parse(
        localStorage.getItem("todosLosProductos")
      );

      const todosLasImagenesShopJson = JSON.parse(
        localStorage.getItem("todosLasImagenesShop")
      );

      const productosPopulares = [];

      todosLosProductosJson.forEach(producto => {
        if (producto.popular) {
          productosPopulares.push(producto);
        }
      });

      let productosDestacadosConImagenes = [];

      productosPopulares.forEach(productoDestacado => {
        let pathImagen = [];
        todosLasImagenesShopJson.forEach((imagen: any) => {
          if (productoDestacado.id == imagen.producto_id) {
            pathImagen.push(imagen.path);
            productoDestacado.path = pathImagen;
          }
        });
        pathImagen = [];
        productosDestacadosConImagenes.push(productoDestacado);
      });

      return productosDestacadosConImagenes;
    }
  }

  imagenesDetalle(idProducto) {
    let todosLasImagenesDetalleJson;
    const path = [];
    if (localStorage.getItem("todosLasImagenesDetalle")) {
      todosLasImagenesDetalleJson = JSON.parse(
        localStorage.getItem("todosLasImagenesDetalle")
      );

      todosLasImagenesDetalleJson.forEach(imagen => {
        if (imagen.producto_id == idProducto) {
          path.push(imagen.path);
        }
      });
    }
    return path;
  }

  stockProducto(id) {
    const url = `${this.urlAPI}/producto/${id}/stock`;

    return this.http.get(url).pipe(
      map((stockProducto: any) => {
        let talles;
        let stock = [];
        if (localStorage.getItem("todosLosDatos")) {
          const todosLosDatosJSon = JSON.parse(
            localStorage.getItem("todosLosDatos")
          );
          talles = todosLosDatosJSon.talles;
        }

        stockProducto.forEach((stockBD: any) => {
          talles.forEach(talle => {
            if (stockBD.producto_id == id) {
              if (stockBD.talle_id == talle.id) {
                stock.push({
                  talle_id: talle.id,
                  talle_nombre: talle.nombre,
                  talle_cantidad: stockBD.cantidad
                });
              }
            }
          });
        });
        console.log(stock);

        return stock;
      })
    );




    // let todoElStockJson;
    // // let stockProdcuto;
    // let talles;
    // const stock = [];

    // if (localStorage.getItem("todosLosDatos")) {
    //   const todosLosDatosJSon = JSON.parse(
    //     localStorage.getItem("todosLosDatos")
    //   );
    //   talles = todosLosDatosJSon.talles;
    // }
    // if (localStorage.getItem("todoElStock")) {
    //   todoElStockJson = JSON.parse(localStorage.getItem("todoElStock"));

    //   todoElStockJson.forEach(stockProdcuto => {
    //     talles.forEach(talle => {
    //       if (stockProdcuto.producto_id == id) {
    //         if (stockProdcuto.talle_id == talle.id) {
    //           stock.push({
    //             talle_id: talle.id,
    //             talle_nombre: talle.nombre,
    //             talle_cantidad: stockProdcuto.cantidad
    //           });
    //         }
    //       }
    //     });
    //   });
    // }

    // return stock;
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
      // document.getElementsByTagName('body')[1].appendChild(scriptElement);
    });
  }

  cargarScriptHead(scriptUrl: string) {
    return new Promise(resolve => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      const ultimo = document.head.lastChild;
      document.head.insertBefore(scriptElement, ultimo);
    });
  }

  editarMetaHead(contenido: string) {
    return new Promise(resolve => {
      const metaElement: any = document.querySelector("[name^=Description]");
      metaElement.content = contenido;
    });
  }

  borrarScript(scriptUrl: string) {
    const url = "http://localhost:4200/";
    const arreglo = document.body.getElementsByTagName("script");
    for (const i in arreglo) {
      if (arreglo.hasOwnProperty(i)) {
        const element = arreglo[i];
        if (element.src === url + scriptUrl || element.src === scriptUrl) {
          document.body.removeChild(element);
        }
      }
    }
  }

  borrarScriptHead(scriptUrl: string) {
    const url = "http://localhost:4200/";
    const arreglo = document.head.getElementsByTagName("script");
    for (const i in arreglo) {
      if (arreglo.hasOwnProperty(i)) {
        const element = arreglo[i];
        if (element.src === url + scriptUrl || element.src === scriptUrl) {
          document.head.removeChild(element);
        }
      }
    }
  }

  reiniciarMetaHead(contenido: string) {
    const metaElement: any = document.querySelector("[name^=Description]");
    metaElement.content = metaElement.content.replace(contenido,'');
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

  borrarEstilos(scriptUrl: string) {
    const url = "http://localhost:4200/";
    const arreglo: any = document.head.getElementsByTagName("link");
    for (const i in arreglo) {
      if (arreglo.hasOwnProperty(i)) {
        const element = arreglo[i];
        if (element.href === url + scriptUrl || element.href === scriptUrl) {
          document.head.removeChild(element);
        }
      }
    }
  }

  // comparto data, sirve para insertarla y ver como va cambiando
  getData() {
    return this.terminoBuscado$;
  }

  updateData(data: string) {
    this.terminoBuscado$.next(data);
  }
  // hasta aca

  guardarFavorito(prodFavorito) {
    if (localStorage.getItem("favoritosUsuario")) {
      const favoritosUsuarioJson = JSON.parse(
        localStorage.getItem("favoritosUsuario")
      );

      favoritosUsuarioJson.push({
        id: prodFavorito.id,
        productId: prodFavorito.productId,
        userId: prodFavorito.userId
      });

      localStorage.removeItem("favoritosUsuario");

      const favoritosUsuarioString = JSON.stringify(favoritosUsuarioJson);

      localStorage.setItem("favoritosUsuario", favoritosUsuarioString);
    } else {
      const favoritosUsuarioJson = [
        {
          id: prodFavorito.id,
          productId: prodFavorito.productId,
          userId: prodFavorito.userId
        }
      ];

      const favoritosUsuarioString = JSON.stringify(favoritosUsuarioJson);

      localStorage.setItem("favoritosUsuario", favoritosUsuarioString);
    }
  }

  guardarFavoritoBD(prodFavorito) {
    const url = `${this.urlAPI}/guardarProductoFavorito`;

    const body = JSON.stringify(prodFavorito);
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

  deleteFavoritoBD(prodFavoritoId) {
    const url = `${this.urlAPI}/deleteFavorito/${prodFavoritoId}`;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.delete(url, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
