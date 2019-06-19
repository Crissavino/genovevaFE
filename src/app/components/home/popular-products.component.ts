import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: "app-popular-products",
  templateUrl: "./popular-products.component.html",
  styleUrls: ["./popular-products.component.css"]
})
export class PopularProductsComponent implements OnInit {

  // productosDestacadosConImagenes: any[] = [];
  // @Output()cantProductosDestacados;
  @Input() producto: any;

  constructor(private productosService: ProductosService) {
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
    //   });
    //   console.log(this.productosDestacadosConImagenes);
    //   // this.cantProductosDestacados = this.productosDestacadosConImagenes.length;
    // });
  }

  ngOnInit() {}
}
