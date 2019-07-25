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
  contenido = "";
  tituloPag = "";

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

    this.contenido = "Genoveva es una marca con mas de 3 anos de antiguedad en el mercado, contamos con mas de 50.000 seguidores en nuestras plataformas de redes sociales, hemos realizado con exito muchisimos showrooms y es por eso que decidimos adentrarnos en el mundo del e-commerce para que todo el mundo pueda ver nuestro productos."
    this.productosService.editarMetaHead(this.contenido)

    this.tituloPag = "Bienvenidos"
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/carousel.js');
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }
}

