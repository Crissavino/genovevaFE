import { Component, OnInit } from '@angular/core';
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
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

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
    // this.productoService.cargarScript('/assets/template/js/active.js').
    //   then((res) => { }).catch(() => { });
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit(formRegistro: NgForm) {

    if (formRegistro.invalid) {
      return;
    }

    this.registroService.enviarRegistro(this.usuario).subscribe( res => {
      
      this.registroService.enviarLogin(this.usuario).subscribe( (usuario: any) => {
        if (usuario) {
          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          }
          localStorage.setItem('userId', usuario.id);
          this.router.navigate(['/perfil', usuario.id]);
        }
      });
    });
  }

}
