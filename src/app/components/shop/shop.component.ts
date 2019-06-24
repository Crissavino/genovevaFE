import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // todosLosProductos = [];
  productosBD: [];
  productoConImagen: any[] = [];
  productoPorCategoria: any[] = [];
  productoPorColor: any[] = [];
  productoOrdenado: any[] = [];
  cargando = true;
  categoriasPrincipales = [];
  colores = [];
  filtraCategoria = false;
  filtraColor = false;
  ordenado = false;

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

  cambiarCategoria(categoriaId) {
    this.filtraColor = false;
    this.filtraCategoria = true;
    this.ordenado = false;
    this.productoPorCategoria = [];
    this.productoConImagen.forEach(producto => {
      if (producto.id === categoriaId) {
        this.productoPorCategoria.push(producto);
      }
    });

    if (categoriaId === 99) {
      this.productoPorCategoria = this.productoConImagen;
    }

    if (this.productoPorCategoria.length === 0 && categoriaId !== 99) {
      Swal.fire(
        {
          title: 'Todavia no tenemos ningún producto en esa categoría'
        }
      ).then( () => {
        this.productoPorCategoria = this.productoConImagen;
        this.filtraCategoria = false;
      });
    }

    return this.productoPorCategoria;
  }

  filtrarColor(colorId) {
    this.filtraCategoria = false;
    this.filtraColor = true;
    this.ordenado = false;
    this.productoPorColor = [];
    this.productoConImagen.forEach(producto => {
      if (producto.id === colorId) {
        this.productoPorColor.push(producto);
      }
    });

    if (colorId === 99) {
      this.productoPorColor = this.productoConImagen;
    }

    if (this.productoPorColor.length === 0 && colorId !== 99) {
      Swal.fire(
        {
          title: 'Todavia no tenemos ningún producto con ese color'
        }
      ).then(() => {
        this.productoPorColor = this.productoConImagen;
        this.filtraColor = false;
      });
    }

    return this.productoPorColor;
  }

  ordenarPor(ordenar) {
    this.filtraCategoria = false;
    this.filtraColor = false;
    this.ordenado = true;

    if (ordenar === 'mayor') {
      let arregloOrdenadoMayor = [];
      function mayor(a, b) {
        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        return 0;
      }
      arregloOrdenadoMayor = this.productoConImagen.sort(mayor);

      console.log(arregloOrdenadoMayor);
      this.productoOrdenado = arregloOrdenadoMayor;
    }

    if (ordenar === 'menor') {
      
      let arregloOrdenadoMenor = [];
      function menor(a, b) {
        if (a.precio < b.precio) {
          return -1;
        }
        if (a.precio > b.precio) {
          return 1;
        }
        return 0;
      }
      arregloOrdenadoMenor = this.productoConImagen.sort(menor);

      console.log(arregloOrdenadoMenor);
      this.productoOrdenado = arregloOrdenadoMenor;
    }

    if (ordenar === 'nuevo') {

      let arregloOrdenadoMasNuevo = [];
      function nuevo(a, b) {
        if (a.updated_at < b.updated_at) {
          return 1;
        }
        if (a.updated_at > b.updated_at) {
          return -1;
        }
        return 0;
      }
      arregloOrdenadoMasNuevo = this.productoConImagen.sort(nuevo);

      console.log(arregloOrdenadoMasNuevo);
      this.productoOrdenado = arregloOrdenadoMasNuevo;
    }

    if (ordenar === '') {
      console.log('entra');
      this.productoOrdenado = this.productoConImagen;
      this.ordenado = false;
    }

    console.log(this.productoOrdenado);
    
    return this.productoOrdenado;
  }

  filtrarPorPrecio() {
    console.log('nada por ahora');
  }
}
