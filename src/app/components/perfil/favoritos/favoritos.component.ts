import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit, OnDestroy {

  cargando = true;

  constructor(private productoService: ProductosService) {}

  ngOnInit() {
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
    // setTimeout(() => {
    //   console.log('entra');
    //   this.productoService.cargarScript('assets/template/js/active.js');
    // }, 1500);
  }

  ngOnDestroy() {
    // console.log('sale');
    // this.productoService.borrarScript('assets/template/js/active.js');
    // this.productoService.borrarScript('assets/template/js/active.js');
  }
}
