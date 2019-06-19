import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  public logueadoHeader = false;
  usaurioId: number;
  userId;
  cantidadDeProd: number;

  constructor(private productosService: ProductosService) {
    if (localStorage.getItem("userId")) {
      let productosCarrito: any[] = [];
      this.productosService
        .getCarrito(localStorage.getItem("userId"))
        .subscribe((carrito: any) => {
          carrito.forEach((elemento: any) => {
            this.productosService
              .getProducto(elemento.producto_id)
              .subscribe(producto => {
                productosCarrito.push(producto);
              });
          });
        });
      setTimeout(() => {
        this.cantidadDeProd = productosCarrito.length;
      }, 1000);
    }
  }

  ngDoCheck() {
    if (localStorage.getItem("logueado")) {
      this.logueadoHeader = true;
    }

    if (localStorage.getItem("userId") === null) {
      this.userId = null;
    } else {
      this.userId = localStorage.getItem("userId");
    }
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.productosService.cargarScript('assets/template/js/classy-nav.min.js');
    // }, 100);
  }

  ngOnDestroy() {
    // this.productosService.borrarScript('assets/template/js/classy-nav.min.js');
  }
}
