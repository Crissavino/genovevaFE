import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  // todosLosProductos = [];
  productosBD: [];
  productoConImagen: any[] = [];
  productoPorCategoria: any[] = [];
  productoPorColor: any[] = [];
  productoOrdenado: any[] = [];
  cargando = true;
  categoriasPrincipales = [];
  colores = [];
  relColores = [];
  filtraCategoria = false;
  filtraColor = false;
  ordenado = false;
  ordenadoNuevo = false;
  ordenadoMayor = false;
  ordenadoMenor = false;
  contenido = '';
  tituloPag = '';

  constructor(private productosService: ProductosService, private route: Router, private activatedRoute: ActivatedRoute) {

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

    if (localStorage.getItem('todasRelColores')) {
      const todasRelColoresJson = JSON.parse(localStorage.getItem('todasRelColores'));
      this.relColores = todasRelColoresJson;
    }
  }

  ngOnInit() {
    this.contenido = "En esta seccion podras encontrar todos nuestros productos, tales como remeras, camisas, pantalones, polleras, bodys, vestidos, camperas, accesorios, tops, blusas, monos, musculosas, filtar por color, por categoria, ordenar por precio y por el mas nuevo. Hoy en dia contamos con "+this.productosBD.length+" productos en nuestro stock, pero siempre estamos trabajando para tener mas";
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Galeria de productos";
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy(){
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

  public cambiarCategoria(categoriaId) {
    this.filtraColor = false;
    this.filtraCategoria = true;
    this.ordenadoMayor = false;
    this.ordenadoMenor = false;
    this.ordenadoNuevo = false;
    this.ordenado = false;
    this.productoPorCategoria = [];
    this.productoConImagen.forEach(producto => {
      if (producto.categoria_id === categoriaId) {
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
    this.ordenadoMayor = false;
    this.ordenadoMenor = false;
    this.ordenadoNuevo = false;
    this.ordenado = false;
    this.productoPorColor = [];
    this.productoConImagen.forEach(producto => {
      this.relColores.forEach(relColor => {
        if (relColor.colore_id == colorId) {
          console.log(relColor);
          if (producto.id == relColor.producto_id) {
            this.productoPorColor.push(producto);
          }
        }
      });
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
    console.log(ordenar);
    this.filtraCategoria = false;
    this.filtraColor = false;
    this.productoOrdenado = [];
    this.ordenadoMayor = false;
    this.ordenadoMenor = false;
    this.ordenadoNuevo = false;

    if (ordenar === 'mayor') {
      this.ordenadoMayor = true;
      this.ordenadoMenor = false;
      this.ordenadoNuevo = false;
      this.ordenado = false;
      let arregloOrdenadoMayor = [];
      // function mayor(a, b) {
      //   if (a.precio < b.precio) {
      //     return 1;
      //   }
      //   if (a.precio > b.precio) {
      //     return -1;
      //   }
      //   return 0;
      // }
      arregloOrdenadoMayor = this.productoConImagen.sort(this.mayor);

      this.productoOrdenado = arregloOrdenadoMayor;
      console.log(this.productoOrdenado);
    }

    if (ordenar === 'menor') {
      this.ordenadoMenor = true;
      this.ordenadoMayor = false;
      this.ordenadoNuevo = false;
      this.ordenado = false;
      let arregloOrdenadoMenor = [];
      // function menor(a, b) {
      //   if (a.precio < b.precio) {
      //     return -1;
      //   }
      //   if (a.precio > b.precio) {
      //     return 1;
      //   }
      //   return 0;
      // }
      arregloOrdenadoMenor = this.productoConImagen.sort(this.menor);

      console.log(arregloOrdenadoMenor);
      this.productoOrdenado = arregloOrdenadoMenor;
    }

    if (ordenar === 'nuevo') {
      this.ordenadoNuevo = true;
      this.ordenadoMayor = false;
      this.ordenadoMenor = false;
      this.ordenado = false;
      let arregloOrdenadoMasNuevo = [];
      // function nuevo(a, b) {
      //   if (a.updated_at < b.updated_at) {
      //     return 1;
      //   }
      //   if (a.updated_at > b.updated_at) {
      //     return -1;
      //   }
      //   return 0;
      // }
      arregloOrdenadoMasNuevo = this.productoConImagen.sort(this.nuevo);

      this.productoOrdenado = arregloOrdenadoMasNuevo;
    }

    if (ordenar === '') {
      this.productoOrdenado = this.productoConImagen;
      this.ordenadoMayor = false;
      this.ordenadoMenor = false;
      this.ordenadoNuevo = false;
      this.ordenado = false;
    }

    console.log(this.productoOrdenado);

    return this.productoOrdenado;
  }

  nuevo(a, b) {
    if (a.updated_at < b.updated_at) {
      return 1;
    }
    if (a.updated_at > b.updated_at) {
      return -1;
    }
    return 0;
  }

  menor(a, b) {
    if (a.precio < b.precio) {
      return -1;
    }
    if (a.precio > b.precio) {
      return 1;
    }
    return 0;
  }

  mayor(a, b) {
    if (a.precio < b.precio) {
      return 1;
    }
    if (a.precio > b.precio) {
      return -1;
    }
    return 0;
  }

  filtrarPorPrecio() {
    console.log('nada por ahora');
  }
}
