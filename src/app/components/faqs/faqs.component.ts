import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit, OnDestroy {

  contenido = "";
  tituloPag = "";

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.contenido = "Estas son las preguntas frecuentes o faqs que se pueden hacer ustedes como usuarios, creemos que estan todas y bien respondidas. Cualquier otra consulta no duden en contactarnos por nuestras redes sociales"
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Preguntas frecuentes"
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy(){
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

}
