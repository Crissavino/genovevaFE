import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit, OnDestroy {
  // productosDestacadosConImagenes: any[] = [];
  // @Output()cantProductosDestacados;
  @Input() producto: any;
  datos = {
    colores: [],
    principales: [],
    secundarios: [],
    talles: []
  };

  esFavorito = false;
  productosFavoritos = [];

  constructor(private productosService: ProductosService, private router: Router) {
    setTimeout(() => {
      if (localStorage.getItem('userId')) {
        if (localStorage.getItem('favoritosUsuario')) {
          const favoritosUsuarioJson = JSON.parse(localStorage.getItem('favoritosUsuario'));
          favoritosUsuarioJson.forEach(fav => {
            if (fav.productId === this.producto.id) {
              this.esFavorito = true;
            }
          });
        }
      }
    }, 1000);
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.productosService.cargarScript('assets/js/carousel.js');
    // }, 1000);
  }

  ngOnDestroy() {
    // this.productosService.borrarScript("assets/js/carousel.js");
    // console.log('chau');
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
            this.productosService.guardarFavoritoBD(prodFavorito).subscribe( res => {
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
