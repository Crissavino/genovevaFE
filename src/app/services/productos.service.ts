import { Producto } from 'src/app/interfaces/producto.interface';
import { Injectable, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Carrito } from '../models/carrito.models';

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  // private urlAPI = "https://genovevabe.cf/api";
  private urlAPI = 'http://127.0.0.1:8000/api';
  // para compartir data
  private terminoBuscado$ = new Subject();
  mantenimiento;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    // const url = `${this.urlAPI}/productos`;

    if (isPlatformBrowser(this.platformId)) {

      this.http
        .get(`${this.urlAPI}/mantenimiento`)
        .pipe()
        .subscribe((mant: any) => {
          this.mantenimiento = mant;
          
          if (mant === 1) {
            localStorage.setItem("mantenimiento", 'true');
          } else {
            localStorage.setItem("mantenimiento", 'false');
          }

          // const mantenimiento = JSON.stringify(mant);
          // localStorage.setItem("mantenimiento", mantenimiento);
        });

      this.http
        .get(`${this.urlAPI}/productos`)
        .pipe()
        .subscribe((productos: any) => {
          let productosVisibles = [];
          productos.forEach(prod => {
            
            if (prod.visible !== 2) {
              productosVisibles.push(prod)
            }
          });
          console.log(productosVisibles);
          const todosLosProductosVisibles = JSON.stringify(productosVisibles);
          
          localStorage.setItem("todosLosProductos", todosLosProductosVisibles);
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
  }

  editarTitulo(titulo: string){
    if (isPlatformBrowser(this.platformId)) {
      let titleElement = document.getElementsByTagName('title');
      titleElement[0].innerText = titulo
    }
  }

  reiniciarTitulo(titulo: string){
    if (isPlatformBrowser(this.platformId)) {
      let titleElement = document.getElementsByTagName('title');
      titleElement[0].innerText = titleElement[0].innerText.replace(titulo,'');
    }
  }

  productosDestacados() {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  imagenesDetalle(idProducto) {
    let todosLasImagenesDetalleJson;
    const path = [];
    if (isPlatformBrowser(this.platformId)) {
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
    }
    return path;
  }

  stockProducto(id) {
    const url = `${this.urlAPI}/producto/${id}/stock`;

    return this.http.get(url).pipe(
      map((stockProducto: any) => {
        let talles;
        let stock = [];
        if (isPlatformBrowser(this.platformId)) {
          if (localStorage.getItem("todosLosDatos")) {
            const todosLosDatosJSon = JSON.parse(
              localStorage.getItem("todosLosDatos")
            );
            talles = todosLosDatosJSon.talles;
          }
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
  }

  cargarScript(scriptUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
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
  }
  
  cargarNoIndex() {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise(resolve => {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "noindex";
        const primero = document.head.firstChild;
        document.head.insertBefore(meta, primero);
      });
    }
  }

  borrarNoIndex() {
    if (isPlatformBrowser(this.platformId)) {
      const metaElement: any = document.querySelector("[name^=robots]");
      metaElement.remove();
    }
  }

  cargarScriptHead(scriptUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise(resolve => {
        const scriptElement = document.createElement("script");
        scriptElement.src = scriptUrl;
        const ultimo = document.head.lastChild;
        document.head.insertBefore(scriptElement, ultimo);
      });
    }
  }

  cargarLinkCanonicalHead(linkUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise(resolve => {
        const linkElement = document.createElement("link");
        linkElement.rel = "canonical";
        linkElement.href = linkUrl;
        const primero = document.head.firstChild;
        document.head.insertBefore(linkElement, primero);
      });
    }
  }

  editarMetaHead(contenido: string) {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise(resolve => {
        const metaElement: any = document.querySelector("[name^=Description]");
        metaElement.content = contenido;
      });
    }
  }

  borrarScript(scriptUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  borrarScriptHead(scriptUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  borrarLinkHead(linkUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      const url = "http://localhost:4200/";
      const arreglo = document.head.getElementsByTagName("link");
      for (const i in arreglo) {
        if (arreglo.hasOwnProperty(i)) {
          const element = arreglo[i];
          if (element.href === url + linkUrl || element.href === linkUrl) {
            document.head.removeChild(element);
          }
        }
      }
    }
  }

  reiniciarMetaHead(contenido: string) {
    if (isPlatformBrowser(this.platformId)) {
      const metaElement: any = document.querySelector("[name^=Description]");
      metaElement.content = metaElement.content.replace(contenido,'');
    }
  }

  cargarEstilos(styleUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      return new Promise((resolve, reject) => {
        const styleElement = document.createElement("link");
        styleElement.href = styleUrl;
        styleElement.rel = "stylesheet";
        styleElement.onload = resolve;
        document.head.appendChild(styleElement);
      });
    }
  }

  borrarEstilos(scriptUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
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
    if (isPlatformBrowser(this.platformId)) {
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
