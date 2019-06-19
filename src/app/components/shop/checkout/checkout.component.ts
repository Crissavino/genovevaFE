import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  usuario: UsuarioModel;

  constructor(private productosService: ProductosService, private registroService: RegistroService) {
    this.registroService.getUsuario(localStorage.getItem('userId')).subscribe( (user: UsuarioModel) => {
      console.log(user);
      this.usuario = user;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/nice-select.js');
    }, 100);
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/nice-select.js');
  }

}
