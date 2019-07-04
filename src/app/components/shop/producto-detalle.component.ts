import { CarritoService } from './../../services/carrito.service';
import { element } from 'protractor';
import { Component, OnInit, OnDestroy } from '@angular/core';
// importados por mi
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Carrito } from 'src/app/models/carrito.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {
  productoConImagen: any[];
  todosLosProductos = [];
  datos = {
    colores: [],
    principales: [],
    secundarios: [],
    talles: []
  };
  talle: string;
  userId = '';

  stockProducto = [];

  cargando = true;

  esFavorito = false;
  productosFavoritos = [];

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carritoService: CarritoService
  ) {
    if (localStorage.getItem('todosLosProductos')) {
      const todosLosProductosJson = JSON.parse(
        localStorage.getItem('todosLosProductos')
      );
      this.todosLosProductos = todosLosProductosJson;
    }
    setTimeout(() => {
      if (localStorage.getItem('userId')) {
        this.userId = localStorage.getItem('userId');
      }
    }, 1200);

    setTimeout(() => {
      if (localStorage.getItem('userId')) {
        if (localStorage.getItem('favoritosUsuario')) {
          const favoritosUsuarioJson = JSON.parse(localStorage.getItem('favoritosUsuario'));
          favoritosUsuarioJson.forEach(fav => {
            if (fav.productId === this.productoConImagen["id"]) {
              this.esFavorito = true;
            }
          });
        }
      }
    }, 1000);

    let idProducto: number;
    let pathImagenDetalle: any[] = [];

    // this.productosService.getDatos().subscribe((res: any) => {
    //   this.datos.colores = res.colores;
    //   this.datos.principales = res.principales;
    //   this.datos.secundarios = res.secundarios;
    //   this.datos.talles = res.talles;
    // });

    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;

      this.datos.colores = datos.colores;
      this.datos.principales = datos.principales;
      this.datos.secundarios = datos.secundarios;
      this.datos.talles = datos.talles;
    }

    this.activatedRoute.params.subscribe(parametro => {
      idProducto = parametro.id;
    });

    pathImagenDetalle = this.productosService.imagenesDetalle(idProducto);

    this.todosLosProductos.forEach((producto: any) => {
      if (producto.id == idProducto) {
        producto.path = pathImagenDetalle;
        this.productoConImagen = producto;
        setTimeout(() => {
          this.cargando = false;
        }, 500);
      }
    });

    // setTimeout(() => {
    this.productosService.stockProducto(idProducto).subscribe((res: any) => {
      if (res.length > 1) {
        res.forEach(prod => {
          if (prod.talle_cantidad > 0) {
            this.stockProducto.push(prod);
          }
        });
      } else {
        if (res[0].talle_cantidad > 0) {
          this.stockProducto = res;
        }
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/carousel.js');
    }, 1500);
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/nice-select.js');
    }, 1500);
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/carousel.js');
    this.productosService.borrarScript('assets/js/nice-select.js');
  }

  onSubmit(id: number, talle) {
    let talleId;
    this.stockProducto.forEach( (prod: any) => {
      console.log(prod);
      if (prod.talle_nombre === talle) {
        talleId = prod.talle_id;
      }
    });
    if (localStorage.getItem('userId') !== null) {
      const prodAgregado = {
        id: 0,
        userId: "",
        productId: 0,
        talle: "",
        talle_id: 0,
        cantidad: 0,
        orden_id: 0
      };
      this.todosLosProductos.forEach((prod: any) => {
        if (prod.id == id) {
          prodAgregado.id = Math.round(Math.random() * (999999999 - 0) + 0);
          prodAgregado.userId = localStorage.getItem('userId');
          prodAgregado.productId = prod.id;
          prodAgregado.talle = talle;
          prodAgregado.talle_id = talleId;
          prodAgregado.cantidad = 1;
          prodAgregado.orden_id = 0;
          const productosCarrito = this.carritoService.getCarrito();
          this.carritoService.guardarProductoCarrito(prodAgregado);
          this.carritoService.guardarCarritoBD(prodAgregado).subscribe( res => {
            return res;
          });
          Swal.fire({
            title: 'Producto agregado al carrito correctamente',
            type: 'success'
            // allowOutsideClick: false
          });
        }
      });
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

  guardarFavoritos(idProducto) {
    const todosLosProductos = JSON.parse(localStorage.getItem('todosLosProductos'));
    if (localStorage.getItem('userId') !== null) {
      if (this.esFavorito === false) {
        this.esFavorito = true;
        const prodFavorito = {
          id: 0,
          userId: '',
          productId: 0,
        };
        todosLosProductos.forEach(producto => {
          if (producto.id == idProducto) {
            prodFavorito.id = Math.round(Math.random() * (999999999 - 0) + 0);
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
