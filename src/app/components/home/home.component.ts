import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logueado = false;

  constructor(private productosService: ProductosService, private registroService: RegistroService) {
  }

  ngOnInit() {
    // this.productosService.borrarScript('assets/template/js/active.js');
    // this.productosService.cargarScript('assets/template/js/active.js');
  }

}
