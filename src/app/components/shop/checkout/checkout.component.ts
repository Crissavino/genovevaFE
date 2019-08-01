import Swal from 'sweetalert2';
import { CheckoutService } from './../../../services/checkout.service';
import { Component, OnInit, OnDestroy, DoCheck, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class CheckoutComponent implements OnInit, OnDestroy, DoCheck {
  checkout = {
    name: '',
    lastname: '',
    pais_id: '',
    calle: '',
    numero: 0,
    cp: '',
    provincia: '',
    ciudad: '',
    telefono: '',
    email: '',
    user_id: '',
    totalOrden: 0,
    prods: []
  };

  datosMP = {
    total: 0,
    token: '',
    description: '',
    cuotas: 0,
    emisorTarjeta: '',
    email: '',
    calle: '',
    numero: 0,
    cp: '',
    provincia: '',
    ciudad: ''
  };

  productosCarrito = [];
  subTotal = 0;
  envio = {
    costo: 0,
    entrega: '',
    laplata: 50
  };

  oculto = false;
  contenido = "";
  tituloPag = "";

  tipoDocumentos = [];
  cargandoInfoMP = true;
  opcionDoc = '';
  tarjetasCreditoDisponibles: any = [];
  cuotasDisponibles: any = [];
  esPagoConCredito = false;
  tarjetasDebitoDisponibles: any = [];
  esPagoConDebito = false;
  pagoEnEfectivo: any = [];
  esPagoEnEfectivo = false;
  esPagoPorDomicilio = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productosService: ProductosService,
    private registroService: RegistroService,
    private carritoService: CarritoService,
    private checkoutService: CheckoutService,
    private http: HttpClient,
    private router: Router
  ) {
    
    if (isPlatformBrowser(this.platformId)) {
      this.registroService
      .getUsuario(localStorage.getItem('userId'))
      .subscribe((user: any) => {
        this.checkout.name = user.name;
        this.checkout.lastname = user.lastname;
        this.checkout.email = user.email;
      });
    }

    let carritos: any;
    carritos = this.carritoService.getCarrito();

    setTimeout(() => {
      if (Mercadopago) {
        Mercadopago.setPublishableKey(
          'APP_USR-e5f44d7a-86b1-429f-8fbd-6c9c231dfae9'
          // 'TEST-0dd0d31e-809e-4bb1-89c7-29742cf40abe'
        );
        Mercadopago.getIdentificationTypes((status, docs) => {
          if (status !== 200) {
            console.error(status, 'error');
          } else {
            this.tipoDocumentos = docs;
          }
        });
      } else {
        console.error('No existe Mercadopago');
      }
    }, 500);

    // empieza integracion de mercadopago
    setTimeout(() => {
      this.cargandoInfoMP = true;

      // llamo a todos los medios de pago
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          const todosLosMediosDePago = JSON.parse(
            localStorage.getItem('mediosDePago')
          );
          todosLosMediosDePago.forEach(medio => {
            if (
              medio.payment_type_id === 'credit_card' &&
              medio.status !== 'testing'
            ) {
              this.tarjetasCreditoDisponibles.push(medio);
            }
            if (
              medio.payment_type_id === 'debit_card' &&
              medio.status !== 'testing'
            ) {
              this.tarjetasDebitoDisponibles.push(medio);
            }
            if (
              medio.payment_type_id === 'ticket' &&
              medio.status !== 'testing'
            ) {
              this.pagoEnEfectivo.push(medio);
            }
          });
        }
      }, 1000);

    }, 1000);
  }

  calcularEnvio(zipCode) {
    const dimensions = '30x30x30';
    const peso = '800';
    const zip_code = zipCode.value;
    const item_price = this.subTotal;
    let urlAPI = "https://genovevabe.cf/api";
    // let urlAPI = "http://127.0.0.1:8000/api";

    const url = `${urlAPI}/calcularenvio/${dimensions}/${peso}/${zip_code}/${item_price}`;
    // const url = `${urlAPI}/${dimensions}/${peso}/${zip_code}/${item_price}`;

    this.http.get(url).pipe().subscribe((res: any) => {
      console.log(res);
      
      if (res.body.message) {
        if (res.body.message.includes('Invalid')) {
          Swal.fire({
            title: 'No existe ese Código Postal'
          }).then( () => {
            zipCode.value = '';
          });
          this.envio.costo = 0;
          this.envio.entrega = '';
        }
      } else {
        this.envio.costo = res.body.options[0].cost;
        this.envio.entrega = res.body.options[0].estimated_delivery_time.shipping + ' horas';
        return res;
      }
    });

  }

  enviarPago(datos: any) {
    let urlAPI = "https://genovevabe.cf/api";
    // let urlAPI = "http://127.0.0.1:8000/api";
    const url = `${urlAPI}/pagarMP`;

    const body = JSON.stringify(datos);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  funcionesMercadoPago(tipoDeCompra, dentroCasco?) {
    let datos = this.datosMP;
    let infoEnvio = this.checkout;
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
      let amount;
      if (dentroCasco.checked) {
        amount = usarFunciones.subTotal + usarFunciones.envio.laplata;
      } else {
        amount = usarFunciones.subTotal + usarFunciones.envio.costo;
      }
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
      // pone el nombre de la tarjeta en el value
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
      addEvent(
        document.querySelector('input[data-checkout="cardNumber"]'),
        'keyup',
        guessingPaymentMethod
      );
      addEvent(
        document.querySelector('input[data-checkout="cardNumber"]'),
        'change',
        guessingPaymentMethod
      );
    }

    // addEvent(document.querySelector('input[data-checkout="cardNumber"]'),'keyup', guessingPaymentMethod);
    // addEvent(document.querySelector('input[data-checkout="cardNumber"]'),'change', guessingPaymentMethod);

    let doSubmit = false;
    addEvent(document.querySelector(tipoDeCompra), 'click', doPay);
    function doPay(event) {
      event.preventDefault();
      if (!doSubmit) {
        const $form = document.querySelector('#pay');
        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

        return false;
      }
    }

    function sdkResponseHandler(status, response) {
      // console.log(status);
      // console.log(response);
      // console.log(response.id); // token
      if (status != 200 && status != 201) {
        // alert('verify filled data');
        Swal.fire({
          title: 'Hubo un problema al procesar el pago'
        });
      } else {
        // aca debe ir la validacion de los campos del envio
        let checkTerm = true;
        let noHayVacios = true;
        let term: any = document.querySelector('.terminos');
        if (term.checked === false) {
          checkTerm = false;
        }
        let form: any = document.querySelectorAll('.validate');
        for (const campo in form) {
          if (form.hasOwnProperty(campo)) {
            const element = form[campo];
            if (element.value === '' || element.value === null || element.value == 0) {
              noHayVacios = false;
            }
          }
        }
        if (noHayVacios === false || checkTerm === false) {
          if (checkTerm === false) {
            Swal.fire({
              title: 'Tenes que aceptar los Terminos y Condiciones'
            }).then(result => {
              if (result) {
                return;
              }
            });
          }
          if (noHayVacios === false) {
            Swal.fire({
              title: 'Tenes que completar todos los campos'
            }).then(result => {
              if (result) {
                return;
              }
            });
          }
        } else {
          if (
            tipoDeCompra === '.comprarCredito' ||
            tipoDeCompra === '.comprarDebito'
          ) {

            let noHayVacios = true;
            let formTarjeta: any = document.querySelectorAll('.validateCard');

            for (const campo in formTarjeta) {
              if (formTarjeta.hasOwnProperty(campo)) {
                const element = formTarjeta[campo];
                if (element.value === '' || element.value === null) {
                  noHayVacios = false;
                }
              }
            }

            if (noHayVacios === false) {
              Swal.fire({
                title: 'Tenes que completar todos los campos'
              }).then(result => {
                if (result) {
                  return;
                }
              });
            } else {
              Swal.fire({
                title: 'Estamos procesando tu pago',
                timer: 3000,
                onBeforeOpen: () => {
                  Swal.showLoading();
                }
              });
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
              datos.description = 'Genoveva Shop Online';
              const email: any = document.querySelector('#email');
              datos.email = email.value;
              // datos.total = 12;
              let totalFinal;
              if (dentroCasco.checked) {
                totalFinal = usarFunciones.subTotal + usarFunciones.envio.laplata;
              } else {
                totalFinal = usarFunciones.subTotal + usarFunciones.envio.costo;
              }
              let formEnvio: any = document.querySelectorAll('.validate');
              datos.total = totalFinal;
              datos.emisorTarjeta = emisorTarjeta;
              datos.calle = formEnvio[6].value;
              datos.numero = formEnvio[7].value;
              datos.cp = formEnvio[5].value;
              datos.provincia = formEnvio[4].value;
              datos.ciudad = formEnvio[3].value;
              let prodsIdsTalles = [];
              // let prodsIds = [];
              let prods = [{
                id: 0,
                titulo: ''
              }];
              let carritos = usarFunciones.carritoService.getCarrito();
              carritos.forEach(prodCarrito => {
                prodsIdsTalles.push({
                  id: prodCarrito.productId,
                  talle_id: prodCarrito.talle_id
                });
              });
              usarFunciones.productosCarrito.forEach(producto => {
                // prodsIds.push(producto.id);
                prods.push({
                  id: producto.id,
                  titulo: producto.titulo
                });
              });
              console.log(prodsIdsTalles);
              let usuarioId;
              
              if (isPlatformBrowser(usarFunciones.platformId)) {
                usuarioId = localStorage.getItem('userId')
              }
              infoEnvio = {
                prods: prodsIdsTalles,
                // name: formEnvio.form.controls.name.value,
                name: formEnvio[0].value,
                user_id: usuarioId,
                lastname: formEnvio[1].value,
                // lastname: formEnvio.form.controls.lastname.value,
                pais_id: formEnvio[2].value,
                // direccion1: formEnvio[6].value,
                calle: formEnvio[6].value,
                numero: formEnvio[7].value,
                // direccion2: formEnvio.form.controls.direccion2.value,
                cp: formEnvio[5].value,
                // cp: formEnvio.form.controls.cp.value,
                provincia: formEnvio[4].value,
                // provincia: formEnvio.form.controls.provincia.value,
                ciudad: formEnvio[3].value,
                // ciudad: formEnvio.form.controls.ciudad.value,
                telefono: formEnvio[8].value,
                // telefono: formEnvio.form.controls.telefono.value,
                email: formEnvio[9].value,
                totalOrden: datos.total,
                // email: formEnvio.form.controls.email.value,
              };

              usarFunciones.checkoutService.realizarPedido(infoEnvio).subscribe((respuesta: any) => {
                if (respuesta.noStock) {
                  let titulo = '';
                  let talle = '';
                  prods.forEach((prod: any) => {
                    if (prod.id == respuesta.noStock) {
                      titulo = prod.titulo;
                      talle = respuesta.talle;
                    }
                  });
                  Swal.fire({
                    title: 'Se acaba de agotar',
                    text: 'No hay stock de: ' + titulo + ' - Talle: ' + talle + '. \n\n Si estas comprando mas de 1 probá con otra cantidad'
                  }).then(() => {
                    location.reload();
                    return;
                  });
                } else {
                  usarFunciones.enviarPago(datos).subscribe((res: any) => {

                    if (res.estado === 'approved') {
                      Swal.fire({
                        title: 'El pago fue aprobado'
                      }).then(result => {
                        // usarFunciones.router.navigate(['/perfil/', localStorage.getItem('userId')]).then(() => {
                        usarFunciones.router.navigate(['/perfil/', usuarioId]).then(() => {
                          location.reload();
                        });
                      });
                    }

                    if (res.estado === 'rejected') {
                      Swal.fire({
                        title:
                          'El pago fue rechazado, proba con otra tarjeta'
                      });
                      let info = {
                        prods: infoEnvio.prods
                      };
                      console.log(info);
                      usarFunciones.checkoutService.acomodarStock(info).subscribe( res => {
                        console.log(res);
                      });
                      // usarFunciones.checkoutService.borrarPedido(localStorage.getItem('userId')).subscribe( res => {
                      usarFunciones.checkoutService.borrarPedido(usuarioId).subscribe( res => {
                        console.log(res);
                        setTimeout(() => {
                          location.reload();
                        }, 2000);
                      });
                    }

                    if (res.estado === 'in_process') {
                      Swal.fire({
                        title: 'Estamos procesando el pago'
                      });
                    }

                    return res;
                  });
                }
              });
            }
          }

          if (tipoDeCompra === '.comprarEfectivo') {
            let mail: any = document.querySelector('.mailEfectivo');
            if (mail.value === '' || mail.value === null) {
              Swal.fire({
                title: 'El mail es obligatorio',
              });
              return;
            }
            let medioPago: any = document.querySelector('#medioPagoEfectivo');
            if (medioPago.value === '' || medioPago.value === null) {
              Swal.fire({
                title: 'Tenes que seleccionar una empresa',
              });
              return;
            }
            Swal.fire({
              title: 'Estamos procesando tu pago',
              timer: 3000,
              onBeforeOpen: () => {
                Swal.showLoading();
              }
            });
            const form: any = document.querySelector('#pay');
            const card: any = document.createElement('input');
            card.setAttribute('name', 'token');
            card.setAttribute('type', 'hidden');
            card.setAttribute('value', response.id);
            form.appendChild(card);
            doSubmit = true;
            let dataEfectivo: any = {};
            let medioDePago: any = document.querySelector('#medioPagoEfectivo');
            let email: any = document.querySelector('#email');
            let formEnvio: any = document.querySelectorAll('.validate');
            console.log(formEnvio);
            let totalFinal;
            if (dentroCasco.checked) {
              totalFinal = usarFunciones.subTotal + usarFunciones.envio.laplata;
            } else {
              totalFinal = usarFunciones.subTotal + usarFunciones.envio.costo;
            }
            dataEfectivo = {
              metodo: medioDePago.value,
              email: email.value,
              total: totalFinal,
              descripcion: 'Genoveva Shop Online',
              calle: formEnvio[6].value,
              numero: formEnvio[7].value,
              cp: formEnvio[5].value,
              provincia: formEnvio[4].value,
              ciudad: formEnvio[3].value,
            };
            let prodsIdsTalles = [];
            // let prodsIds = [];
            let prods = [{
              id: 0,
              titulo: ''
            }];
            let carritos = usarFunciones.carritoService.getCarrito();
            carritos.forEach(prodCarrito => {
              prodsIdsTalles.push({
                id: prodCarrito.productId,
                talle_id: prodCarrito.talle_id
              });
            });
            usarFunciones.productosCarrito.forEach(producto => {
              // prodsIds.push(producto.id);
              prods.push({
                id: producto.id,
                titulo: producto.titulo
              });
            });
            console.log(prodsIdsTalles);
            let usuarioId = '';
            if (isPlatformBrowser(usarFunciones.platformId)) {
              usuarioId = localStorage.getItem('userId')
            }
            infoEnvio = {
              // productosIds: prodsIds,
              prods: prodsIdsTalles,
              // name: formEnvio.form.controls.name.value,
              name: formEnvio[0].value,
              user_id: usuarioId,
              lastname: formEnvio[1].value,
              // lastname: formEnvio.form.controls.lastname.value,
              pais_id: formEnvio[2].value,
              // direccion1: formEnvio[6].value,
              calle: formEnvio[6].value,
              numero: formEnvio[7].value,
              // direccion2: formEnvio.form.controls.direccion2.value,
              cp: formEnvio[5].value,
              // cp: formEnvio.form.controls.cp.value,
              provincia: formEnvio[4].value,
              // provincia: formEnvio.form.controls.provincia.value,
              ciudad: formEnvio[3].value,
              // ciudad: formEnvio.form.controls.ciudad.value,
              telefono: formEnvio[8].value,
              // telefono: formEnvio.form.controls.telefono.value,
              email: formEnvio[9].value,
              totalOrden: dataEfectivo.total,
              // email: formEnvio.form.controls.email.value,
            };
            console.log(infoEnvio);

            usarFunciones.checkoutService.realizarPedido(infoEnvio).subscribe((respuesta: any) => {
              if (respuesta.noStock) {
                let titulo = '';
                let talle = '';
                prods.forEach((prod: any) => {
                  if (prod.id == respuesta.noStock) {
                    titulo = prod.titulo;
                    talle = respuesta.talle;
                  }
                });
                Swal.fire({
                  title: 'Se acaba de agotar',
                  text: 'No hay stock de: ' + titulo + ' - Talle: ' + talle + '. \n\n Si estas comprando mas de 1 probá con otra cantidad'
                }).then(() => {
                  location.reload();
                  return;
                });
              } else {
                usarFunciones.enviarPago(dataEfectivo).subscribe((res: any) => {
                  console.log(res);
                  if (res.estado === 'pending') {
                    Swal.fire({
                      title:
                        'Se te abrirá una ventana para que puedas imprimir o descargar el tiquet de pago'
                    }).then(result => {
                      window.open(res.recursoExterno, '_blank');
                      usarFunciones.checkoutService.realizarPedido(infoEnvio).subscribe(respuesta => {
                        console.log(respuesta);
                        return respuesta;
                      });
                      // usarFunciones.router.navigate(['/perfil/', localStorage.getItem('userId')]).then(() => {
                      usarFunciones.router.navigate(['/perfil/', usuarioId]).then(() => {
                        location.reload();
                      });
                    });
                  }
                  return res;
                }, (error: any) => {
                  console.log(error);
                  if (error) {
                    Swal.fire({
                      title: 'Hubo un error a la hora de procesar el pago'
                    });
                    let info = {
                      prods: infoEnvio.prods
                    };
                    console.log(info);
                    usarFunciones.checkoutService.acomodarStock(info).subscribe( res => {
                      console.log(res);
                    });
                    usarFunciones.checkoutService.borrarPedido(usuarioId).subscribe( res => {
                      console.log(res);
                      setTimeout(() => {
                        location.reload();
                      }, 2000);
                    });
                  }
                });
              }
            });
          }
        }
      }
    }
  }

  validarFormEnvio() {
    let noHayVacios = true;
    let term: any = document.querySelector('.terminos');
    if (term.checked === false) {
      Swal.fire({
        title: 'Tenes que aceptar los Terminos y Condiciones'
      }).then(result => {
        if (result) {
          noHayVacios = false;
          return;
        }
      });
    }
    let form: any = document.querySelectorAll('.validate');
    for (const campo in form) {
      if (form.hasOwnProperty(campo)) {
        const element = form[campo];
        if (element.value === '' || element.value === null) {
          Swal.fire({
            title: 'Tenes que completar todos los campos'
          }).then(result => {
            if (result) {
              noHayVacios = false;
              return;
            }
          });
        }
      }
    }
    return noHayVacios;
  }

  ngOnInit() {
    Swal.fire({
      title: "Las opciones de pago son ofrecidas por Mercado Pago " + '&reg;',
      type: "info"
    });
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
                let dentroCasco: any = document.querySelector('#dentroCasco');
                let cp: any = document.querySelector('#postcode');
                if (dentroCasco.checked === false && this.envio.costo === 0) {
                  if (dentroCasco.checked === false && this.envio.costo === 0) {
                    Swal.fire({
                      title: 'Tenes que seleccionar una opción de envío',
                      text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                    }).then(() => {
                      tarjetaCredito.classList.remove('show');
                      return;
                    });
                  }
                  dentroCasco.addEventListener('click', () => {
                    if (dentroCasco.checked === false && this.envio.costo === 0) {
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        tarjetaCredito.classList.remove('show');
                        return;
                      });
                    }
                  });
                  cp.addEventListener('change', () => {
                    if (cp.value === '' && dentroCasco.checked === false) {
                      this.envio.costo = 0;
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        tarjetaCredito.classList.remove('show');
                        return;
                      });
                    }
                  });
                } else {
                  setTimeout(() => {
                    const documentosMP: any = this.tipoDocumentos;
                    const selectDoc: any = document.querySelector('#docType');
                    selectDoc.addEventListener('change', () => {
                      documentosMP.forEach((doc: any) => {
                        if (doc.id === selectDoc.value) {
                          const inputDoc: any = document.querySelector(
                            '.' + doc.id
                          );
                          this.opcionDoc = selectDoc.value;
                        } else {
                          const inputDoc: any = document.querySelector(
                            '.' + doc.id
                          );
                        }
                      });
                    });
                    this.funcionesMercadoPago('.comprarCredito', dentroCasco);
                  }, 500);
                }
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
                let dentroCasco: any = document.querySelector('#dentroCasco');
                let cp: any = document.querySelector('#postcode');
                if (dentroCasco.checked === false && this.envio.costo === 0) {
                  if (dentroCasco.checked === false && this.envio.costo === 0) {
                    Swal.fire({
                      title: 'Tenes que seleccionar una opción de envío',
                      text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                    }).then(() => {
                      tarjetaDebito.classList.remove('show');
                      return;
                    });
                  }
                  dentroCasco.addEventListener('click', () => {
                    if (dentroCasco.checked === false && this.envio.costo === 0) {
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        tarjetaDebito.classList.remove('show');
                        return;
                      });
                    }
                  });
                  cp.addEventListener('change', () => {
                    if (cp.value === '' && dentroCasco.checked === false) {
                      this.envio.costo = 0;
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        tarjetaDebito.classList.remove('show');
                        return;
                      });
                    }
                  });
                } else {
                  setTimeout(() => {
                    const documentosMP: any = this.tipoDocumentos;
                    const selectDoc: any = document.querySelector('#docType');
                    selectDoc.addEventListener('change', () => {
                      documentosMP.forEach((doc: any) => {
                        if (doc.id === selectDoc.value) {
                          const inputDoc: any = document.querySelector(
                            '.' + doc.id
                          );
                          this.opcionDoc = selectDoc.value;
                        } else {
                          const inputDoc: any = document.querySelector(
                            '.' + doc.id
                          );
                        }
                      });
                    });
                    this.funcionesMercadoPago('.comprarDebito', dentroCasco);
                  }, 500);
                }
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
                const todosLosInput = tarjetaDebito.getElementsByTagName(
                  'input'
                );

                for (let i = 0; i < todosLosInput.length; i++) {
                  const input: any = todosLosInput[i];
                  input.value = '';
                }
              } else {
                let dentroCasco: any = document.querySelector('#dentroCasco');
                let cp: any = document.querySelector('#postcode');
                if (dentroCasco.checked === false && this.envio.costo === 0) {
                  if (dentroCasco.checked === false && this.envio.costo === 0) {
                    Swal.fire({
                      title: 'Tenes que seleccionar una opción de envío',
                      text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                    }).then(() => {
                      efectivo.classList.remove('show');
                      return;
                    });
                  }
                  dentroCasco.addEventListener('click', () => {
                    if (dentroCasco.checked === false && this.envio.costo === 0) {
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        efectivo.classList.remove('show');
                        return;
                      });
                    }
                  });
                  cp.addEventListener('change', () => {
                    if (cp.value === '' && dentroCasco.checked === false) {
                      this.envio.costo = 0;
                      Swal.fire({
                        title: 'Tenes que seleccionar una opción de envío',
                        text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                      }).then(() => {
                        efectivo.classList.remove('show');
                        return;
                      });
                    }
                  })
                } else {
                  setTimeout(() => {
                      this.funcionesMercadoPago('.comprarEfectivo', dentroCasco);
                  }, 500);
                }
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

    // hago esto para ver si hay algun producto en el carrito, si no lo hay, lo redirijo al shop
    if (isPlatformBrowser(this.platformId)) {
      let carritoDeComprasLS = JSON.parse(localStorage.getItem('carritoDeCompras'));
      // si es > 0 hay productos
      let hayProductos = 0;
      carritoDeComprasLS.forEach(element => {
        if (element.userId == localStorage.getItem('userId')) {
          if (element.orden_id == 0) {
            hayProductos++;
          }
        }
        console.log(hayProductos);
      });
      console.log(hayProductos);
      if (hayProductos === 0) {
        Swal.fire({
          title: 'No tenes ningún producto en el carrito',
          text: 'Te redirijimos a nuestro shop para que puedas agregar productos!'
        });
        this.router.navigate(['/shop']);
      }
    }
    // fin

    this.contenido = "En esta seccion vas a poder hacer el checkout de tu compra, es decir, vas a poder decirnos a donde queres que enviemos lo que compraste y elegir alguno de los medios de pago que nos proporciona Mercado Libre a traves de Mercado Pago. Recorda que si estas dentro del casco urbano de La Plata el envio es mas barato. Cualquier duda que tengas en esta parte consulta la seccion de preguntas frecuentes. Gracias por comprar en Genoveva Shop Online";
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Finalizar compra";
    this.productosService.editarTitulo(this.tituloPag);

    let todoElCarro = document.querySelector('.right-side-cart-area');
    let botonBolsa: any = document.querySelector('#rightSideCart');

    if (todoElCarro.classList.value.includes('cart-on')) { 
      botonBolsa.click();
    } else {
      console.log('no esta abierta');
    }
  }

  ngOnDestroy() {
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

  ngDoCheck() {
    if (isPlatformBrowser(this.platformId)) {
      const todosLosProductosJson = JSON.parse(
        localStorage.getItem('todosLosProductos')
      );
      let carritos: any;
      carritos = this.carritoService.getCarrito();
      if (this.productosCarrito.length !== carritos.length) {
        this.productosCarrito = [];
        this.subTotal = 0;
        todosLosProductosJson.forEach(producto => {
          carritos.forEach(carrito => {
            if (carrito.orden_id === 0) {
              if (producto.id == carrito.productId) {
                this.productosCarrito.push(producto);
                if (!producto.descuento) {
                  // console.log('entra3');
                  this.subTotal = this.subTotal + producto.precio;
                  this.subTotal = Math.round(this.subTotal * 100) / 100;
                } else {
                  // console.log('entra4');
                  const descuento = (producto.descuento / 100) * producto.precio;
                  this.subTotal = this.subTotal + (producto.precio - descuento);
                  this.subTotal = Math.round(this.subTotal * 100) / 100;
                }
              }
            }
          });
        });
      }
    }
  }
}
