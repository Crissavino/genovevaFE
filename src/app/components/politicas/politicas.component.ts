import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {

  contenido = '';
  tituloPag = '';

  constructor(private productosService: ProductosService) { }

  ngOnInit() { 
    this.contenido = "Estas son las politicas, terminos y condiciones de Genoveva Shop Online, cualquier duda que se le presente consultenos a traves de nuestro email o a nustras redes sociales"
    this.productosService.editarMetaHead(this.contenido)

    this.tituloPag = "Terminos y Condiciones"
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy() {
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

}
