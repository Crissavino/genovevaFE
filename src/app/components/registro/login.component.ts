import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';
import { ProductosService } from 'src/app/services/productos.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: UsuarioModel = new UsuarioModel();
  logueadoLogin = false;
  contenido = "";
  tituloPag = "";

  recordarme = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productoService: ProductosService, private registroService: RegistroService, private carritoService: CarritoService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productoService.cargarEstilos('assets/registro/css/util.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/css/main.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/css/animate.css')
      .then(() => { }).catch(() => { });
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('email')) {
        this.usuario.email = localStorage.getItem('email');
        this.recordarme = true;
      }
    }

    this.contenido = "Aca es donde vas a poder loguearte para poder comprar en genoveva shop online, recorda que es necesario que tengas un usuario para poder comprar y guardar en favoritos todos los productos que desees"
    this.productoService.editarMetaHead(this.contenido);

    this.tituloPag = "Logueate";
    this.productoService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy(): void {
    this.productoService.borrarEstilos('assets/registro/css/util.css');
    this.productoService.borrarEstilos('assets/registro/css/main.css');
    this.productoService.borrarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
    this.productoService.borrarEstilos('assets/registro/css/animate.css');
    this.productoService.reiniciarMetaHead(this.contenido);
    this.productoService.reiniciarTitulo(this.tituloPag);
  }

  login(formRegistro: NgForm) {

    if (formRegistro.invalid) {
      return;
    }
    Swal.fire({
      title: 'Cargando',
      timer: 3000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    this.registroService.enviarLogin(this.usuario).subscribe( (usuario: any) => {
      if (isPlatformBrowser(this.platformId)) {
        if ((usuario)) {
          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          }
          localStorage.setItem('userId', usuario.id);
          this.router.navigate(['/perfil', usuario.id]).then( () => {
            location.reload();
            // this.carritoService.getCarritoBD(usuario.id);
          });
        } else {
          Swal.fire({
            title: 'Error de autenticación',
            type: 'error',
            text: 'Ingresaste mal el mail o la contraseña',
          });
        }
      }

    });
  }

  resetearPassword() {
    this.router.navigate(['/reset']);
  }

}
