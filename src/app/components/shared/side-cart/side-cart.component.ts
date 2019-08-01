import { Component, OnInit, DoCheck, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Carrito } from 'src/app/models/carrito.models';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit, DoCheck {
  cantidadDeProd: number;
  productosCarrito = [];
  precioTotal = 0;
  actualizando = false;
  hayProductos = 0;
  // hayProductos: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productoService: ProductosService,
    private carritoService: CarritoService,
    private router: Router
  ) {
    // this.productosCarrito["total"] = 0;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userId')) {
        // const productosCarrito = this.carritoService.getCarrito();
        let carritoDeComprasJsonUsuario = [];
        setTimeout(() => {
          if (localStorage.getItem("carritoDeCompras")) {
            const carritoDeComprasJson = JSON.parse(
              localStorage.getItem("carritoDeCompras")
            );
  
            carritoDeComprasJson.forEach(carrito => {
              if (
                carrito.userId == localStorage.getItem("userId") &&
                carrito.orden_id === 0
              ) {
                carritoDeComprasJsonUsuario.push(carrito);
              }
            });
          }
        }, 1500);
        console.log(carritoDeComprasJsonUsuario);
        // setTimeout(() => {
        if (carritoDeComprasJsonUsuario !== null) {
          carritoDeComprasJsonUsuario.forEach((productoCarrito: any) => {
            if (productoCarrito.orden_id === 0) {
  
              const todosLosProductosJson = JSON.parse(
                localStorage.getItem("todosLosProductos")
              );
  
              todosLosProductosJson.forEach(producto => {
                if (producto.id == productoCarrito.productId) {
                  let pathImagenDetalle: any[] = [];
                  pathImagenDetalle = this.productoService.imagenesDetalle(
                    producto.id
                  );
                  producto.idCarrito = productoCarrito.id;
                  producto.path = pathImagenDetalle;
                  producto.talle = productoCarrito.talle;
                  console.log(producto);
                  this.productosCarrito.push(producto);
                }
              });
            }
          });
        }
        // }, 2000);
      }
    }
  }

  ngOnInit() {
    // hago esto para ver si hay algun producto en el carrito, si no lo hay, lo redirijo al shop
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('carritoDeCompras')) {
        if (localStorage.getItem('carritoDeCompras').length !== 0) {
          let carritoDeComprasLS = JSON.parse(localStorage.getItem('carritoDeCompras'));
          carritoDeComprasLS.forEach(element => {
            if (element.userId == localStorage.getItem('userId')) {
              if (element.orden_id == 0) {
                this.hayProductos++;
              }
            }
          });
        }
      }
    }
    // fin
  }

  ngDoCheck() {
    if (this.cantidadDeProd !== this.carritoService.cantidadPodructos()) {
      this.cantidadDeProd = this.carritoService.cantidadPodructos();
    }

    // console.log(this.productosCarrito.length);

    if (this.productosCarrito == undefined || (this.productosCarrito !== undefined && this.productosCarrito.length === 0)) {
      let productoCarrito = [{
        id: Number,
        productId: Number,
        userId: String,
        talle: String,
        cantidad: Number,
        orden_id: 0,
      }];

      if (isPlatformBrowser(this.platformId)) {
        const todosLosProductosJson = JSON.parse(
          localStorage.getItem('todosLosProductos')
        );
        if (localStorage.getItem('carritoDeCompras')) {
          productoCarrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
  
          let total = 0;
          todosLosProductosJson.forEach(producto => {
            productoCarrito.forEach(carrito => {
              if (producto.id == carrito.productId && carrito.orden_id === 0) {
                this.hayProductos++;
                // if (producto.id == productoCarrito[0].productId && productoCarrito[0].orden_id === 0) {
                this.productosCarrito = [];
                let pathImagenDetalle: any[] = [];
                pathImagenDetalle = this.productoService.imagenesDetalle(producto.id);
                // this.productoService.getImagenesDetalle(producto.id).subscribe((res: any) => {
                //   res.forEach(imagen => {
                //     pathImagenDetalle.push(imagen.path);
                //   });
                // });
                producto.idCarrito = carrito.id;
                producto.path = pathImagenDetalle;
                producto.talle = carrito.talle;
                total = total + producto.precio;
                total = Math.round(total * 100) / 100;
                this.productosCarrito.push(producto);
                // this.productosCarrito["total"] = total;
              }
            });
          });
        }
      }
    }

    // console.log(this.productosCarrito.length);
    

    if (this.productosCarrito !== undefined && this.productosCarrito.length !== 0) {
      if (isPlatformBrowser(this.platformId)) {
        if (this.productosCarrito.length !== JSON.parse(localStorage.getItem("carritoDeCompras")).length) {

          this.actualizando = true;
          this.productosCarrito = [];
  
          const productosCarrito = this.carritoService.getCarrito();
          let total = 0;
  
          productosCarrito.forEach((productoCarrito: any) => {
            const todosLosProductosJson = JSON.parse(
              localStorage.getItem("todosLosProductos")
            );
            todosLosProductosJson.forEach(producto => {
              if (producto.id == productoCarrito.productId && productoCarrito.orden_id === 0) {
                let pathImagenDetalle: any[] = [];
                pathImagenDetalle = this.productoService.imagenesDetalle(producto.id);
                // this.productoService.getImagenesDetalle(producto.id).subscribe((res: any) => {
                //   res.forEach(imagen => {
                //     pathImagenDetalle.push(imagen.path);
                //   });
                // });
                producto.idCarrito = productoCarrito.id;
                producto.path = pathImagenDetalle;
                producto.talle = productoCarrito.talle;
                total = total + producto.precio;
                this.productosCarrito.push(producto);
                // this.productosCarrito["total"] = total;
              }
            });
          });
          this.actualizando = false;
        }
      }
    }
    // console.log(this.productosCarrito.length);
    if (this.productosCarrito) {
      let total = 0;
      this.productosCarrito.forEach(productoCarrito => {
        if (productoCarrito.descuento) {
          let descuento =
            (productoCarrito.descuento * productoCarrito.precio) / 100;
          total = total + (productoCarrito.precio - descuento);
          total = Math.round(total * 100) / 100;
        } else {
          total = total + productoCarrito.precio;
          total = Math.round(total * 100) / 100;
        }
      });
      // this.productosCarrito["total"] = total;
      this.precioTotal = total;
    }
  }

  quitarProducto(idCarrito) {
    this.productosCarrito.forEach((producto: any, index) => {
      if (producto.idCarrito === idCarrito) {
        this.productosCarrito['total'] = this.productosCarrito['total'] - producto.precio;
        this.productosCarrito.splice(index, 1);
        this.carritoService.deleteProductoCarrito(idCarrito);
        this.carritoService.deleteCarritoBD(idCarrito).subscribe( res => {
          return res;
        });
        if (this.carritoService.getCarrito() !== null) {
          this.cantidadDeProd = this.carritoService.getCarrito().length;
        }
      }
      if (this.productosCarrito.length === 0) {
        this.hayProductos = 0;
        this.router.navigate(['/shop']);
        delete this.productosCarrito;
      }
    });
  }
}
