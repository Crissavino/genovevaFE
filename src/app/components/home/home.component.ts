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

  constructor(private productosService: ProductosService) {
    setTimeout(() => {
      this.productosDestacadosConImagenes = this.productosService.productosDestacados();
      this.cargando = false;
    }, 1500);

  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/carousel.js');
    }, 2000);
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/carousel.js');
  }
}

