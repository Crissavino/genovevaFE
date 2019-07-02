import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Carrito } from 'src/app/models/carrito.models';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';
import { BrowserStack } from 'protractor/built/driverProviders';

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
  // productosCarrito = new Array<[]>();

  constructor(
    private productoService: ProductosService,
    private carritoService: CarritoService
  ) {
    this.productosCarrito["total"] = 0;
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
      setTimeout(() => {
        if (carritoDeComprasJsonUsuario !== null) {
          carritoDeComprasJsonUsuario.forEach((productoCarrito: any) => {
            console.log("entra1");
            if (productoCarrito.orden_id === 0) {
              console.log("entra2");
              const todosLosProductosJson = JSON.parse(
                localStorage.getItem("todosLosProductos")
              );

              todosLosProductosJson.forEach(producto => {
                console.log("entra3");
                if (producto.id == productoCarrito.productId) {
                  let pathImagenDetalle: any[] = [];
                  pathImagenDetalle = this.productoService.imagenesDetalle(
                    producto.id
                  );
                  producto.idCarrito = productoCarrito.id;
                  producto.path = pathImagenDetalle;
                  producto.talle = productoCarrito.talle;
                  this.productosCarrito.push(producto);
                }
              });
            }
          });
        }
      }, 2000);
    }
  }

  ngOnInit() {}

  ngDoCheck() {
    if (this.cantidadDeProd !== this.carritoService.cantidadPodructos()) {
      this.cantidadDeProd = this.carritoService.cantidadPodructos();
    }

    if (this.productosCarrito == undefined || (this.productosCarrito !== undefined && this.productosCarrito.length === 0)) {
      const todosLosProductosJson = JSON.parse(
        localStorage.getItem('todosLosProductos')
      );

      let productoCarrito = {
        id: Number,
        productId: Number,
        userId: String,
        talle: String,
        cantidad: Number
      };

      if (localStorage.getItem('carritoDeCompras')) {
        productoCarrito = JSON.parse(localStorage.getItem('carritoDeCompras'));

        console.log(productoCarrito);

        let total = 0;
        todosLosProductosJson.forEach(producto => {
          if (producto.id == productoCarrito[0].productId && productoCarrito[0].orden_id === 0) {
            this.productosCarrito = [];
            let pathImagenDetalle: any[] = [];
            pathImagenDetalle = this.productoService.imagenesDetalle(producto.id);
            // this.productoService.getImagenesDetalle(producto.id).subscribe((res: any) => {
            //   res.forEach(imagen => {
            //     pathImagenDetalle.push(imagen.path);
            //   });
            // });
            producto.idCarrito = productoCarrito[0].id;
            producto.path = pathImagenDetalle;
            producto.talle = productoCarrito[0].talle;
            total = total + producto.precio;
            this.productosCarrito.push(producto);
            // this.productosCarrito["total"] = total;
          }
        });
      }
    }

    if (this.productosCarrito !== undefined && this.productosCarrito.length !== 0) {
      if (
        this.productosCarrito.length !==
        JSON.parse(localStorage.getItem("carritoDeCompras")).length
      ) {
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
    if (this.productosCarrito) {
      let total = 0;
      this.productosCarrito.forEach(productoCarrito => {
        if (productoCarrito.descuento && productoCarrito.orden_id === 0) {
          let descuento = ( (productoCarrito.descuento) / 100) * productoCarrito.precio;
          total = total + (productoCarrito.precio - descuento);
        } else {
          total = total + productoCarrito.precio;
        }
      });
      this.productosCarrito["total"] = total;
    }
  }

  quitarProducto(idCarrito) {
    this.productosCarrito.forEach((producto: any, index) => {
      if (producto.idCarrito === idCarrito && producto.orden_id === 0) {
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
        delete this.productosCarrito;
      }
    });
  }
}
