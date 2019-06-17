import { Component, OnInit } from '@angular/core';

import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {

  productosBD: Producto[];
  // cargando = true;

  constructor(private productosService: ProductosService) { 
    // this.productosService.getProductos().subscribe(res => {
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      // this.productosBD = <Producto[]>res;
    // });
  }

  ngOnInit() {
    setTimeout(() => {
      this.pocoStock();
    }, 500);
  }

  pocoStock(){
    const queda1: string[] = [];
    const queda0: string[] = [];
    for (const i of this.productosBD) {

      if (i.stock === 1) {
        queda1.push(' ' + i.titulo);
      }

      if (i.stock === 0) {
        queda0.push(' ' + i.titulo);
      }
    }

    // swal('Alerta de Stock! \n\n' + queda1 + ' tiene/n un solo remanente en stock \n' + queda0 + ' no tiene/n ninguno en stock');
  }

}
