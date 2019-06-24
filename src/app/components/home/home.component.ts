import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  productosDestacadosConImagenes: any[] = [];
  // @Output()cantProductosDestacados;
  logueado = false;
  cargando = true;
  primeraVez = true;

  constructor(private productosService: ProductosService, private route: Router) {
    let imagenes;
    if (localStorage.getItem("todosLasImagenesShop")) {
      const todosLasImagenesShopJson = JSON.parse(
        localStorage.getItem("todosLasImagenesShop")
      );
      imagenes = todosLasImagenesShopJson;
    }

    this.productosService.productosDestacados().forEach(productoDestacado => {
      // this.productosService.getImagenesShop().subscribe((imagenes: any) => {
      let pathImagen = [];
      imagenes.forEach((imagen: any) => {
        if (productoDestacado.id == imagen.producto_id) {
          pathImagen.push(imagen.path);
          productoDestacado.path = pathImagen;
        }
      });
      pathImagen = [];
      // });
      this.productosDestacadosConImagenes.push(productoDestacado);
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    });

    // this.productosService.productosDestacados().forEach(productos => {
    //   productos.forEach(productoDestacado => {
    //     this.productosService.getImagenesShop().subscribe((imagenes: any) => {
    //         let pathImagen = [];
    //         imagenes.forEach((imagen: any) => {
    //           if (productoDestacado.id === imagen.producto_id) {
    //             pathImagen.push(imagen.path);
    //             productoDestacado.path = pathImagen;
    //           }
    //         });
    //         pathImagen = [];
    //     });
    //     this.productosDestacadosConImagenes.push(productoDestacado);
    //     setTimeout(() => {
    //       this.cargando = false;
    //     }, 500);
    //   });
    // });
    // this.productosService.getProductosDestacados().subscribe((productos: any) => {
    //   productos.forEach(productoDestacado => {
    //     this.productosService.getImagenesShop().subscribe((imagenes: any) => {
    //       let pathImagen = [];
    //       imagenes.forEach((imagen: any) => {
    //         if (productoDestacado.id === imagen.producto_id) {
    //           pathImagen.push(imagen.path)
    //           productoDestacado.path = pathImagen;
    //         }
    //       });
    //       pathImagen = [];
    //     });
    //     this.productosDestacadosConImagenes.push(productoDestacado);
    //     setTimeout(() => {
    //       this.cargando = false;
    //     }, 500);
    //   });
    // });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript("assets/js/carousel.js");
    }, 1000);
  }

  ngOnDestroy() {
    this.productosService.borrarScript("assets/js/carousel.js");
  }
}

