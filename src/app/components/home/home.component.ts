import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';
import { isPlatformBrowser } from '@angular/common';

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
  mantenimiento;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productosService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute, private shopComponent: ShopComponent) {
    setTimeout(() => {
      this.productosDestacadosConImagenes = this.productosService.productosDestacados();
      this.cargando = false;

      let remeras = document.querySelector('.remeras');
      remeras.addEventListener('click', () => {
        this.router.navigate(['/shop'], { queryParams: { categoria: "remeras"} })
      });

      let bodys = document.querySelector('.bodys');
      bodys.addEventListener('click', () => {
        this.router.navigate(['/shop'], { queryParams: { categoria: "bodys"} })
      });

      let blusas = document.querySelector('.blusas');
      blusas.addEventListener('click', () => {
        this.router.navigate(['/shop'], { queryParams: { categoria: "blusas"} })
      });
    }, 1500);

    
    
    // bodys
    // blusas

  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/js/carousel.js');
    }, 2000);

    this.contenido = "Genoveva es una marca con mas de 3 anos de antiguedad en el mercado, contamos con mas de 50.000 seguidores en nuestras plataformas de redes sociales, hemos realizado con exito muchisimos showrooms y es por eso que decidimos adentrarnos en el mundo del e-commerce para que todo el mundo pueda ver nuestro productos."
    this.productosService.editarMetaHead(this.contenido)

    this.tituloPag = "Genoveva Shop Online"
    this.productosService.editarTitulo(this.tituloPag);

    // this.mantenimiento = localStorage.getItem('mantenimiento');
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.mantenimiento = this.productosService.mantenimiento;
        if (this.mantenimiento === 1) {
          this.router.navigate(['/mantenimiento']);
        }
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/js/carousel.js');
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }
}

