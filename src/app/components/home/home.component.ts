import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  productosDestacadosConImagenes: any[] = [];
  // productosDestacadosConImagenesFavs: any[] = [];
  // @Output()cantProductosDestacados;
  logueado = false;
  cargando = true;
  primeraVez = true;
  favoritos = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    // setTimeout(() => {
    // this.productosService.cargarScript('assets/template/js/active.js');
    // this.productosService.cargarScript('assets/js/carousel.js');
    // }, 500);

    setTimeout(() => {
      this.productosDestacadosConImagenes = this.productosService.productosDestacados();
    }, 800);
  }

  ngOnDestroy() {
    // this.productosService.borrarScript('assets/template/js/active.js');
    // this.productosService.borrarScript('assets/js/carousel.js');
  }
}

