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

    this.stockProducto = this.productosService.stockProducto(idProducto);

    // this.productosService.getStockProducto(idProducto).subscribe((stocks: any) => {
    //     stocks.forEach(stock => {
    //       this.datos.talles.forEach(talle => {
    //         if (stock.talle_id === talle.id) {
    //           // console.log(talle.nombre, stock.cantidad);
    //           this.stockProducto.push({
    //             talle_id: talle.id,
    //             talle_nombre: talle.nombre,
    //             talle_cantidad: stock.cantidad
    //           });
    //           // console.log(this.stockProducto);
    //         }
    //       });
    //     });
    //   });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/carousel.js');
    }, 1000);
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/nice-select.js');
    }, 1000);
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/carousel.js');
    this.productosService.borrarScript('assets/js/nice-select.js');
  }

  onSubmit(id: number, talle) {
    if (localStorage.getItem('userId') !== null) {
      const prodAgregado = {
        id: 0,
        userId: '',
        productId: 0,
        talle: '',
        cantidad: 0
      };
      this.todosLosProductos.forEach((prod: any) => {
        if (prod.id == id) {
          prodAgregado.id = Math.round(Math.random() * (999999999 - 0) + 0);
          prodAgregado.userId = localStorage.getItem('userId');
          prodAgregado.productId = prod.id;
          prodAgregado.talle = talle;
          prodAgregado.cantidad = 1;
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

  // funcion que tambien chequea si ya esta agregado el producto al carrito, pero hay q trabajarla
  // porque cuando agrego un porducto x, controla que no este x, pero desp agrego z y controla q no este z
  // pero agrega x
    // onSubmit(id: number, talle) {
    //   if (localStorage.getItem("userId")) {
    //     const prodAgregado = {
    //       userId: "",
    //       productId: 0,
    //       talle: "",
    //       cantidad: 0
    //     };
    //     console.log(this.todosLosProductos);
    //     this.todosLosProductos.forEach((prod: any) => {
    //       if (prod.id == id) {
    //         prodAgregado.userId = localStorage.getItem("userId");
    //         prodAgregado.productId = prod.id;
    //         prodAgregado.talle = talle;
    //         prodAgregado.cantidad = 1;
    //         const productosCarrito = this.carritoService.getCarrito();
    //         console.log(prodAgregado);
    //         // if (productosCarrito !== null) {
    //         //   productosCarrito.forEach((productoCarrito: any) => {
    //         //     if ( productoCarrito.productId == prodAgregado.productId && productoCarrito.talle == prodAgregado.talle) {
    //         //       Swal.fire({
    //         //         title: 'Este producto ya esta en el carrito',
    //         //         type: 'warning',
    //         //         text: 'Queres agregarlo de todas formas?',
    //         //         showCancelButton: true,
    //         //         confirmButtonColor: '#3085d6',
    //         //         cancelButtonColor: '#d33',
    //         //         confirmButtonText: 'Si, agregalo',
    //         //         cancelButtonText: 'No!'
    //         //       }).then(result => {
    //         //         if (result.value) {
    //         //           this.carritoService.guardarProductoCarrito(prodAgregado);
    //         //           Swal.fire({
    //         //             title:
    //         //               'Producto agregado al carrito carrectamente',
    //         //             type: 'success'
    //         //           });
    //         //         } else {
    //         //           Swal.fire({
    //         //             title:
    //         //               'No se agrego nuevamente el producto al carrito',
    //         //             type: 'info'
    //         //           });
    //         //         }
    //         //       });
    //         //     } else {
    //         //       console.log("entra2");
    //         //       this.carritoService.guardarProductoCarrito(prodAgregado);
    //         //       Swal.fire({
    //         //         title: 'Producto agregado al carrito correctamente',
    //         //         type: 'success'
    //         //       });
    //         //     }
    //         //   });
    //         // } else {
    //         this.carritoService.guardarProductoCarrito(prodAgregado);
    //         // this.productosService.guardarCarrito(prodAgregado).subscribe(res => console.log(res));
    //         Swal.fire({
    //           title: "Producto agregado al carrito correctamente",
    //           type: "success"
    //           // allowOutsideClick: false
    //         });
    //         // }
    //       } else {
    //         Swal.fire({
    //           title: "Tenes que iniciar sesión",
    //           type: "info",
    //           text:
    //             "Para poder agregar productos al carrito primero debes inciar sesión",
    //           confirmButtonColor: "#3085d6",
    //           confirmButtonText: "Iniciar Sesón"
    //         }).then(result => {
    //           if (result.value) {
    //             this.router.navigate(["/login"]);
    //           }
    //         });
    //       }
    //     });
    //   }
    // }
  // fin funcion
}
