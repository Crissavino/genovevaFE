import Swal from 'sweetalert2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  noCoinciden = false;

  constructor(private productoService: ProductosService, private registroService: RegistroService, private router: Router) { }

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

  onSubmit(formRegistro: NgForm) {

    if ( (formRegistro.controls.password.value !== formRegistro.controls.repassword.value)
         || (formRegistro.controls.password.value === undefined && formRegistro.controls.repassword.value === undefined)) {
          this.noCoinciden = true;
          return;
    } else {
          this.noCoinciden = false;
    }

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

    this.registroService.enviarRegistro(this.usuario).subscribe( res => {

      this.registroService.enviarLogin(this.usuario).subscribe( (usuario: any) => {
        if (usuario) {
          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          }
          localStorage.setItem('userId', usuario.id);
          this.router.navigate(['/perfil', usuario.id]).then( () => {
            location.reload();
          });
        }
      });
    }, error => {
      console.error(error.error.message);
      if (error.error.message) {
        let mensaje = error.error.message;
        if (mensaje.includes('Duplicate entry')) {
          Swal.fire(
            {
              title: 'Este mail ya corresponde a un usuario registrado'
            }
          );
        } else {
          return;
        }
      }
    });
  }

}
