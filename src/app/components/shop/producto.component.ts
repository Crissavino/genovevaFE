import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit, Input, Output } from '@angular/core';

// importados por mi
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Carrito } from 'src/app/models/carrito.models';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  // @Output() productosBD = [];
  @Input() producto: Producto;
  arrayNombresCategoriaPrincipal = [];
  nombreCategoria = '';

  constructor(private productoService: ProductosService) { 
    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;
      this.arrayNombresCategoriaPrincipal = datos.principales;
    }

    setTimeout(() => {
      this.arrayNombresCategoriaPrincipal.forEach(categoria => {
        if (categoria.id === this.producto.categoria_id) {
          console.log(categoria.nombre);
          this.nombreCategoria = categoria.nombre;
        }
      });
    }, 1000);
  }

  ngOnInit() { }

  // agregarAlCarrito(id: number) {
  //   // let prodAgregado: Carrito = {};
  //   let prodAgregado: Carrito = {};
  //   this.productoService.getProducto(id).subscribe((prod: any) => {
  //     prodAgregado.userId = localStorage.getItem('userId');
  //     prodAgregado.productId = prod.id;
  //     prodAgregado.cantidad = 1;
  //     this.productoService.guardarCarrito(prodAgregado).subscribe(res => console.log(res));
  //   });
  // }
}
