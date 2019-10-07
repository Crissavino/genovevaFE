import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RegistroService } from 'src/app/services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario: UsuarioModel;
  pedidosUsuario: any = [];
  hayPedidos: boolean;
  cargando: boolean;
  contenido = "";
  tituloPag = "";
  mantenimiento;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private registroService: RegistroService,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.carritoService.getCarritoBD(localStorage.getItem("userId"));

      const carritoUsuario = this.carritoService.getTablaCarritos(localStorage.getItem("userId"));
      console.log(carritoUsuario);
      
      const todosLosProductosJson = JSON.parse(localStorage.getItem('todosLosProductos'));
      
      let todasLasOrdenes = [];

      this.carritoService.getOrdenes().subscribe( res => {
        this.cargando = true;
        todasLasOrdenes = res;
        let estadoPagoArray = ['Pagado', 'Pendiente', 'Rechazado', 'Aprobado'];
        let estadoEnvioArray = ['Por enviar', 'Enviado', 'Recibido'];
        
        // setTimeout(() => {
          console.log(todasLasOrdenes);
          console.log('alass');
          
          todasLasOrdenes.forEach(orden => {
            let productos = [];
            let numOrden = 0;
            let estadoPago = '';
            let estadoEnvio = '';
            let numSeguimiento = '';
            let totalOrden = 0;
            let titulosProductos = [];
            if (orden.user_id == localStorage.getItem("userId")) {
              totalOrden = orden.totalOrden;
              
              carritoUsuario.forEach(carrito => {
                if (carrito.ordene_id !== null) {
                  if (orden.id == carrito.ordene_id) {
                    numOrden = orden.numOrden;
                    numSeguimiento = orden.numSeguimiento;
                    if (orden.estadopago_id) {
                      estadoPagoArray.forEach((estado, index) => {
                        if (orden.estadopago_id == (index + 1)) {
                          estadoPago = estado;
                        }
                      });
                    }
                    if (orden.estadoenvio_id) {
                      estadoEnvioArray.forEach((estado, index) => {
                        if (orden.estadoenvio_id == (index + 1)) {
                          estadoEnvio = estado;
                        }
                      });
                    }
                    todosLosProductosJson.forEach(prod => {
                      if (carrito.producto_id == prod.id) {
                        productos.push(prod);
                      }
                    });
                  }
                }
              });
            }
            productos.forEach(prod => {
              // if (prod.descuento === null) {
              //   totalOrden = totalOrden + prod.precio;
              // } else {
              //   totalOrden = totalOrden + prod.precio - ((prod.descuento * prod.precio) / 100);
              // }
              titulosProductos.push(prod.titulo);
            });
            if (numOrden !== 0) {
              this.pedidosUsuario.push({
                orden: numOrden,
                prods: titulosProductos,
                total: totalOrden,
                pago: estadoPago,
                envio: estadoEnvio,
                numSeguimiento: numSeguimiento
              });
            }
          });

          if (this.pedidosUsuario.length === 0) {
            this.hayPedidos = false;
            this.cargando = false;
          } else {
            this.hayPedidos = true;
            this.cargando = false;
            setTimeout(() => {
              const tr = document.getElementById('agregarRow');
              const th = document.getElementById('agregarDIB');
              const theadComun = document.querySelector('.thead-light');
        
              function cambiaPantalla(x) {
                if (x.matches) {
                  if (tr) {
                    tr.classList.add('row');
                    th.classList.add('d-inline-block');
                    theadComun.classList.add('w-25');
        
                    try {
                      let thArray = [];
                      const table = document.getElementById('respTable');
                      const headers = table.getElementsByTagName('th');
        
                      for (let i = 0; i < headers.length; i++) {
                        const headingText = headers[i].innerHTML;
                        thArray.push(headingText);
                      }
        
                      console.log(thArray);
                      
                      const styleElm = document.createElement('style');
                      styleElm.classList.add('estiloCreado');
                      let styleSheet;
                      document.head.appendChild(styleElm);
                      styleSheet = styleElm.sheet;
                      for (let i = 0; i < thArray.length; i++) {
                        styleSheet.insertRule(
                          '#' +
                          'respTable' +
                          ' td:nth-child(' +
                          (i + 1) +
                          ')::before {content:"' +
                          thArray[i] +
                          ': ";}',
                          styleSheet.cssRules.length
                        );
                      }
                    } catch (err) {
                      console.log('cellHeaders(): ' + err);
                    }
                  }
                } else {
                  if (tr) {
                    tr.classList.remove('row');
                    th.classList.remove('d-inline-block');
                  }
                }
              }
        
              let x = window.matchMedia("(max-width: 780px)");
              cambiaPantalla(x);
              x.addEventListener('change', cambiaPantalla);
            }, 500);
          }
        // }, 2000);
      });
      // let estadoPagoArray = ['Pagado', 'Pendiente', 'Rechazado', 'Aprobado'];
      // let estadoEnvioArray = ['Por enviar', 'Enviado', 'Recibido'];
      
      // setTimeout(() => {
      //   console.log(todasLasOrdenes);
      //   console.log('als');
        
      //   todasLasOrdenes.forEach(orden => {
      //     let productos = [];
      //     let numOrden = 0;
      //     let estadoPago = '';
      //     let estadoEnvio = '';
      //     let numSeguimiento = '';
      //     let totalOrden = 0;
      //     let titulosProductos = [];
      //     if (orden.user_id == localStorage.getItem("userId")) {
      //       totalOrden = orden.totalOrden;
      //       carritoUsuario.forEach(carrito => {
      //         if (carrito.ordene_id !== null) {
      //           if (orden.id == carrito.ordene_id) {
      //             numOrden = orden.numOrden;
      //             numSeguimiento = orden.numSeguimiento;
      //             if (orden.estadopago_id) {
      //               estadoPagoArray.forEach((estado, index) => {
      //                 if (orden.estadopago_id == (index + 1)) {
      //                   estadoPago = estado;
      //                 }
      //               });
      //             }
      //             if (orden.estadoenvio_id) {
      //               estadoEnvioArray.forEach((estado, index) => {
      //                 if (orden.estadoenvio_id == (index + 1)) {
      //                   estadoEnvio = estado;
      //                 }
      //               });
      //             }
      //             todosLosProductosJson.forEach(prod => {
      //               if (carrito.producto_id == prod.id) {
      //                 productos.push(prod);
      //               }
      //             });
      //           }
      //         }
      //       });
      //     }
      //     productos.forEach(prod => {
      //       // if (prod.descuento === null) {
      //       //   totalOrden = totalOrden + prod.precio;
      //       // } else {
      //       //   totalOrden = totalOrden + prod.precio - ((prod.descuento * prod.precio) / 100);
      //       // }
      //       titulosProductos.push(prod.titulo);
      //     });
      //     if (numOrden !== 0) {
      //       this.pedidosUsuario.push({
      //         orden: numOrden,
      //         prods: titulosProductos,
      //         total: totalOrden,
      //         pago: estadoPago,
      //         envio: estadoEnvio,
      //         numSeguimiento: numSeguimiento
      //       });
      //     }
      //   });

      //   if (this.pedidosUsuario.length === 0) {
      //     this.hayPedidos = false;
      //   } else {
      //     this.hayPedidos = true;
      //   }
      // }, 2000);
    }

    this.activatedRoute.params.subscribe(parametro => {
      this.registroService
        .getUsuario(parametro.id)
        .subscribe((usuario: any) => {
          this.usuario = usuario;

          this.contenido = "Este es tu perfil "+this.usuario.name+", aca podras encontrar la informacion sobre las compras que realizaste en Genoveva, el estado del pago, en numero de orden para poder comunicarte con nostros en caso de cualquier problema, los productos que compraste, el total de la compra y el estado del envio";
          this.productosService.editarMetaHead(this.contenido);

          this.tituloPag = "Hola "+this.usuario.name+" este es tu perfil";
          this.productosService.editarTitulo(this.tituloPag);
        });
    });

  }

  ngOnInit() {

    this.productosService.cargarNoIndex();

    // setTimeout(() => {
    //   const tr = document.getElementById('agregarRow');
    //   const th = document.getElementById('agregarDIB');
    //   const theadComun = document.querySelector('.thead-light');

    //   function cambiaPantalla(x) {
    //     if (x.matches) {
    //       if (tr) {
    //         tr.classList.add('row');
    //         th.classList.add('d-inline-block');
    //         theadComun.classList.add('w-25');

    //         try {
    //           let thArray = [];
    //           const table = document.getElementById('respTable');
    //           const headers = table.getElementsByTagName('th');

    //           for (let i = 0; i < headers.length; i++) {
    //             const headingText = headers[i].innerHTML;
    //             thArray.push(headingText);
    //           }

    //           console.log(thArray);
              
    //           const styleElm = document.createElement('style');
    //           styleElm.classList.add('estiloCreado');
    //           let styleSheet;
    //           document.head.appendChild(styleElm);
    //           styleSheet = styleElm.sheet;
    //           for (let i = 0; i < thArray.length; i++) {
    //             styleSheet.insertRule(
    //               '#' +
    //               'respTable' +
    //               ' td:nth-child(' +
    //               (i + 1) +
    //               ')::before {content:"' +
    //               thArray[i] +
    //               ': ";}',
    //               styleSheet.cssRules.length
    //             );
    //           }
    //         } catch (err) {
    //           console.log('cellHeaders(): ' + err);
    //         }
    //       }
    //     } else {
    //       if (tr) {
    //         tr.classList.remove('row');
    //         th.classList.remove('d-inline-block');
    //       }
    //     }
    //   }

    //   let x = window.matchMedia("(max-width: 780px)");
    //   cambiaPantalla(x);
    //   x.addEventListener('change', cambiaPantalla);
    // }, 1500);

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userId') !== null) {
        if (this.registroService.esAdmin(localStorage.getItem('userId'))) {
          localStorage.setItem('esAdmin', 'Si');
        }
      } else {
        console.error('no esta logueado');
      }

      setTimeout(() => {
        this.mantenimiento = this.productosService.mantenimiento;
        if (this.mantenimiento === 1) {
          this.router.navigate(['/mantenimiento']);
        }
      }, 1000);
    }

    // this.contenido = "Este es tu perfil"+this.usuario.name+", aca podras encontrar la informacion sobre las compras que realizaste en Genoveva, el estado del pago, en numero de orden para poder comunicarte con nostros en caso de cualquier problema, los productos que compraste, el total de la compra y el estado del envio";
    // this.productosService.editarMetaHead(this.contenido);

    // setTimeout(() => {
    //   this.tituloPag = "Hola "+this.usuario.name+" este es tu perfil";
    //   this.productosService.editarTitulo(this.tituloPag);
    // }, 1000);
  }

  cellHeaders(tableId) {
    // try {
    //   let thArray = [];
    //   const table = document.getElementById(tableId);
    //   const tr = document.getElementById('agregarRow');
    //   const th = document.getElementById('agregarDIB');
    //   const headers = table.getElementsByTagName('th');

    //   for (let i = 0; i < headers.length; i++) {
    //     const headingText = headers[i].innerHTML;
    //     thArray.push(headingText);
    //   }
    //   const styleElm = document.createElement('style');
    //   let styleSheet;
    //   document.head.appendChild(styleElm);
    //   styleSheet = styleElm.sheet;
    //   for (let i = 0; i < thArray.length; i++) {
    //     styleSheet.insertRule(
    //       '#' +
    //       tableId +
    //       ' td:nth-child(' +
    //       (i + 1) +
    //       ')::before {content:"' +
    //       thArray[i] +
    //       ': ";}',
    //       styleSheet.cssRules.length
    //     );
    //   }
    // } catch (err) {
    //   console.log('cellHeaders(): ' + err);
    // }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('logueado');
      localStorage.removeItem('userId');
      localStorage.removeItem('esAdmin');
      localStorage.setItem('favoritosUsuario', '');
      localStorage.setItem('carritoDeCompras', '');
    }

    this.registroService.logout();
    this.router.navigateByUrl('/home').then(() => {
      location.reload();
    });
  }

  ngOnDestroy() {
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
    this.productosService.borrarNoIndex();
    // console.log('sale');
    // this.productosService.borrarScript('assets/template/js/active.js');
  }
}