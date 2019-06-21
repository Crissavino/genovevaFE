import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';

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

  constructor(private productosService: ProductosService, private carritoService: CarritoService) {
    // let productosCarrito: any[] = [];
    // const carrito = this.carritoService.getCarrito();
    // // this.productosService.getCarrito(localStorage.getItem("userId")).subscribe((carrito: any) => {
    // carrito.forEach((elemento: any) => {
    //   this.productosService
    //     .getProducto(elemento.producto_id)
    //     .subscribe(producto => {
    //       productosCarrito.push(producto);
    //     });
    // });
    //   // });
    // setTimeout(() => {
    //   this.cantidadDeProd = productosCarrito.length;
    // }, 1000);
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

    if (this.cantidadDeProd !== this.carritoService.cantidadPodructos()) {
      this.cantidadDeProd = this.carritoService.cantidadPodructos();
    }
  }

  ngOnInit() { }

  ngOnDestroy() { }
}
