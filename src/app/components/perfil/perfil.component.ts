import { RegistroService } from 'src/app/services/registro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private registroService: RegistroService,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(parametro => {
      this.registroService
        .getUsuario(parametro['id'])
        .subscribe((usuario: any) => {
          this.usuario = usuario;
        });
    });

    console.log( this.carritoService.getCarritoBD(localStorage.getItem('userId')));
    // this.carritoService.getCarritoBD(localStorage.getItem('userId'));
  }

  ngOnInit() {
    // setTimeout(() => {
    //   console.log('entra');
    //   this.productosService.cargarScript('assets/template/js/active.js');
    // }, 1000);
  }

  logout() {
    localStorage.removeItem('logueado');
    localStorage.removeItem('userId');
    // localStorage.removeItem('favoritosUsuario');
    // localStorage.removeItem('carritoDeCompras');
    localStorage.setItem('favoritosUsuario', '');
    localStorage.setItem('carritoDeCompras', '');
    // if (localStorage.getItem('email')) {
    //   localStorage.removeItem('email');
    // }
    this.registroService.logout();
    this.router.navigateByUrl('/home').then(() => {
      location.reload();
    });
  }

  ngOnDestroy() {
    // console.log('sale');
    // this.productosService.borrarScript('assets/template/js/active.js');
  }
}

//  "src/assets/template/js/active.js",
//    "src/assets/template/js/jquery/jquery-2.2.4.min.js",
//    "src/assets/template/js/popper.min.js",
//    "src/assets/template/js/bootstrap.min.js",
//    "src/assets/template/js/plugins.js",
//    "src/assets/template/js/classy-nav.min.js",
//    "src/assets/js/carousel.js",
//    "src/assets/js/nice-select.js";