import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Carrito } from 'src/app/models/carrito.models';
import Swal from 'sweetalert2';

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
    if (localStorage.getItem('userId')) {

      this.productoService.getCarrito(localStorage.getItem('userId')).subscribe( (productosCarrito: Carrito[]) => {
        productosCarrito.forEach( (productoCarrito: any) => {
        // productosCarrito.forEach( (productoCarrito: Carrito) => {
          this.productoService.getProducto(productoCarrito.producto_id, productoCarrito.talle).subscribe( (producto: any) => {
          // this.productoService.getProducto(productoCarrito.producto_id, productoCarrito.talle).subscribe( (producto: Producto) => {
            const pathImagenDetalle: any[] = [];
            this.productoService.getImagenesDetalle(producto.id).subscribe((res: any) => {
              res.forEach(imagen => {
                pathImagenDetalle.push(imagen.path);
              });
            });
            producto.idCarrito = productoCarrito.id;
            producto.path = pathImagenDetalle;
            producto.talle = productoCarrito.talle;
            this.precioTotal = this.precioTotal + producto.precio;
            this.productosCarrito.push(producto);
            this.cantidadDeProd = this.productosCarrito.length;
          });
        });
      });

    }
  }

  ngOnInit() { }

  quitarProducto(idCarrito) {
    this.productosCarrito.forEach( (producto: any, index) => {
      if (producto.idCarrito === idCarrito) {
        this.productosCarrito.splice(index, 1);
        this.productoService.deleteCarrito(idCarrito).subscribe(res => console.log(res));
        setTimeout(() => {
          location.reload();
        }, 300);
      }
    });
  }

}
