import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// importados por mi
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Carrito } from 'src/app/models/carrito.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  esFavorito = false;
  productosFavoritos = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productosService: ProductosService, private router: Router) { 
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('todosLosDatos')) {
        const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
        const datos = todosLosDatosJson;
        this.arrayNombresCategoriaPrincipal = datos.principales;
      }

      setTimeout(() => {
        this.arrayNombresCategoriaPrincipal.forEach(categoria => {
          if (categoria.id === this.producto.categoria_id) {
            this.producto.categoria = categoria.nombre;
          }
        });

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
  }

  ngOnInit() { }

  guardarFavoritos(idProducto) {
    if (isPlatformBrowser(this.platformId)) {
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
}
