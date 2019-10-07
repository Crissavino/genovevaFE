import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  reset = {
    email: '',
    respuesta: ''
  };
  coincide: boolean;

  cambiarPass = {
    password: '',
    repassword: ''
  };

  userId;
  mantenimiento;

  noCoinciden = false;

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
      setTimeout(() => {
        this.mantenimiento = this.productoService.mantenimiento;
        if (this.mantenimiento === 1) {
          this.router.navigate(['/mantenimiento']);
        }
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.productoService.borrarEstilos('assets/registro/css/util.css');
    this.productoService.borrarEstilos('assets/registro/css/main.css');
    this.productoService.borrarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
    this.productoService.borrarEstilos('assets/registro/css/animate.css');
  }

  cambiarPassword(formCambioContra: NgForm) {

    if ((formCambioContra.controls.password.value !== formCambioContra.controls.repassword.value)
      || (formCambioContra.controls.password.value === undefined && formCambioContra.controls.repassword.value === undefined)) {
      this.noCoinciden = true;
      return;
    } else {
      this.noCoinciden = false;
    }

    if (formCambioContra.invalid) {
      return;
    }

    const data = {
      id: this.userId,
      pass: formCambioContra.controls.password.value
    };

    let contraCambiada = false;

    this.registroService.cambiarContraseña(data).subscribe( res => {
      console.log(res);
      if (res.user !== null) {
        contraCambiada = true;
        if (contraCambiada) {
          Swal.fire({
            title: 'Contraseña cambiada correctamente'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }
      }
      return res;
    });
  }

  resetPass( formReset: NgForm) {

    if (formReset.invalid) {
      return;
    }

    this.coincide = false;

    this.registroService.getUsuarios().subscribe( (usuarios: any) => {
      usuarios.forEach((user: any) => {
        if (user.email === formReset.controls['email'].value && user.respuesta === formReset.controls['respuesta'].value.toLowerCase()) {
          this.coincide = true;
          this.userId = user.id;
        }
      });
      if (!this.coincide) {
        Swal.fire({
          title: 'La respuesta a la pregunta secreta es incorrecta'
        }).then( () => {
          formReset.reset();
        });
      }

    });
  }
}
