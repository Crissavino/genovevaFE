import Swal from 'sweetalert2';
import { CheckoutService } from './../../../services/checkout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // usuario: UsuarioModel;
  checkout = {
    name: String,
    lastname: String,
    pais_id: "arg",
    direccion1: "",
    direccion2: "",
    cp: "",
    provincia: "",
    ciudad: "",
    telefono: "",
    email: String
  };

  constructor(
    private productosService: ProductosService,
    private registroService: RegistroService,
    private checkoutService: CheckoutService
  ) {
    this.registroService
      .getUsuario(localStorage.getItem("userId"))
      .subscribe((user: any) => {
        // this.usuario = user;
        this.checkout.name = user.name;
        this.checkout.lastname = user.lastname;
        this.checkout.email = user.email;
      });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript("assets/js/nice-select.js");
    }, 100);
  }

  ngOnDestroy() {
    this.productosService.borrarScript("assets/js/nice-select.js");
  }

  onSubmit(formEnvio: NgForm, terminos) {

    if (
      formEnvio.form.controls.name.value === "" ||
      formEnvio.form.controls.lastname.value === "" ||
      formEnvio.form.controls.pais_id.value === "" ||
      formEnvio.form.controls.direccion1.value === "" ||
      formEnvio.form.controls.cp.value === "" ||
      formEnvio.form.controls.provincia.value === "" ||
      formEnvio.form.controls.ciudad.value === "" ||
      formEnvio.form.controls.telefono.value === "" ||
      formEnvio.form.controls.email.value === "" ||
      formEnvio.form.controls.name.value === null ||
      formEnvio.form.controls.lastname.value === null ||
      formEnvio.form.controls.pais_id.value === null ||
      formEnvio.form.controls.direccion1.value === null ||
      formEnvio.form.controls.cp.value === null ||
      formEnvio.form.controls.provincia.value === null ||
      formEnvio.form.controls.ciudad.value === null ||
      formEnvio.form.controls.telefono.value === null ||
      formEnvio.form.controls.email.value === null ||
      terminos.checked === false
    ) {
      if (terminos.checked === false) {
        Swal.fire({
          title: 'Tenes que aceptar los Terminos y Condiciones'
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.name.value === "" ||
        formEnvio.form.controls.name.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.lastname.value === "" ||
        formEnvio.form.controls.lastname.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.pais_id.value === "" ||
        formEnvio.form.controls.pais_id.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.direccion1.value === "" ||
        formEnvio.form.controls.direccion1.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.cp.value === "" ||
        formEnvio.form.controls.cp.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.provincia.value === "" ||
        formEnvio.form.controls.provincia.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.ciudad.value === "" ||
        formEnvio.form.controls.ciudad.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.telefono.value === "" ||
        formEnvio.form.controls.telefono.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }

      if (
        formEnvio.form.controls.email.value === "" ||
        formEnvio.form.controls.email.value === null
      ) {
        Swal.fire({
          title: "Tenes que completar todos los campos"
        }).then(result => {
          if (result) {
            return;
          }
        });
      }
    } else {

      const infoEnvio = {
        name: formEnvio.form.controls.name.value,
        lastname: formEnvio.form.controls.lastname.value,
        pais_id: formEnvio.form.controls.pais_id.value,
        direccion1: formEnvio.form.controls.direccion1.value,
        direccion2: formEnvio.form.controls.direccion2.value,
        cp: formEnvio.form.controls.cp.value,
        provincia: formEnvio.form.controls.provincia.value,
        ciudad: formEnvio.form.controls.ciudad.value,
        telefono: formEnvio.form.controls.telefono.value,
        email: formEnvio.form.controls.email.value,
        userId: localStorage.getItem("userId")
      };

      console.log(infoEnvio);
      this.checkoutService.realizarPedido(infoEnvio).subscribe(res => {
        console.log(res);
        return res;
      });
    }
  }
}
