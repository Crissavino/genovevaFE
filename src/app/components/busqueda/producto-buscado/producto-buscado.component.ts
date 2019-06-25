import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-buscado',
  templateUrl: './producto-buscado.component.html',
  styleUrls: ['./producto-buscado.component.css']
})
export class ProductoBuscadoComponent implements OnInit, DoCheck {

  arrayNombresCategoriaPrincipal = [];
  nombreCategoria = '';
  @Input() producto;
  buscando = false;

  esFavorito = false;
  productosFavoritos = [];

  constructor(private productosService: ProductosService, private router: Router) {
    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;
      this.arrayNombresCategoriaPrincipal = datos.principales;
    }

    if (localStorage.getItem('userId')) {
      this.productosService.getProdFavoritosBD(localStorage.getItem('userId')).subscribe((fav: any) => {
        fav.forEach(prodFav => {
          if (prodFav.producto_id === this.producto.id) {
            this.esFavorito = true;
          }
        });
      });
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

  ngOnInit() {
  }

  ngDoCheck() {
  }

  guardarFavoritos(idProducto) {
    const todosLosProductos = JSON.parse(localStorage.getItem('todosLosProductos'));
    if (localStorage.getItem('userId') !== null) {
      if (this.esFavorito === false) {
        this.esFavorito = true;
        const prodFavorito = {
          id: '',
          userId: '',
          productId: 0,
        };
        todosLosProductos.forEach(producto => {
          if (producto.id == idProducto) {
            prodFavorito.id = Math.random().toString(36).substr(2, 9);
            prodFavorito.userId = localStorage.getItem('userId');
            prodFavorito.productId = producto.id;
            this.productosFavoritos.push(prodFavorito);
            this.productosService.guardarFavorito(prodFavorito);
            this.productosService.guardarFavoritoBD(prodFavorito).subscribe(res => {
              return res;
            });
          }
        });
      } else {
        this.esFavorito = false;
        const favoritosUsuarioJson = JSON.parse(localStorage.getItem('favoritosUsuario'));
        let favoritosNuevo = [];
        favoritosUsuarioJson.forEach((prodFavoritos, index) => {
          if (prodFavoritos.productId !== idProducto) {
            favoritosNuevo.push(prodFavoritos);
          } else {
            this.productosService.deleteFavoritoBD(prodFavoritos.id).subscribe(res => {
              return res;
            });
          }
        });
        const favoritosNuevoString = JSON.stringify(favoritosNuevo);
        localStorage.removeItem('favoritosUsuario');
        localStorage.setItem('favoritosUsuario', favoritosNuevoString);
      }
    } else {
      Swal.fire({
        title: 'Tenes que iniciar sesión',
        type: 'info',
        text:
          'Para poder agregar productos al carrito primero debes inciar sesión',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Iniciar Sesón'
      }).then(result => {
        if (result.value) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

}
