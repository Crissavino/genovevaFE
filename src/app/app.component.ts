import { CheckoutService } from './services/checkout.service';
import { RegistroService } from './services/registro.service';
import { CarritoService } from './services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private productosService: ProductosService, private carritoService: CarritoService,
              private registroService: RegistroService, private checkoutService: CheckoutService) { }


  ngOnInit() { }
}
