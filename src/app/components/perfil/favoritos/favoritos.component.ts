import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit, OnDestroy {

  cargando = true;
  todosLosProductos = [];
  todosLosProductosConImagenes = [];
  productosFavoritos = [];
  todosLasImagenesShopJson;
  categoriasPrincipales = [];
  colores = [];

  constructor(private productoService: ProductosService) {
    if (localStorage.getItem('todosLosProductos')) {
      const todosLosProductosJson = JSON.parse(localStorage.getItem('todosLosProductos'));
      this.todosLosProductos = todosLosProductosJson;
    }
    let imagenesShop;
    if (localStorage.getItem('todosLasImagenesShop')) {
      const todosLasImagenesShopJson = JSON.parse(localStorage.getItem('todosLasImagenesShop'));
      imagenesShop = todosLasImagenesShopJson;
    }

    let arregloPath: any[] = [];
    this.todosLosProductos.forEach((producto: any) => {
      imagenesShop.forEach((imagen: any) => {
        if (producto.id === imagen.producto_id) {
          arregloPath.push(imagen.path);
          producto.path = arregloPath;
        }
      });
      arregloPath = [];
      this.todosLosProductosConImagenes.push(producto);
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

    if (localStorage.getItem('favoritosUsuario')) {
      const favoritosUsuarioJson = JSON.parse(localStorage.getItem('favoritosUsuario'));

      this.todosLosProductosConImagenes.forEach(producto => {
        favoritosUsuarioJson.forEach(favorito => {
          if (producto.id == favorito.productId) {
            this.productosFavoritos.push(producto);
          }
        });
      });
    }

    setTimeout(() => {
      this.cargando = false;
    }, 500);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
