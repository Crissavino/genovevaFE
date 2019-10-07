import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit, OnDestroy {

  contenido = "";
  tituloPag = "";
  mantenimiento;

  constructor(private productosService: ProductosService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.contenido = "Estas son las preguntas frecuentes o faqs que se pueden hacer ustedes como usuarios, creemos que estan todas y bien respondidas. Cualquier otra consulta no duden en contactarnos por nuestras redes sociales"
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Preguntas frecuentes"
    this.productosService.editarTitulo(this.tituloPag);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.mantenimiento = this.productosService.mantenimiento;
        if (this.mantenimiento === 1) {
          this.router.navigate(['/mantenimiento']);
        }
      }, 1000);
    }
  }

  ngOnDestroy(){
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

}
