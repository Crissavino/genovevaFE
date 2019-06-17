import { HeaderComponent } from './../shared/header/header.component';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  logueadoLogin = false;

  recordarme = false;

  constructor(private productoService: ProductosService, private registroService: RegistroService,
              private router: Router, private activatedRoute: ActivatedRoute) { 

              }

  ngOnInit() {
    this.productoService.cargarEstilos('assets/registro/css/util.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/css/main.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css')
      .then(() => { }).catch(() => { });
    this.productoService.cargarEstilos('assets/registro/css/animate.css')
      .then(() => { }).catch(() => { });
    // this.productoService.cargarScript('assets/template/js/active.js').
    //   then((res) => { }).catch(() => { });
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
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
        this.router.navigate(['/perfil', usuario.id]);
      } else {
        // swal('Contraseña incorrecta');
        Swal.fire({
          title: 'Error de autenticación',
          type: 'error',
          text: 'Ingresaste mal el mail o la contraseña',
        });
        // document.querySelector('.password').value = '';
      }

    });
  }

}
