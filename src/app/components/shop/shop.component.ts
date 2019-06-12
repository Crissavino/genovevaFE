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

  constructor(private productosService: ProductosService) {
    this.productosService.getProductos().subscribe( res => {
// tslint:disable-next-line: no-angle-bracket-type-assertion
      this.productosBD = <Producto[]> res;
      console.log(this.productosBD);
    });
  }

  ngOnInit() {
  }

}
