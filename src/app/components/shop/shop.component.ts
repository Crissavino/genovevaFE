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

  constructor(private productosService: ProductosService) {
    this.productosService.getProductos().subscribe( res => {
// tslint:disable-next-line: no-angle-bracket-type-assertion
      // console.log(res);
      this.productosBD = <Producto[]> res;
      // console.log(this.productosBD);
      this.productosService.getImagenesShop().subscribe( (imagenesShop: any) => {
      // console.log(res);
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
          this.cargando = false;

        });
      });
    });

    // this.productosService.cargarScript('assets/template/js/active.js').then((res) => { }).catch(() => { });
  }

  ngOnInit() {
  }

}
