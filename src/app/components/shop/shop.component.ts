import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // todosLosProductos = [];
  productosBD: [];
  productoConImagen: any[] = [];
  cargando = true;
  categoriasPrincipales = [];
  colores = [];

  constructor(private productosService: ProductosService) {

    if (localStorage.getItem('todosLosProductos')) {
      const todosLosProductosJson = JSON.parse(localStorage.getItem('todosLosProductos'));
      this.productosBD = todosLosProductosJson;
    }
    let imagenesShop;
    if (localStorage.getItem('todosLasImagenesShop')) {
      const todosLasImagenesShopJson = JSON.parse(localStorage.getItem('todosLasImagenesShop'));
      imagenesShop = todosLasImagenesShopJson;
    }
    
    let arregloPath: any[] = [];
    this.productosBD.forEach((producto: any) => {
      imagenesShop.forEach((imagen: any) => {
        if (producto.id === imagen.producto_id) {
          arregloPath.push(imagen.path);
          producto.path = arregloPath;
        }
      });
      arregloPath = [];
      this.productoConImagen.push(producto);
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    });

    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;

      this.categoriasPrincipales = datos.principales;
      this.colores = datos.colores;
    }
  }

  ngOnInit() {}

}
