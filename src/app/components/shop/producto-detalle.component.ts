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

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    setTimeout(() => {
      if (localStorage.getItem("userId")) {
        this.userId = localStorage.getItem("userId");
      }
    }, 1200);
    console.log(this.userId);
    
    let idProducto: number;
    const pathImagenDetalle: any[] = [];

    this.productosService.getDatos().subscribe((res: any) => {
      this.datos.colores = res.colores;
      this.datos.principales = res.principales;
      this.datos.secundarios = res.secundarios;
      this.datos.talles = res.talles;
    });

    this.activatedRoute.params.subscribe(parametro => {
      idProducto = parametro['id'];
    });
    this.productosService
      .getImagenesDetalle(idProducto)
      .subscribe((res: any) => {
        res.forEach(imagen => {
          pathImagenDetalle.push(imagen.path);
        });
      });
    this.productosService.getProducto(idProducto).subscribe((producto: any) => {
      producto.path = pathImagenDetalle;
      this.productoConImagen = producto;
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    });
    this.productosService
      .getStockProducto(idProducto)
      .subscribe((stocks: any) => {
        stocks.forEach(stock => {
          this.datos.talles.forEach(talle => {
            if (stock.talle_id === talle.id) {
              // console.log(talle.nombre, stock.cantidad);
              this.stockProducto.push({
                talle_id: talle.id,
                talle_nombre: talle.nombre,
                talle_cantidad: stock.cantidad
              });
              // console.log(this.stockProducto);
            }
          });
        });
      });
  }

  ngOnInit() {
    // this.productosService.borrarScript('assets/template/js/active.js');
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
    // console.log('chau');
  }

  // agregarAlCarrito(id: number) {
  //   let prodAgregado: Carrito = {};
  //   this.productosService.getProducto(id).subscribe((prod: any) => {
  //     prodAgregado.userId = localStorage.getItem("userId");
  //     prodAgregado.productId = prod.id;
  //     console.log(this.talle);
  //     prodAgregado.cantidad = 1;
  //     // this.productosService.guardarCarrito(prodAgregado).subscribe( res => console.log(res));
  //   });
  // }

  onSubmit(id: number, talle) {
    
    // this.productosService.getCarrito(3).subscribe( res => {
    //   console.log(res);
    // });
    
    if (localStorage.getItem('userId')) {
      const prodAgregado = {
        userId: "",
        productId: 0,
        talle: "",
        cantidad: 0
      };
      this.productosService.getProducto(id).subscribe((prod: any) => {
        prodAgregado.userId = localStorage.getItem('userId');
        prodAgregado.productId = prod.id;
        prodAgregado.talle = talle;
        prodAgregado.cantidad = 1;
        this.productosService.getCarrito(localStorage.getItem('userId')).subscribe((productosCarrito: Carrito[]) => {
            productosCarrito.forEach((productoCarrito: any) => {
              if ( productoCarrito.producto_id == prodAgregado.productId && productoCarrito.talle == prodAgregado.talle) {
                Swal.fire({
                  title: 'Este producto ya esta en el carrito',
                  type: 'warning',
                  text: 'Queres agregarlo de todas formas?',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, agregalo',
                  cancelButtonText: 'No!'
                }).then(result => {
                  if (result.value) {
                    this.productosService.guardarCarrito(prodAgregado).subscribe(res => console.log(res));
                    Swal.fire({
                      title: 'Producto agregado al carrito carrectamente',
                      type: 'success'
                    });
                    setTimeout(() => {
                      location.reload();
                    }, 300);
                  } else {
                    Swal.fire({
                      title:
                        'No se agrego nuevamente el producto al carrito',
                      type: 'info'
                    });
                  }
                });
              } else {
                this.productosService.guardarCarrito(prodAgregado).subscribe(res => console.log(res));
                Swal.fire({
                  title: 'Producto agregado al carrito correctamente',
                  type: 'success'
                  // allowOutsideClick: false
                }).then(result => {
                  if (result.value || result.dismiss) {
                    setTimeout(() => {
                      location.reload();
                    }, 200);
                  }
                });
              }
            });
          });
      });
    } else {
      Swal.fire({
        title: 'Tenes que iniciar sesión',
        type: 'info',
        text: 'Para poder agregar productos al carrito primero debes inciar sesión',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Iniciar Sesón',
      }).then( result => {
        if (result.value) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
