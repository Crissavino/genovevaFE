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
    name_lastname: '',
    dni: '',
    pais_id: 'Argentina',
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
    laplata: 60
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
        this.checkout.name_lastname = user.name + ' ' + user.lastname;
        // this.checkout.lastname = user.lastname;
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

  // calcularEnvio(zipCode) {
  //   const dimensions = '30x30x30';
  //   const peso = '800';
  //   const zip_code = zipCode.value;
  //   const item_price = this.subTotal;
  //   let urlAPI = "https://genovevabe.cf/api";
  //   // let urlAPI = "http://127.0.0.1:8000/api";

  //   const url = `${urlAPI}/calcularenvio/${dimensions}/${peso}/${zip_code}/${item_price}`;
  //   // const url = `${urlAPI}/${dimensions}/${peso}/${zip_code}/${item_price}`;

  //   this.http.get(url).pipe().subscribe((res: any) => {
  //     console.log(res);
      
  //     if (res.body.message) {
  //       if (res.body.message.includes('Invalid')) {
  //         Swal.fire({
  //           title: 'No existe ese Código Postal'
  //         }).then( () => {
  //           zipCode.value = '';
  //         });
  //         this.envio.costo = 0;
  //         this.envio.entrega = '';
  //       }
  //     } else {
  //       this.envio.costo = res.body.options[0].cost;
  //       this.envio.entrega = res.body.options[0].estimated_delivery_time.shipping + ' horas';
  //       return res;
  //     }
  //   });

  // }

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

  funcionesMercadoPago(tipoDeCompra) {
    // funcionesMercadoPago(tipoDeCompra, dentroCasco?) {
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
      // if (dentroCasco.checked) {
      //   amount = usarFunciones.subTotal + usarFunciones.envio.laplata;
      // } else {
      //   // esto funcionaba asi cuando se usaba mercado envios
      //   // amount = usarFunciones.subTotal + usarFunciones.envio.costo;
      //   amount = usarFunciones.subTotal;
      // }
      amount = usarFunciones.subTotal
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
              // if (dentroCasco.checked) {
              //   totalFinal = usarFunciones.subTotal + usarFunciones.envio.laplata;
              // } else {
              //   // esto funcionaba asi cuando se usaba mercado envios
              //   // totalFinal = usarFunciones.subTotal + usarFunciones.envio.costo;
              //   totalFinal = usarFunciones.subTotal;
              // }
              totalFinal = usarFunciones.subTotal
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
                name_lastname: formEnvio[0].value,
                user_id: usuarioId,
                dni: formEnvio[1].value,
                // lastname: formEnvio.form.controls.lastname.value,
                pais_id: formEnvio[2].value,
                // direccion1: formEnvio[6].value,
                calle: formEnvio[6].value,
                numero: formEnvio[7].value,
                // direccion2: formEnvio.form.controls.direccion2.value,
                cp: formEnvio[5].value,
                // cp: formEnvio.form.controls.cp.value,
                provincia: formEnvio[3].value,
                // provincia: formEnvio.form.controls.provincia.value,
                ciudad: formEnvio[4].value,
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
            // if (dentroCasco.checked) {
            //   totalFinal = usarFunciones.subTotal + usarFunciones.envio.laplata;
            // } else {
            //   // esto funcinaba asi cuando se usaba mercado envios
            //   // totalFinal = usarFunciones.subTotal + usarFunciones.envio.costo;
            //   totalFinal = usarFunciones.subTotal;
            // }
            totalFinal = usarFunciones.subTotal;
            console.log(formEnvio);
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
              name_lastname: formEnvio[0].value,
              user_id: usuarioId,
              dni: formEnvio[1].value,
              // lastname: formEnvio.form.controls.lastname.value,
              pais_id: formEnvio[2].value,
              // direccion1: formEnvio[6].value,
              calle: formEnvio[6].value,
              numero: formEnvio[7].value,
              // direccion2: formEnvio.form.controls.direccion2.value,
              cp: formEnvio[5].value,
              // cp: formEnvio.form.controls.cp.value,
              provincia: formEnvio[3].value,
              // provincia: formEnvio.form.controls.provincia.value,
              ciudad: formEnvio[4].value,
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
    let hayVacios = false;
    let term: any = document.querySelector('.terminos');

    let form: any = document.querySelectorAll('.validate');
    for (const campo in form) {
      if (form.hasOwnProperty(campo)) {
        const element = form[campo];
        if (element.value === '' || element.value === null) {
          console.log('hay vacios');
          hayVacios = true;
        }
      }
    }

    if (term.checked === false) {
      hayVacios = true;
    }
    
    // if (term.checked === false) {
    //   console.log('entra 1');
    //   Swal.fire({
    //     title: 'Tenes que aceptar los Terminos y Condiciones'
    //   }).then(result => {
    //     if (result) {
    //       console.log('entra 2');
    //       noHayVacios = false;
    //       return;
    //     }
    //   });
    // }
    // let form: any = document.querySelectorAll('.validate');
    // for (const campo in form) {
    //   if (form.hasOwnProperty(campo)) {
    //     const element = form[campo];
    //     if (element.value === '' || element.value === null) {
    //       Swal.fire({
    //         title: 'Tenes que completar todos los campos'
    //       }).then(result => {
    //         if (result) {
    //           noHayVacios = false;
    //           // return;
    //         }
    //       });
    //     }
    //   }
    // }
    return hayVacios;
  }

  esTierraDelFuego(zipCode){
    if (zipCode.value == 9410) {
      Swal.fire({
        title: 'Lo sentimos',
        text: 'OCA no está realizando envíos a Tierra del Fuego por el momento',
        type: 'error',
      }).then( () => {
        zipCode.value = '';
      })
    }
  }

  verTerminosCondiciones(){
    Swal.fire({
      title: '<strong>TERMINOS Y CONDICIONES</strong>',
      type: 'info',
      html:
        '<div class="container">' +
          '<div class="row justify-content-center">' +
            '<div class="col-12">' +
              '<div class="regular-page-content-wrapper section-padding-80">' +
                '<div class="regular-page-text">' +
                  '<h2>TÉRMINOS DE SERVICIO</h2>' +
                  '<h5>INFORMACIÓN GENERAL</h5>' +
                  '<p>' +
                    'Este sitio web es operado por Genoveva. En todo el sitio, los términos “nosotros”, “nos” y “nuestro” se refieren a Genoveva. Genoveva ofrece este sitio web, incluyendo toda la información, herramientas y servicios disponibles para ti en este sitio, el usuario, está condicionado a la aceptación de todos los términos, condiciones, políticas y notificaciones aquí establecidos.' +
                    
                    'Al visitar nuestro sitio y/o comprar algo de nosotros, paticipas en nuestro “Servicio” y aceptas los siguientes términos y condiciones (“Términos de Servicio”, “Términos”), incluídos todos los términos y condiciones adicionales y las polítias a las que se hace referencia en el presente documento y/o disponible a través de hipervínculos. Estas Condiciones de Servicio se aplican a todos los usuarios del sitio, incluyendo si limitación a usuarios que sean navegadores, proveedores, clientes, comerciantes, y/o colaboradores de contenido.' +
                    
                    'Por favor, lee estos Términos de Servicio cuidadosamente antes de acceder o utilizar nuestro sitio web. Al acceder o utilizar cualquier parte del sitio, estás aceptando los Términos de Servicio. Si no estás de acuerdo con todos los términos y condiciones de este acuerdo, entonces no deberías acceder a la página web o usar cualquiera de los servicios. Si las Términos de Servicio son considerados una oferta, la aceptación está expresamente limitada a estos Términos de Servicio.' +
                    
                    'Cualquier función nueva o herramienta que se añadan a la tienda actual, tambien estarán sujetas a los Términos de Servicio. Puedes revisar la versión actualizada de los Términos de Servicio, en cualquier momento en esta página. Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de los Términos de Servicio mediante la publicación de actualizaciones y/o cambios en nuestro sitio web. Es tu responsabilidad chequear esta página periódicamente para verificar cambios. Tu uso contínuo o el acceso al sitio web después de la publicación de cualquier cambio constituye la aceptación de dichos cambios.' +
                  '</p>' +
                  '<hr>' +
      
                  '<h5>SECCIÓN 1 - TÉRMINOS DE LA TIENDA EN LÍNEA</h5>' +
                  '<p>' +
                      'Al utilizar este sitio, declaras que tienes al menos la mayoría de edad en tu estado o provincia de residencia, o que tienes la mayoría de edad en tu estado o provincia de residencia y que nos has dado tu consentimiento para permitir que cualquiera de tus dependientes menores use este sitio.' +
                      
                      'No puedes usar nuestros productos con ningún propósito ilegal o no autorizado tampoco puedes, en el uso del Servicio, violar cualquier ley en tu jurisdicción (incluyendo pero no limitado a las leyes de derecho de autor).' +
                      
                      'No debes transmitir gusanos, virus o cualquier código de naturaleza destructiva.' +
                      
                      'El incumplimiento o violación de cualquiera de estos Términos darán lugar al cese inmediato de tus Servicios.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 2 - CONDICIONES GENERALES</h5>' +
                  '<p>' +
                      'Nos reservamos el derecho de rechazar la prestación de servicio a cualquier persona, por cualquier motivo y en cualquier momento.' +
                      
                      'Entiendes que tu contenido (sin incluir la información de tu tarjeta de crédito), puede ser transferida sin encriptar e involucrar (a) transmisiones a través de varias redes; y (b) cambios para ajustarse o adaptarse a los requisitos técnicosde conexión de redes o dispositivos. La información de tarjetas de crédito está siempre encriptada durante la transferencia a través de las redes.' +
                      
                      'Estás de acuerdo con no reproducir, duplicar, copiar, vender, revender o explotar cualquier parte del Servicio, usp del Servicio, o acceso al Servicio o cualquier contacto en el sitio web a través del cual se presta el servicio, sin el expreso permiso por escrito de nuestra parte.' +
                      
                      'Los títulos utilizados en este acuerdo se icluyen solo por conveniencia y no limita o afecta a estos Términos.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 3 - EXACTITUD, EXHAUSTVIDAD Y ACTUALIDAD DE LA INFORMACIÓN</h5>' +
                  '<p>' +
                      'No nos hacemos responsables si la información disponible en este sitio no es exacta, completa o actual.  El material en este sitio es provisto solo para información general y no debe confiarse en ella o utilizarse como la única base para la toma de decisiones sin consultar primeramente, información más precisa, completa u oportuna.  Cualquier dependencia em el materia de este sitio es bajo su propio riesgo.' +
                      
                      'Este sitio puede contener cierta información histórica.  La información histórica, no es necesriamente actual y es provista únicamente para tu referencia.  Nos reservamos el derecho de modificar los contenidos de este sitio en cualquier momento, pero no tenemos obligación de actualizar cualquier información en nuestro sitio.  Aceptas que es tu responsabilidad de monitorear los cambios en nuestro sitio.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECTION 4 - MODIFICACIONES AL SERVICIO Y PRECIOS</h5>' +
                  '<p> ' +
                      'Los precios de nuestros productos están sujetos a cambio sin aviso.' +
                      
                      'Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido) en cualquier momento sin aviso previo.' +
                      
                      'No seremos responsables ante ti o alguna tercera parte por cualquier modificación, cambio de precio, suspensión o discontinuidad del Servicio.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 5 - PRODUCTOS O SERVICIOS (si aplicable)</h5>' +
                  '<p>' +
                      'Ciertos productos o servicios puedene star disponibles exclusivamente en línea a través del sitio web. Estos productos o servicios pueden tener cantidades limitadas y estar sujetas a devolución o cambio de acuerdo a nuestra política de devolución solamente.' +
                      
                      'Hemos hecho el esfuerzo de mostrar los colores y las imágenes de nuestros productos, en la tienda, con la mayor precisión de colores posible.  No podemos garantizar que el monitor de tu computadora muestre los colores de manera exacta.' +
                      
                      'Nos reservamos el derecho, pero no estamos obligados, para limitar las ventas de nuestros productos o servicios a cualquier persona, región geográfica o jurisdicción.  Podemos ejercer este derecho basados en cada caso.  Nos reservamos el derecho de limitar las cantidades de los productos o servicios que ofrecemos.  Todas las descripciones de productos o precios de los productos están sujetos a cambios en cualquier momento sin previo aviso, a nuestra sola discreción.  Nos reservamos el derecho de discontinuar cualquier producto en cualquier momento.  Cualquier oferta de producto o servicio hecho en este sitio es nulo donde esté prohibido.' +
                      
                      'No garantizamos que la calidad de los productos, servicios, información u otro material comprado u obtenido por ti  cumpla con tus expectativas, o que cualquier error en el Servicio será corregido.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 6 - EXACTITUD DE FACTURACIÓN E INFORMACIÓN DE CUENTA</h5>' +
                  '<p>' +
                      'Nos reservamos el derecho de rechazar cualquier pedido que realice con nosotros. Podemos, a nuestra discreción, limitar o cancelar las cantidades compradas por persona, por hogar o por pedido. Estas restricciones pueden incluir pedidos realizados por o bajo la misma cuenta de cliente, la misma tarjeta de crédito, y/o pedidos que utilizan la misma facturación y/o dirección de envío.' +
                      
                      'En el caso de que hagamos un cambio o cancelemos una orden, podemos intentar notificarte poniéndonos en contacto vía correo electrónico y/o dirección de facturación / número de teléfono proporcionado en el momento que se hizo pedido. Nos reservamos el derecho de limitar o prohibir las órdenes que, a nuestro juicio, parecen ser colocado por los concesionarios, revendedores o distribuidores.' +
                      
                      'Te comprometes a proporcionar información actual, completa y precisa de la compra y cuenta utilizada para todas las compras realizadasen nuestra tienda.  Te comprometes a ctualizar rápidamente tu cuenta y otra información, incluyendo tu dirección de correo electrónico y números de tarjetas de crédito y fechas de vencimiento, para que podamos completar tus transacciones y contactarte cuando sea necesario.' +
                      
                      'Para más detalles, por favor revisa nuestra Política de Devoluciones.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 7 - HERRAMIENTAS OPCIONALES</h5>' +
                  '<p>' +
                      'Es posible que te proporcionemos aceso a herramientas de terceros a los cuales no monitoreamos y sobre los que no tenemos control ni entrada.' +
                      
                      'Reconoces y aceptas que proporcionamos acceso a este tipo de herramientas "tal cual" y "según disponibilidad" sin garantías, representaciones o condiciones de ningún tipo y sin ningún respaldo.  No tendremos responsabilidad alguna derivada de o relacionada con tu uso de herramientas proporcionadas por terceras partes.' +
                      
                      'Cualquier uso que hagas de las herramientas opcionales que se ofrecen a través del sitio bajo tu propio riesgo y discreción y debes asegurarte de estar familiarizado y aprobar los términos bajo los cuales estas herramientas son proporcionadas por el o los proveedores de terceros.' +
                      
                      'Tambien es posible que, en el futuro, te ofrezcamos nuevos servicios y/o características a través del sitio web (incluyendo el lanzamiento de nuevas herramientas y recursos).  Estas nuevas caraterísticas y/o servicios tambien estarán sujetos a estos Términos de Servicio.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 8 - ENLACES DE TERCERAS PARTES</h5>' +
                  '<p>' +
                      'Cierto contenido, productos y servicios disponibles vía nuestro Servicio puede incluír material de terceras partes.' +
                      
                      'Enlaces de terceras partes en este sitio pueden direccionarte a sitios web de terceras partes que no están afiliadas con nosotros.  No nos responsabilizamos  de examinar o evaluar el contenido o exactitud y no garantizamos ni tendremos ninguna obligación o responsabilidad por cualquier material de terceros o siitos web, o de cualquier material, productos o servicios de terceros.' +
                      
                      'No nos hacemos responsables de cualquier daño o daños relacionados con la adquisición o utilización de bienes, servicios, recursos, contenidos, o cualquier otra transacción realizadas en conexión con sitios web de terceros.  Por favor revisa cuidadosamente las políticas y prácticas de terceros y asegúrate de entenderlas antes de participar en cualquier transacción.  Quejas, reclamos, inquietudes o pregutas con respecto a productos de terceros deben ser dirigidas a la tercera parte.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 9 - COMENTARIOS DE USUARIO, CAPTACIÓN Y OTROS ENVÍOS</h5>' +
                  '<p>' +
                      'Si, a pedido nuestro, envías ciertas presentaciones específicas (por ejemplo la participación en concursos) o sin un pedido de nuestra parte envías ideas creativas, sugerencias, proposiciones, planes, u otros materiales, ya sea en línea, por email, por correo postal, o de otra manera (colectivamente, "comentarios"), aceptas que podamos, en cualquier momento, sin restricción, editar, copiar, publicar, distribuír, traducir o utilizar por cualquier medio comentarios que nos hayas enviado. No tenemos ni tendremos ninguna obligación (1) de mantener ningún comentario confidencialmente; (2) de pagar compensación por comentarios; o (3) de responder a comentarios.' +
                      
                      'Nosotros podemos, pero no tenemos obligación de, monitorear, editar o remover contenido que consideremos sea ilegítimo, ofensivo, amenazante, calumnioso, difamatorio, pornográfico, obsceno u objetable o viole la propiedad intelectual de cualquiera de las partes o los Términos de Servicio.' +
                      
                      'Aceptas que tus comentarios no violarán los derechos de terceras partes, incluyendo derechos de autor, marca, privacidad, personalidad u otro derechos personal o de propiedad. Asimismo, aceptas que tus comentarios no contienen material difamatorio o ilegal, abusivo u obsceno, o contienen virus informáticos u otro malware que pudiera, de alguna manera, afectar el funcionamiento del Srvicio o de cualquier sitio web relacionado.  No puedes utilizar una dirección de correo electrónico falsa, usar otra identidad que no sea legítima, o engañar a terceras partes o a nosotros en cuanto al origen de tus comentarios.  Tu eres el único responsable por los comentarios que haces y su precisión.  No nos hacemos responsables y no asumimos ninguna obligación con respecto a los comentarios publicados por ti o cualquier tercer parte.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 10 - INFORMACIÓN PERSONAL</h5>' +
                  '<p>' +
                      'Tu presentación de información personal a través del sitio se rige por nuestra Política de Privacidad. Para ver nuestra Política de Privacidad.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 11 - ERRORES, INEXACTITUDES Y OMISIONES</h5>' +
                  '<p>' +
                      'De vez en cuando puede haber información en nuestro sitio o en el Servicio que contiene errores tipográficos, inexactitudes u omisiones que puedan estar relacionadas con las descripciones de productos, precios, promociones, ofertas, gastos de envío del producto, el tiempo de tránsito y la disponibilidad. Nos reservamos el derecho de corregir los errores, inexactitudes u omisiones y de cambiar o actualizar la información o cancelar pedidos si alguna información en el Servicio o en cualquier sitio web relacionado es inexacta en cualquier momento sin previo aviso (incluso después de que hayas enviado tu orden) .' +
                      
                      'No asumimos ninguna obligación de actualizar, corregir o aclarar la información en el Servicio o en cualquier sitio web relacionado, incluyendo, sin limitación, la información de precios, excepto cuando sea requerido por la ley. Ninguna especificación actualizada o fecha de actualización aplicada en el Servicio o en cualquier sitio web relacionado, debe ser tomada para indicar que toda la información en el Servicio o en cualquier sitio web relacionado ha sido modificado o actualizado.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 12 - USOS PROHIBIDOS</h5>' +
                  '<p>' +
                      'En adición a otras prohibiciones como se establece en los Términos de Servicio, se prohibe el uso del sitio o su contenido: (a) para ningún propósito ilegal; (b) para pedirle a otros que realicen o partiicpen en actos ilícitos; (c) para violar cualquier regulación, reglas, leyes internacionales, federales, provinciales o estatales, u ordenanzas locales; (d) para infringir o violar el derecho de propiedad intelectual nuestro o de terceras partes; (e) para acosar, abusar, insultar, dañar, difamar, calumniar, desprestigiar, intimidar o discriminar por razones de género, orientación sexual, religión, tnia, raza, edad, nacionalidad o discapacidad; (f) para presentar información falsa o engañosa; (g) para cargar o transmitir virus o cualquier otro tipo de código malicioso que sea o pueda ser utilizado en cualquier forma que pueda comprometer la funcionalidad o el funcionamientodel Servicio o de cualquier sitio web relacionado, otros sitios o Internet; (h) para recopilar o rastrear información personal de otros; (i) para generar spam, phish, pharm, pretext, spider, crawl, or scrape; (j) para cualquier propósito obsceno o inmoral; o (k) para interferir con o burlar los elementos de seguridad del Servicio o cualquier sitio web relacionado¿ otros sitios o Internet. Nos reservamos el derecho de suspender el uso del Servicio o de cualquier sitio web relacionado por violar cualquiera de los ítems de los usos prohibidos.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 13 - EXCLUSIÓN DE GARANTÍAS; LIMITACIÓN DE RESPONSABILIDAD</h5>' +
                  '<p>' +
                      'No garantizamos ni aseguramos que el uso de nuestro servicio será ininterrumpido, puntual, seguro o libre de errores.' +
                      
                      'No garantizamos que los resultados que se puedan obtener del uso del servicio serán exactos o confiables.' +
                      
                      'Aceptas que de vez en cuando podemos quitar el servicio por períodos de tiempo indefinidos o cancelar el servicio en cualquier momento sin previo aviso.' +
                      
                      'Aceptas expresamenteque el uso de, o la posibilidad de utilizar, el servicio es bajo tu propio riesgo.  El servicio y todos los productos y servicios proporcionados a través del servicio son (salvo lo expresamente manifestado por nosotros) proporcionados "tal cual" y "según esté disponible" para su uso, sin ningún tipo de representación, garantías o condiciones de ningún tipo, ya sea expresa o implícita, incluídas todas las garantías o condiciones implícitas de comercialización, calidad comercializable, la aptitud para un propósito particular, durabilidad, título y no infracción.' +
                      
                      'En ningún caso Genoveva, nuestros directores, funcionarios, empleados, afiliados, agentes, contratistas, internos, proveedores, prestadores de servicios o licenciantes serán responsables por cualquier daño, pérdida, reclamo, o daños directos, indirectos, incidentales, punitivos, especiales o consecuentes de cualquier tipo, incluyendo, sin limitación, pérdida de beneficios, pérdida de igresos, pérdida de ahorros, pérdida de datos, costos de reemplazo, o cualquier daño similar, ya sea basado en contrato, agravio (incluyendo negligencia), responsabilidad estricta o de otra manera, como consecuencia del uso de cualquiera de los servicios o productos adquiridos mediante el servicio, o por cualquier otro reclamo relacionado de alguna manera con el uso del servicio o cualquier producto, incluyendo pero no limitado, a cualquier error u omisión en cualquier contenido, o cualquier pérdida o daño de cualquier tipo incurridos como resultados de la utilización del servicio o cualquier contenido (o producto) publicado, transmitido, o que se pongan a disposición a través del servicio, incluso si se avisa de su posibilidad.  Debido a que algunos estados o jurisdicciones no permiten la exclusión o la limitación de responsabilidad por daños consecuenciales o incidentales, en tales estados o jurisdicciones, nuestra responsabilidad se limitará en la medida máxima permitida por la ley.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 14 - INDEMNIZACIÓN</h5>' +
                  '<p>' +
                      'Aceptas indemnizar, defender y mantener indemne Genoveva y nuestras matrices, subsidiarias, afiliados, socios, funcionarios, directores, agentes, contratistas, concesionarios, proveedores de servicios, subcontratistas, proveedores, internos y empleados, de cualquier reclamo o demanda, incluyendo honorarios razonables de abogados, hechos por cualquier tercero a causa o como resultado de tu incumplimiento de las Condiciones de Servicio o de los documentos que incorporan como referencia, o la violación de cualquier ley o de los derechos de u tercero.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 15 - DIVISIBILIDAD</h5>' +
                  '<p>' +
                      'En el caso de que se determine que cualquier disposición de estas Condiciones de Servicio sea ilegal, nula o inejecutable, dicha disposición será, no obstante, efectiva a obtener la máxima medida permitida por la ley aplicable, y la parte no exigible se considerará separada de estos Términos de Servicio, dicha determinación no afectará la validez de aplicabilidad de las demás disposiciones restantes.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 16 - RESCISIÓN</h5>' +
                  '<p>' +
                      'Las obligaciones y responsabilidades de las partes que hayan incurrido con anterioridad a la fecha de terminación sobrevivirán a la terminación de este acuerdo a todos los efectos.' +
                      
                      'Estas Condiciones de servicio son efectivos a menos que y hasta que sea terminado por ti o nosotros. Puedes terminar estos Términos de Servicio en cualquier momento por avisarnos que ya no deseas utilizar nuestros servicios, o cuando dejes de usar nuestro sitio.' +
                      
                      'Si a nuestro juicio, fallas, o se sospecha que haz fallado, en el cumplimiento de cualquier término o disposición de estas Condiciones de Servicio, tambien podemos terminar este acuerdo en cualquier momento sin previo aviso, y seguirás siendo responsable de todos los montos adeudados hasta incluída la fecha de terminación; y/o en consecuencia podemos negarte el acceso a nuestros servicios (o cualquier parte del mismo).' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 17 - ACUERDO COMPLETO</h5>' +
                  '<p>' +
                      'Nuestra falla para ejercer o hacer valer cualquier derecho o disposiciôn de estas Condiciones de Servicio no constituirá una renucia a tal derecho o disposición.' +
                      
                      'Estas Condiciones del servicio y las políticas o reglas de operación publicadas por nosotros en este sitio o con respecto al servicio constituyen el acuerdo completo y el entendimiento entre tu y nosotros y rigen el uso del Servicio y reemplaza cualquier acuerdo, comunicaciones y propuestas anteriores o contemporáneas, ya sea oral o escrita, entre tu y nosotros (incluyendo, pero no limitado a, cualquier versión previa de los Términos de Servicio).' +
                      
                      'Cualquier ambigüedad en la interpretación de estas Condiciones del servicio no se interpretarán en contra del grupo de redacción.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 18 - LEY</h5>' +
                  '<p>' +
                      'Estas Condiciones del servicio y cualquier acuerdos aparte en el que te proporcionemos servicios se regirán e interpretarán en conformidad con las leyes Argentina.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 19 - CAMBIOS EN LOS TÉRMINOS DE SERVICIO</h5>' +
                  '<p>' +
                      'Puedes revisar la versión más actualizada de los Términos de Servicio en cualquier momento en esta página.' +
                      
                      'Nos reservamos el derecho, a nuestra sola discreción, de actualizar, modificar o reemplazar cualquier parte de estas Condiciones del servicio mediante la publicación de las actualizaciones y los cambios en nuestro sitio web. Es tu responsabilidad revisar nuestro sitio web periódicamente para verificar los cambios. El uso contínuo de o el acceso a nuestro sitio Web o el Servicio después de la publicación de cualquier cambio en estas Condiciones de servicio implica la aceptación de dichos cambios.' +
                  '</p>' +
                  '<hr>' +
                  '<h5>SECCIÓN 20 - INFORMACIÓN DE CONTACTO</h5>' +
                  '<p>' +
                      'Preguntas acerca de los Términos de Servicio deben ser enviadas a <a style="cursor: pointer;" href="mailto:genovevashoponline@gmail.com">genovevashoponline@gmail.com</a>.' +
                  '</p>' +
                  '<hr>' +
                  '<p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>',
      showCloseButton: true,
      // showCancelButton: true,
      // focusConfirm: false,
      confirmButtonText:
        'Entendido',
      // confirmButtonAriaLabel: 'Thumbs up, great!',
      // cancelButtonText:
      //   '<i class="fa fa-thumbs-down"></i>',
      // cancelButtonAriaLabel: 'Thumbs down',
    })
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
                let dentroCasco: any = document.querySelector('#dentroCasco');
                if (this.validarFormEnvio() === true) {
                  // hay campos vacios
                  Swal.fire({
                    title: 'Tenes que completar el formulario de envio y aceptar los términos y condiciones',
                    text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, abonaras el envío cuando se entregue tu compra. Si no te encontras dentro del casco urbano de La Plata tu compra se te enviará a la sucursal de OCA mas cercana, donde vas a poder abonar el costo del envío en la misma'
                  }).then(() => {
                    tarjetaCredito.classList.remove('show');
                    return;
                  });
                } else {
                  // no hay campos vacios
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
                    this.funcionesMercadoPago('.comprarCredito');
                    // this.funcionesMercadoPago('.comprarCredito', dentroCasco);
                  }, 500);
                }
                
                // se muestra pago por tarjeta de credito
                // let dentroCasco: any = document.querySelector('#dentroCasco');
                // let cp: any = document.querySelector('#postcode');
                // if (dentroCasco.checked === false && this.validarFormEnvio() === true) {
                //   if (dentroCasco.checked === false && this.validarFormEnvio() === true) {
                //     Swal.fire({
                //       title: 'Tenes que completar el formulario de envio',
                //       // title: 'Tenes que seleccionar una opción de envío',
                //       text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //     }).then(() => {
                //       tarjetaCredito.classList.remove('show');
                //       return;
                //     });
                //   }
                //   dentroCasco.addEventListener('click', () => {
                //     if (dentroCasco.checked === false && this.envio.costo === 0) {
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         tarjetaCredito.classList.remove('show');
                //         return;
                //       });
                //     }
                //   });
                //   cp.addEventListener('change', () => {
                //     if (cp.value === '' && dentroCasco.checked === false) {
                //       this.envio.costo = 0;
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         tarjetaCredito.classList.remove('show');
                //         return;
                //       });
                //     }
                //   });
                // } else {
                //   setTimeout(() => {
                //     const documentosMP: any = this.tipoDocumentos;
                //     const selectDoc: any = document.querySelector('#docType');
                //     selectDoc.addEventListener('change', () => {
                //       documentosMP.forEach((doc: any) => {
                //         if (doc.id === selectDoc.value) {
                //           const inputDoc: any = document.querySelector(
                //             '.' + doc.id
                //           );
                //           this.opcionDoc = selectDoc.value;
                //         } else {
                //           const inputDoc: any = document.querySelector(
                //             '.' + doc.id
                //           );
                //         }
                //       });
                //     });
                //     this.funcionesMercadoPago('.comprarCredito', dentroCasco);
                //   }, 500);
                // }

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
                if (this.validarFormEnvio() === true) {
                  // hay campos vacios
                  Swal.fire({
                    title: 'Tenes que completar el formulario de envio y aceptar los términos y condiciones',
                    text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, abonaras el envío cuando se entregue tu compra. Si no te encontras dentro del casco urbano de La Plata tu compra se te enviará a la sucursal de OCA mas cercana, donde vas a poder abonar el costo del envío en la misma'
                  }).then(() => {
                    tarjetaDebito.classList.remove('show');
                    return;
                  });
                } else {
                  // no hay campos vacios
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
                    this.funcionesMercadoPago('.comprarDebito');
                    // this.funcionesMercadoPago('.comprarDebito', dentroCasco);
                  }, 500);
                }

                // let dentroCasco: any = document.querySelector('#dentroCasco');
                // let cp: any = document.querySelector('#postcode');
                // if (dentroCasco.checked === false && this.envio.costo === 0) {
                //   if (dentroCasco.checked === false && this.envio.costo === 0) {
                //     Swal.fire({
                //       title: 'Tenes que seleccionar una opción de envío',
                //       text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //     }).then(() => {
                //       tarjetaDebito.classList.remove('show');
                //       return;
                //     });
                //   }
                //   dentroCasco.addEventListener('click', () => {
                //     if (dentroCasco.checked === false && this.envio.costo === 0) {
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         tarjetaDebito.classList.remove('show');
                //         return;
                //       });
                //     }
                //   });
                //   cp.addEventListener('change', () => {
                //     if (cp.value === '' && dentroCasco.checked === false) {
                //       this.envio.costo = 0;
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         tarjetaDebito.classList.remove('show');
                //         return;
                //       });
                //     }
                //   });
                // } else {
                //   setTimeout(() => {
                //     const documentosMP: any = this.tipoDocumentos;
                //     const selectDoc: any = document.querySelector('#docType');
                //     selectDoc.addEventListener('change', () => {
                //       documentosMP.forEach((doc: any) => {
                //         if (doc.id === selectDoc.value) {
                //           const inputDoc: any = document.querySelector(
                //             '.' + doc.id
                //           );
                //           this.opcionDoc = selectDoc.value;
                //         } else {
                //           const inputDoc: any = document.querySelector(
                //             '.' + doc.id
                //           );
                //         }
                //       });
                //     });
                //     this.funcionesMercadoPago('.comprarDebito', dentroCasco);
                //   }, 500);
                // }
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
                if (this.validarFormEnvio() === true) {
                  // hay campos vacios
                  Swal.fire({
                    title: 'Tenes que completar el formulario de envio y aceptar los términos y condiciones',
                    text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, abonaras el envío cuando se entregue tu compra. Si no te encontras dentro del casco urbano de La Plata tu compra se te enviará a la sucursal de OCA mas cercana, donde vas a poder abonar el costo del envío en la misma'
                  }).then(() => {
                    efectivo.classList.remove('show');
                    return;
                  });
                } else {
                  // no hay campos vacios
                  setTimeout(() => {
                    this.funcionesMercadoPago('.comprarEfectivo');
                    // this.funcionesMercadoPago('.comprarEfectivo', dentroCasco);
                  }, 500);
                }

                // let dentroCasco: any = document.querySelector('#dentroCasco');
                // let cp: any = document.querySelector('#postcode');
                // if (dentroCasco.checked === false && this.envio.costo === 0) {
                //   if (dentroCasco.checked === false && this.envio.costo === 0) {
                //     Swal.fire({
                //       title: 'Tenes que seleccionar una opción de envío',
                //       text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //     }).then(() => {
                //       efectivo.classList.remove('show');
                //       return;
                //     });
                //   }
                //   dentroCasco.addEventListener('click', () => {
                //     if (dentroCasco.checked === false && this.envio.costo === 0) {
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         efectivo.classList.remove('show');
                //         return;
                //       });
                //     }
                //   });
                //   cp.addEventListener('change', () => {
                //     if (cp.value === '' && dentroCasco.checked === false) {
                //       this.envio.costo = 0;
                //       Swal.fire({
                //         title: 'Tenes que seleccionar una opción de envío',
                //         text: 'Si estas dentro del casco urbano de La Plata hace click en la casilla que se encuentra en la descripción del envío, si no ingresá tu Código Postal'
                //       }).then(() => {
                //         efectivo.classList.remove('show');
                //         return;
                //       });
                //     }
                //   })
                // } else {
                //   setTimeout(() => {
                //       this.funcionesMercadoPago('.comprarEfectivo', dentroCasco);
                //   }, 500);
                // }
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


      let verTerminosYcondiciones = document.querySelector('.termYcondiciones');

      verTerminosYcondiciones.addEventListener('click', () => {
        this.verTerminosCondiciones();
      })
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
