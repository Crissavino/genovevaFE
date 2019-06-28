import Swal from 'sweetalert2';
import { CheckoutService } from './../../../services/checkout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';
import { NgForm } from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
declare var Mercadopago: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // usuario: UsuarioModel;
  checkout = {
    name: String,
    lastname: String,
    pais_id: 'arg',
    direccion1: '',
    direccion2: '',
    cp: '',
    provincia: '',
    ciudad: '',
    telefono: '',
    email: String
  };

  datosMP = {
    // tarjeta: Number,
    // codSeg: Number,
    // mesV: Number,
    // anoV: Number,
    // nombreCompleto: String,
    // tipoDoc: String,
    // numDoc: Number
    total: 0,
    token: '',
    description: '',
    cuotas: 0,
    emisorTarjeta: '',
    email: ''
  };

  productosCarrito = [];
  subTotal = 0;
  envio = 0;

  oculto = false;

  tipoDocumentos = [];
  cargandoInfoMP = true;
  opcionDoc = '';
  tarjetasCreditoDisponibles: any = [];
  cuotasDisponibles: any = [];
  esPagoConCredito = true;
  tarjetasDebitoDisponibles: any = [];
  esPagoConDebito = false;
  pagoEnEfectivo: any = [];
  esPagoEnEfectivo = false;
  esPagoPorDomicilio = false;

  constructor(
    private productosService: ProductosService,
    private registroService: RegistroService,
    private carritoService: CarritoService,
    private checkoutService: CheckoutService,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroService
      .getUsuario(localStorage.getItem('userId'))
      .subscribe((user: any) => {
        this.checkout.name = user.name;
        this.checkout.lastname = user.lastname;
        this.checkout.email = user.email;
      });

    const todosLosProductosJson = JSON.parse(
      localStorage.getItem('todosLosProductos')
    );

    todosLosProductosJson.forEach(producto => {
      this.carritoService.getCarrito().forEach(carrito => {
        if (producto.id == carrito.productId) {
          this.productosCarrito.push(producto);
          if (!producto.descuento) {
            this.subTotal = this.subTotal + producto.precio;
          } else {
            const descuento = (producto.descuento / 100) * producto.precio;
            this.subTotal = this.subTotal + (producto.precio - descuento);
          }
        }
      });
    });

    // const datos = this.datosMP;
    if (Mercadopago) {
      Mercadopago.setPublishableKey(
        'TEST-0dd0d31e-809e-4bb1-89c7-29742cf40abe'
      );
      Mercadopago.getIdentificationTypes((status, docs) => {
        if (status !== 200) {
          console.error(status);
        } else {
          this.tipoDocumentos = docs;
        }
      });
    } else {
      console.error('No existe Mercadopago');
    }

    // empieza integracion de mercadopago
    setTimeout(() => {
      this.cargandoInfoMP = true;
      // sirve solo para le primero que se muestra (tarjeta de credito)
      const documentosMP: any = this.tipoDocumentos;
      const selectDoc: any = document.querySelector('#docType');
      console.log(selectDoc);
      selectDoc.addEventListener('change', () => {
        console.log(selectDoc.value);
        console.log(documentosMP);
        documentosMP.forEach((doc: any) => {
          console.log(doc.id, selectDoc.value);
          if (doc.id === selectDoc.value) {
            const inputDoc: any = document.querySelector('.' + doc.id);
            this.opcionDoc = selectDoc.value;
            console.log(this.opcionDoc);
            console.log(doc.id);
          } else {
            const inputDoc: any = document.querySelector('.' + doc.id);
          }
        });
      });

      // llamo a todos los medios de pago
      setTimeout(() => {
        const todosLosMediosDePago = JSON.parse(
          localStorage.getItem("mediosDePago")
        );
        todosLosMediosDePago.forEach(medio => {
          if (
            medio.payment_type_id === "credit_card" &&
            medio.status !== "testing"
          ) {
            this.tarjetasCreditoDisponibles.push(medio);
          }
          if (
            medio.payment_type_id === "debit_card" &&
            medio.status !== "testing"
          ) {
            this.tarjetasDebitoDisponibles.push(medio);
          }
          if (
            medio.payment_type_id === "ticket" &&
            medio.status !== "testing"
          ) {
            this.pagoEnEfectivo.push(medio);
          }
        });
      }, 1000);

      setTimeout(() => {
        this.funcionesMercadoPago('.comprarCredito');
      }, 500);
      // const selectDocDebito: any = document.querySelector("#docType");
      // selectDocDebito.addEventListener("change", () => {
      //   documentosMP.forEach((doc: any) => {
      //     if (doc.id === selectDocDebito.value) {
      //       const inputDoc: any = document.querySelector("." + doc.id);
      //       this.opcionDocDebit = selectDocDebito.value;
      //     } else {
      //       const inputDoc: any = document.querySelector("." + doc.id);
      //     }
      //   });
      // });

      // // obtener numero de tarjeta
      // function getBin() {
      //   const numeroTC: any = document.querySelector(
      //     'input[data-checkout="cardNumber"]'
      //   );

      //   return numeroTC.value.replace(/[ .-]/g, '').slice(0, 6);
      // }

      // const usarFunciones = this;
      // // funcion para adivinar el tipo de pago
      // function guessingPaymentMethod(event) {
      //   const bin = getBin();
      //   const amount = usarFunciones.subTotal + usarFunciones.envio;
      //   console.log(bin);
      //   if (event.type == 'keyup') {
      //     if (bin.length >= 6) {
      //       Mercadopago.getPaymentMethod(
      //         {
      //           bin: bin
      //         },
      //         setPaymentMethodInfo
      //       );

      //       Mercadopago.getInstallments(
      //         {
      //           bin: bin,
      //           amount: amount
      //         },
      //         setInstallmentInfo
      //       );
      //     }
      //   } else {
      //     setTimeout(function() {
      //       if (bin.length >= 6) {
      //         Mercadopago.getPaymentMethod(
      //           {
      //             bin: bin
      //           },
      //           setPaymentMethodInfo
      //         );

      //         Mercadopago.getInstallments(
      //           {
      //             bin: bin,
      //             amount: amount
      //           },
      //           setInstallmentInfo
      //         );
      //       }
      //     }, 100);
      //   }
      // }

      // // para pagos en cuotas
      // function setInstallmentInfo(status, response) {
      //   let issuer_id;
      //   let cuotas: any = [];

      //   if (status == 200 || status == 201) {
      //     response.forEach(element => {
      //       if (element.issuer) {
      //         issuer_id = element.issuer.id;
      //       }

      //       if (element.payer_costs) {
      //         element.payer_costs.forEach(costoPagador => {
      //           cuotas.push({
      //             cantidad: costoPagador.installments,
      //             totalConInteres: costoPagador.total_amount,
      //             mensaje: costoPagador.recommended_message
      //           });
      //         });
      //       }
      //     });
      //   } else {
      //     alert(`error: ${response}`);
      //   }

      //   usarFunciones.cuotasDisponibles = cuotas;
      // }

      // let emisorTarjeta = '';
      // function setPaymentMethodInfo(status, response) {
      //   // console.log(response[0].id); // visa master etc
      //   // pone el nombre de la tarjeta en el value, en este caso, visa
      //   if (status == 200) {
      //     const paymentMethodElement: any = document.querySelector(
      //       'input[name=paymentMethodId]'
      //     );

      //     const form: any = document.querySelector('#pay');

      //     if (paymentMethodElement) {
      //       paymentMethodElement.value = response[0].id;
      //       emisorTarjeta = response[0].id;
      //     } else {
      //       const inputEl = document.createElement('input');
      //       inputEl.setAttribute('name', 'paymentMethodId');
      //       inputEl.setAttribute('type', 'hidden');
      //       inputEl.setAttribute('value', response[0].id);
      //       emisorTarjeta = response[0].id;

      //       form.appendChild(inputEl);
      //     }
      //   } else {
      //     alert(`payment method info error: ${response}`);
      //   }
      // }

      // function addEvent(el, eventName, handler) {
      //   if (el.addEventListener) {
      //     el.addEventListener(eventName, handler);
      //   } else {
      //     el.attachEvent('on' + eventName, function() {
      //       handler.call(el);
      //     });
      //   }
      // }

      // addEvent(
      //   document.querySelector('input[data-checkout="cardNumber"]'),
      //   'keyup',
      //   guessingPaymentMethod
      // );
      // addEvent(
      //   document.querySelector('input[data-checkout="cardNumber"]'),
      //   'change',
      //   guessingPaymentMethod
      // );

      // let doSubmit = false;

      // addEvent(document.querySelector(".comprarCredito"), "click", doPay);
      // function doPay(event) {
      //   console.log('entradopay');
      //   event.preventDefault();
      //   if (!doSubmit) {
      //     let $form = document.querySelector('#pay');
      //     Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

      //     return false;
      //   }
      // }

      // function sdkResponseHandler(status, response) {
      //   console.log(status);
      //   console.log(response);
      //   console.log(response.id); // token
      //   console.log('entrasdk');
      //   if (status != 200 && status != 201) {
      //     // alert('verify filled data');
      //     Swal.fire({
      //       title: 'Tenes campos incompletos'
      //     });
      //   } else {
      //     let form: any = document.querySelector('#pay');
      //     let card: any = document.createElement('input');
      //     card.setAttribute('name', 'token');
      //     card.setAttribute('type', 'hidden');
      //     card.setAttribute('value', response.id);
      //     datos.token = response.id;
      //     form.appendChild(card);
      //     doSubmit = true;
      //     const selectCuotas: any = document.querySelector('#cuotas');
      //     datos.cuotas = selectCuotas.value;
      //     datos.description = 'esta es la descripcion';
      //     const email: any = document.querySelector('#email');
      //     datos.email = email.value;
      //     // datos.total = 12;
      //     datos.total = usarFunciones.subTotal + usarFunciones.envio;
      //     datos.emisorTarjeta = emisorTarjeta;
      //     console.log(datos);
      //     usarFunciones.enviarPago(datos).subscribe((res: any) => {
      //       console.log(res);
      //       if (res.estado === 'approved') {
      //         Swal.fire({
      //           title: 'El pago fue aprobado'
      //         }).then( result => {
      //           usarFunciones.router.navigate(['/perfil/', localStorage.getItem('userId')]);
      //         });
      //       }

      //       if (res.estado === 'rejected') {
      //         Swal.fire({
      //           title: 'El pago fue rechazado, proba con otra tarjeta'
      //         });
      //       }

      //       if (res.estado === 'in_process') {
      //         Swal.fire({
      //           title: 'Estamos procesando el pago'
      //         });
      //       }
      //       return res;
      //     });
      //     // console.log(datos);
      //     // form.submit();
      //   }
      // }
    }, 500);
  }

  enviarPago(datos: any) {
    const urlAPI = `http://127.0.0.1:8000/api/pagarMP`;

    const body = JSON.stringify(datos);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(urlAPI, body, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  funcionesMercadoPago(tipoDeCompra) {
    const datos = this.datosMP;
    const usarFunciones = this;
    // obtener numero de tarjeta
    function getBin() {
      const numeroTC: any = document.querySelector(
        'input[data-checkout="cardNumber"]'
      );

      return numeroTC.value.replace(/[ .-]/g, '').slice(0, 6);
    }

    // funcion para adivinar el tipo de pago
    function guessingPaymentMethod(event) {
      const bin = getBin();
      const amount = usarFunciones.subTotal + usarFunciones.envio;
      console.log(bin);
      if (event.type == 'keyup') {
        if (bin.length >= 6) {
          Mercadopago.getPaymentMethod(
            {
              bin
            },
            setPaymentMethodInfo
          );

          Mercadopago.getInstallments(
            {
              bin,
              amount
            },
            setInstallmentInfo
          );
        }
      } else {
        setTimeout(function() {
          if (bin.length >= 6) {
            Mercadopago.getPaymentMethod(
              {
                bin
              },
              setPaymentMethodInfo
            );

            Mercadopago.getInstallments(
              {
                bin,
                amount
              },
              setInstallmentInfo
            );
          }
        }, 100);
      }
    }

    // para pagos en cuotas
    function setInstallmentInfo(status, response) {
      let issuer_id;
      const cuotas: any = [];

      if (status == 200 || status == 201) {
        response.forEach(element => {
          if (element.issuer) {
            issuer_id = element.issuer.id;
          }

          if (element.payer_costs) {
            element.payer_costs.forEach(costoPagador => {
              cuotas.push({
                cantidad: costoPagador.installments,
                totalConInteres: costoPagador.total_amount,
                mensaje: costoPagador.recommended_message
              });
            });
          }
        });
      } else {
        alert(`error: ${response}`);
      }

      usarFunciones.cuotasDisponibles = cuotas;
    }

    let emisorTarjeta = '';
    function setPaymentMethodInfo(status, response) {
      // console.log(response[0].id); // visa master etc
      // pone el nombre de la tarjeta en el value, en este caso, visa
      if (status == 200) {
        const paymentMethodElement: any = document.querySelector(
          'input[name=paymentMethodId]'
        );

        const form: any = document.querySelector('#pay');

        if (paymentMethodElement) {
          paymentMethodElement.value = response[0].id;
          emisorTarjeta = response[0].id;
        } else {
          const inputEl = document.createElement('input');
          inputEl.setAttribute('name', 'paymentMethodId');
          inputEl.setAttribute('type', 'hidden');
          inputEl.setAttribute('value', response[0].id);
          emisorTarjeta = response[0].id;

          form.appendChild(inputEl);
        }
      } else {
        alert(`payment method info error: ${response}`);
      }
    }

    function addEvent(el, eventName, handler) {
      if (el.addEventListener) {
        el.addEventListener(eventName, handler);
      } else {
        el.attachEvent('on' + eventName, function() {
          handler.call(el);
        });
      }
    }

    if (document.querySelector('input[data-checkout="cardNumber"]')) {
      addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
      addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);
    }

    // addEvent(document.querySelector('input[data-checkout="cardNumber"]'),'keyup', guessingPaymentMethod);
    // addEvent(document.querySelector('input[data-checkout="cardNumber"]'),'change', guessingPaymentMethod);

    let doSubmit = false;
    addEvent(document.querySelector(tipoDeCompra), 'click', doPay);
    function doPay(event) {
      console.log('entradopay');
      event.preventDefault();
      if (!doSubmit) {
        const $form = document.querySelector('#pay');
        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

        return false;
      }
    }

    function sdkResponseHandler(status, response) {
      console.log(status);
      console.log(response);
      console.log(response.id); // token
      console.log('entrasdk');
      if (status != 200 && status != 201) {
        // alert('verify filled data');
        Swal.fire({
          title: 'Tenes campos incompletos'
        });
      } else {
        
        if (tipoDeCompra === '.comprarCredito' || tipoDeCompra === '.comprarDebito') {
          console.log("entra");
          const form: any = document.querySelector('#pay');
          const card: any = document.createElement('input');
          card.setAttribute('name', 'token');
          card.setAttribute('type', 'hidden');
          card.setAttribute('value', response.id);
          datos.token = response.id;
          form.appendChild(card);
          doSubmit = true;
          if (document.querySelector('#cuotas')) {
          const selectCuotas: any = document.querySelector('#cuotas');
          datos.cuotas = selectCuotas.value;
          } else {
            datos.cuotas = 1;
          }
          datos.description = 'esta es la descripcion';
          const email: any = document.querySelector('#email');
          datos.email = email.value;
          // datos.total = 12;
          datos.total = usarFunciones.subTotal + usarFunciones.envio;
          datos.emisorTarjeta = emisorTarjeta;
          console.log(datos);
          usarFunciones.enviarPago(datos).subscribe((res: any) => {
            console.log(res);
            if (res.estado === 'approved') {
              Swal.fire({
                title: 'El pago fue aprobado'
              }).then(result => {
                usarFunciones.router.navigate([
                  '/perfil/',
                  localStorage.getItem('userId')
                ]);
              });
            }

            if (res.estado === 'rejected') {
              Swal.fire({
                title: 'El pago fue rechazado, proba con otra tarjeta'
              });
            }

            if (res.estado === 'in_process') {
              Swal.fire({
                title: 'Estamos procesando el pago'
              });
            }
            return res;
          });
          // console.log(datos);
          // form.submit();
        }

        if (tipoDeCompra === '.comprarEfectivo') {
          console.log('entra');
          const form: any = document.querySelector('#pay');
          const card: any = document.createElement('input');
          card.setAttribute('name', 'token');
          card.setAttribute('type', 'hidden');
          card.setAttribute('value', response.id);
          form.appendChild(card);
          doSubmit = true;
          let dataEfectivo = {};
          let medioDePago: any = document.querySelector('#medioPagoEfectivo');
          let email: any = document.querySelector('#email');
          dataEfectivo = {
            metodo: medioDePago.value,
            email: email.value,
            total: usarFunciones.subTotal + usarFunciones.envio,
            descripcion: 'Genoveva Shop Online'
          };
          console.log(dataEfectivo);
          usarFunciones.enviarPago(dataEfectivo).subscribe((res: any) => {
            console.log(res);
            if (res.estado === "pending") {
              Swal.fire({
                title: "Se te abrirá una ventana para que puedas imprimir o descargar el tiquet de pago"
              }).then(result => {
                window.open(res.recursoExterno, "_blank");
              });
            }
            return res;
          });
        }

        if (tipoDeCompra === '.comprarPorDomicilio') {

        }
      }
    }
  }

  ngOnInit() {
    // borro los campos si selecciono otro medio de pago y muestro el boton de pago de acuerdo a opcion desplegada
    setTimeout(() => {
      const mediosDePago = document.querySelectorAll('.medioDePago');
      const tarjetaCredito = document.querySelector('.tarjetaCredito');
      const tarjetaDebito = document.querySelector('.tarjetaDebito');
      const efectivo = document.querySelector('.efectivo');
      const domicilio = document.querySelector('.domicilio');
      mediosDePago.forEach(caja => {
        caja.addEventListener('click', () => {
          setTimeout(() => {
            if (tarjetaCredito) {
              if (!tarjetaCredito.classList.contains('show')) {
                // oculto Tarjeta de credito
                this.esPagoConCredito = false;
                // this.esPagoConDebito = false;
                // this.esPagoEnEfectivo = false;
                // this.esPagoPorDomicilio = false;
                const todosLosInput = tarjetaCredito.getElementsByTagName(
                  'input'
                );
                const todosLosSelect = tarjetaCredito.getElementsByTagName(
                  'select'
                );
                for (let i = 0; i < todosLosInput.length; i++) {
                  const input: any = todosLosInput[i];
                  input.value = '';
                }
                for (let i = 0; i < todosLosSelect.length; i++) {
                  const select = todosLosSelect[i];
                  select.value = '';
                  this.opcionDoc = '';
                }
              } else {
                // se muestra pago por tarjeta de credito
                setTimeout(() => {
                  const documentosMP: any = this.tipoDocumentos;
                  const selectDoc: any = document.querySelector('#docType');
                  console.log(selectDoc);
                  selectDoc.addEventListener('change', () => {
                    documentosMP.forEach((doc: any) => {
                      if (doc.id === selectDoc.value) {
                        const inputDoc: any = document.querySelector('.' + doc.id);
                        this.opcionDoc = selectDoc.value;
                      } else {
                        const inputDoc: any = document.querySelector('.' + doc.id);
                      }
                    });
                  });

                  this.funcionesMercadoPago('.comprarCredito');
                }, 500);
                this.opcionDoc = '';
                this.esPagoConCredito = true;
                this.esPagoConDebito = false;
                this.esPagoEnEfectivo = false;
                this.esPagoPorDomicilio = false;
              }
            }

            if (tarjetaDebito) {
              if (!tarjetaDebito.classList.contains('show')) {
                this.esPagoConDebito = false;

                const todosLosInput = tarjetaDebito.getElementsByTagName(
                  'input'
                );
                const todosLosSelect = tarjetaDebito.getElementsByTagName(
                  'select'
                );

                for (let i = 0; i < todosLosInput.length; i++) {
                  const input: any = todosLosInput[i];
                  input.value = '';
                }
                for (let i = 0; i < todosLosSelect.length; i++) {
                  const select = todosLosSelect[i];
                  select.value = '';
                  this.opcionDoc = '';
                }
              } else {
                setTimeout(() => {
                  const documentosMP: any = this.tipoDocumentos;
                  const selectDoc: any = document.querySelector('#docType');
                  console.log(selectDoc);
                  selectDoc.addEventListener('change', () => {
                    documentosMP.forEach((doc: any) => {
                      if (doc.id === selectDoc.value) {
                        const inputDoc: any = document.querySelector('.' + doc.id);
                        this.opcionDoc = selectDoc.value;
                      } else {
                        const inputDoc: any = document.querySelector('.' + doc.id);
                      }
                    });
                  });

                  this.funcionesMercadoPago('.comprarDebito');
                }, 500);
                this.opcionDoc = '';
                this.esPagoConCredito = false;
                this.esPagoConDebito = true;
                this.esPagoEnEfectivo = false;
                this.esPagoPorDomicilio = false;
              }
            }

            if (efectivo) {
              if (!efectivo.classList.contains('show')) {
                // this.esPagoConCredito = false;
                // this.esPagoConDebito = false;
                this.esPagoEnEfectivo = false;
                const todosLosInput = tarjetaDebito.getElementsByTagName('input');

                for (let i = 0; i < todosLosInput.length; i++) {
                  const input: any = todosLosInput[i];
                  input.value = '';
                }
              } else {
                setTimeout(() => {
                  this.funcionesMercadoPago('.comprarEfectivo');
                }, 500);
                console.log('se ve efectivo');
                this.esPagoConCredito = false;
                this.esPagoConDebito = false;
                this.esPagoEnEfectivo = true;
                this.esPagoPorDomicilio = false;
              }
            }

            if (domicilio) {
              if (!domicilio.classList.contains('show')) {
                console.log('no se ve domicilio');
                // this.esPagoConCredito = false;
                // this.esPagoConDebito = false;
                // this.esPagoEnEfectivo = false;
                this.esPagoPorDomicilio = false;
                // const todosLosInput = tarjetaCredito.getElementsByTagName(
                //   "input"
                // );
                // const todosLosSelect = tarjetaCredito.getElementsByTagName(
                //   "select"
                // );
                // for (let i = 0; i < todosLosInput.length; i++) {
                //   const input: any = todosLosInput[i];
                //   input.value = "";
                // }
                // for (let i = 0; i < todosLosSelect.length; i++) {
                //   const select = todosLosSelect[i];
                //   select.value = "";
                // }
              } else {
                console.log('se ve domicilio');
                this.esPagoConCredito = false;
                this.esPagoConDebito = false;
                this.esPagoEnEfectivo = false;
                this.esPagoPorDomicilio = true;
              }
            }
          }, 500);
        });
      });
    }, 500);
  }

  ngOnDestroy() {}

  validacionPago(tarjeta, codSeg, mesV, anoV, nombreCompleto, tipoDoc, numDoc) {
    // if (tarjeta.value === '' || codSeg.value === '' ||
    //   mesV.value === '' || anoV.value === '' ||nombreCompleto.value === '' || tipoDoc.value === null ||
    //   numDoc.value === '' || tarjeta.value === null ||codSeg.value === null || mesV.value === null ||
    //   anoV.value === null || nombreCompleto.value === null ||tipoDoc.value === null || numDoc.value === null)
    // {
    //   if (tarjeta.value === '' || tarjeta.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (codSeg.value === '' || codSeg.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (mesV.value === '' || mesV.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (anoV.value === '' || anoV.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (nombreCompleto.value === '' || nombreCompleto.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (tipoDoc.value === '' || tipoDoc.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (numDoc.value === '' || numDoc.value === null) {
    //     Swal.fire({
    //       title:
    //         'Tenes que completar todos los campos para que podamos procesar el pago'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    // }
  }

  enviarPagarPedido(
    tarjeta,
    codSeg,
    mesV,
    anoV,
    nombreCompleto,
    tipoDoc,
    numDoc,
    formEnvio: NgForm,
    terminos,
    datosParaPagar
  ) {
    // if (
    //   formEnvio.form.controls.name.value === '' ||
    //   formEnvio.form.controls.lastname.value === '' ||
    //   formEnvio.form.controls.pais_id.value === '' ||
    //   formEnvio.form.controls.direccion1.value === '' ||
    //   formEnvio.form.controls.cp.value === '' ||
    //   formEnvio.form.controls.provincia.value === '' ||
    //   formEnvio.form.controls.ciudad.value === '' ||
    //   formEnvio.form.controls.telefono.value === '' ||
    //   formEnvio.form.controls.email.value === '' ||
    //   formEnvio.form.controls.name.value === null ||
    //   formEnvio.form.controls.lastname.value === null ||
    //   formEnvio.form.controls.pais_id.value === null ||
    //   formEnvio.form.controls.direccion1.value === null ||
    //   formEnvio.form.controls.cp.value === null ||
    //   formEnvio.form.controls.provincia.value === null ||
    //   formEnvio.form.controls.ciudad.value === null ||
    //   formEnvio.form.controls.telefono.value === null ||
    //   formEnvio.form.controls.email.value === null ||
    //   terminos.checked === false
    // ) {
    //   if (terminos.checked === false) {
    //     Swal.fire({
    //       title: 'Tenes que aceptar los Terminos y Condiciones'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.name.value === '' ||
    //     formEnvio.form.controls.name.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.lastname.value === '' ||
    //     formEnvio.form.controls.lastname.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.pais_id.value === '' ||
    //     formEnvio.form.controls.pais_id.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.direccion1.value === '' ||
    //     formEnvio.form.controls.direccion1.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.cp.value === '' ||
    //     formEnvio.form.controls.cp.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.provincia.value === '' ||
    //     formEnvio.form.controls.provincia.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.ciudad.value === '' ||
    //     formEnvio.form.controls.ciudad.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.telefono.value === '' ||
    //     formEnvio.form.controls.telefono.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    //   if (
    //     formEnvio.form.controls.email.value === '' ||
    //     formEnvio.form.controls.email.value === null
    //   ) {
    //     Swal.fire({
    //       title: 'Tenes que completar todos los campos'
    //     }).then(result => {
    //       if (result) {
    //         return;
    //       }
    //     });
    //   }
    // } else {
    //   if (
    //     tarjeta.value === '' ||
    //     codSeg.value === '' ||
    //     mesV.value === '' ||
    //     anoV.value === '' ||
    //     nombreCompleto.value === '' ||
    //     tipoDoc.value === null ||
    //     numDoc.value === '' ||
    //     tarjeta.value === null ||
    //     codSeg.value === null ||
    //     mesV.value === null ||
    //     anoV.value === null ||
    //     nombreCompleto.value === null ||
    //     tipoDoc.value === null ||
    //     numDoc.value === null ||
    //     numDoc.value === undefined
    //   ) {
    //     if (tarjeta.value === '' || tarjeta.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (codSeg.value === '' || codSeg.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (mesV.value === '' || mesV.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (anoV.value === '' || anoV.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (
    //       nombreCompleto.value === '' ||
    //       nombreCompleto.value === null
    //     ) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (tipoDoc.value === '' || tipoDoc.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //     if (numDoc.value === '' || numDoc.value === null) {
    //       Swal.fire({
    //         title:
    //           'Tenes que completar todos los campos para que podamos procesar el pago'
    //       }).then(result => {
    //         if (result) {
    //           return;
    //         }
    //       });
    //     }
    //   } else {
    //     const infoEnvio = {
    //       name: formEnvio.form.controls.name.value,
    //       lastname: formEnvio.form.controls.lastname.value,
    //       pais_id: formEnvio.form.controls.pais_id.value,
    //       direccion1: formEnvio.form.controls.direccion1.value,
    //       direccion2: formEnvio.form.controls.direccion2.value,
    //       cp: formEnvio.form.controls.cp.value,
    //       provincia: formEnvio.form.controls.provincia.value,
    //       ciudad: formEnvio.form.controls.ciudad.value,
    //       telefono: formEnvio.form.controls.telefono.value,
    //       email: formEnvio.form.controls.email.value,
    //       userId: localStorage.getItem('userId')
    //     };
    //     // realiza el pedido
    //     this.checkoutService.realizarPedido(infoEnvio).subscribe(res => {
    //       return res;
    //     });
    //   }
    // }
  }
}
