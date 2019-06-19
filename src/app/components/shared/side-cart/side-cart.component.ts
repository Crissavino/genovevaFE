import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Carrito } from 'src/app/models/carrito.models';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit {

  cantidadDeProd: number;
  productosCarrito = [];
  precioTotal = 0;
  // productosCarrito = new Array<[]>();

  constructor(private productoService: ProductosService) { 

    this.productoService.getCarrito(localStorage.getItem('userId')).subscribe( (productosCarrito: Carrito[]) => {
      productosCarrito.forEach( (productoCarrito: Carrito) => {
        this.productoService.getProducto(productoCarrito.producto_id, productoCarrito.talle).subscribe( (producto: any) => {
        // this.productoService.getProducto(productoCarrito.producto_id, productoCarrito.talle).subscribe( (producto: Producto) => {
          const pathImagenDetalle: any[] = [];
          this.productoService.getImagenesDetalle(producto.id).subscribe((res: any) => {
            res.forEach(imagen => {
              pathImagenDetalle.push(imagen.path);
            });
          });
          // this.productoService.getStockProducto(producto.id).subscribe( (res: any) => {
          //   console.log(res);
          // });
          producto.path = pathImagenDetalle;
          producto.talle = productoCarrito.talle;
          this.precioTotal = this.precioTotal + producto.precio;
          this.productosCarrito.push(producto);
          this.cantidadDeProd = this.productosCarrito.length;
        });
      });
    });
  }

  ngOnInit() { }

}
