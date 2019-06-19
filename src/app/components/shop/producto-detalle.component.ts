import { element } from 'protractor';
import { Component, OnInit, OnDestroy } from '@angular/core';
// importados por mi
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Carrito } from 'src/app/models/carrito.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-producto-detalle",
  templateUrl: "./producto-detalle.component.html",
  styleUrls: ["./producto-detalle.component.css"]
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {
  productoConImagen: any[];
  datos = {
    colores: [],
    principales: [],
    secundarios: [],
    talles: []
  };
  talle: string;

  stockProducto = [];

  cargando = true;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let idProducto: number;
    const pathImagenDetalle: any[] = [];

    this.productosService.getDatos().subscribe((res: any) => {
      this.datos.colores = res.colores;
      this.datos.principales = res.principales;
      this.datos.secundarios = res.secundarios;
      this.datos.talles = res.talles;
    });

    this.activatedRoute.params.subscribe(parametro => {
      idProducto = parametro["id"];
    });
    this.productosService
      .getImagenesDetalle(idProducto)
      .subscribe((res: any) => {
        res.forEach(imagen => {
          pathImagenDetalle.push(imagen.path);
        });
      });
    this.productosService.getProducto(idProducto).subscribe((producto: any) => {
      producto.path = pathImagenDetalle;
      this.productoConImagen = producto;
      this.cargando = false;
    });
    this.productosService
      .getStockProducto(idProducto)
      .subscribe((stocks: any) => {
        stocks.forEach(stock => {
          this.datos.talles.forEach(talle => {
            if (stock.talle_id === talle.id) {
              // console.log(talle.nombre, stock.cantidad);
              this.stockProducto.push({
                talle_id: talle.id,
                talle_nombre: talle.nombre,
                talle_cantidad: stock.cantidad
              });
              // console.log(this.stockProducto);
            }
          });
        });
      });
  }

  ngOnInit() {
    // this.productosService.borrarScript('assets/template/js/active.js');
    setTimeout(() => {
      this.productosService.cargarScript("assets/js/carousel.js");
    }, 100);
    setTimeout(() => {
      this.productosService.cargarScript("assets/js/nice-select.js");
    }, 100);
  }

  ngOnDestroy() {
    this.productosService.borrarScript("assets/js/carousel.js");
    this.productosService.borrarScript("assets/js/nice-select.js");
    // console.log('chau');
  }

  // agregarAlCarrito(id: number) {
  //   let prodAgregado: Carrito = {};
  //   this.productosService.getProducto(id).subscribe((prod: any) => {
  //     prodAgregado.userId = localStorage.getItem("userId");
  //     prodAgregado.productId = prod.id;
  //     console.log(this.talle);
  //     prodAgregado.cantidad = 1;
  //     // this.productosService.guardarCarrito(prodAgregado).subscribe( res => console.log(res));
  //   });
  // }

  onSubmit(id: number, talle) {
    const prodAgregado = {userId: '', productId: 0, talle: '', cantidad: 0};
    this.productosService.getProducto(id).subscribe((prod: any) => {
      prodAgregado.userId = localStorage.getItem('userId');
      prodAgregado.productId = prod.id;
      // prodAgregado.talle = document.querySelector("#productSize").value;
      prodAgregado.talle = talle;
      prodAgregado.cantidad = 1;
      this.productosService.guardarCarrito(prodAgregado).subscribe(res => console.log(res));
    });
  }
}
