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
  }

  ngOnDestroy() {
    // this.productoService.borrarScript('assets/template/js/active.js');
  }
}
