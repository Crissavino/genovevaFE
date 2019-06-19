import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  productosBD: Producto[];
  productoConImagen: any[] = [];
  cargando = true;
  categoriasPrincipales = [];
  colores = [];

  constructor(private productosService: ProductosService) {
    this.productosService.getProductos().subscribe( res => {
// tslint:disable-next-line: no-angle-bracket-type-assertion
      this.productosBD = <Producto[]> res;
      this.productosService.getImagenesShop().subscribe( (imagenesShop: any) => {
        let arregloPath: any[] = [];
        this.productosBD.forEach( (producto: any) => {
          imagenesShop.forEach( (imagen: any) => {
              if (producto.id === imagen.producto_id) {
              arregloPath.push(imagen.path);
              producto.path = arregloPath;
              // console.log(arregloPath);
            }
          });
          arregloPath = [];
          this.productoConImagen.push(producto);
          setTimeout(() => {
            this.cargando = false;
          }, 500);
        });
      });
    });

    this.productosService.getDatos().subscribe( (datos: any) => {
      this.categoriasPrincipales = datos.principales;
      this.colores = datos.colores;
    });
  }

  ngOnInit() {
    // this.productosService.borrarScript('assets/template/js/active.js');
    // this.productosService.cargarScript('assets/template/js/active.js');
  }

}
