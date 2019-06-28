import { HeaderComponent } from './../shared/header/header.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  recordarme = false;

  constructor(private productoService: ProductosService, private registroService: RegistroService, private carritoService: CarritoService,
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
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  ngOnDestroy(): void {
    this.productoService.borrarEstilos('assets/registro/css/util.css');
    this.productoService.borrarEstilos('assets/registro/css/main.css');
    this.productoService.borrarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
    this.productoService.borrarEstilos('assets/registro/css/animate.css');
  }

  login(formRegistro: NgForm) {

    if (formRegistro.invalid) {
      return;
    }

    this.registroService.enviarLogin(this.usuario).subscribe( (usuario: any) => {
      if ((usuario)) {
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        localStorage.setItem('userId', usuario.id);
        this.router.navigate(['/perfil', usuario.id]).then( () => {
          // this.carritoService.getCarritoBD(usuario.id);
          location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error de autenticación',
          type: 'error',
          text: 'Ingresaste mal el mail o la contraseña',
        });
      }

    });
  }

}
