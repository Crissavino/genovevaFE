import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit, OnDestroy {
  // productosDestacadosConImagenes: any[] = [];
  // @Output()cantProductosDestacados;
  @Input() producto: any;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.productosService.cargarScript('assets/js/carousel.js');
    // }, 1000);
  }

  ngOnDestroy() {
    // this.productosService.borrarScript("assets/js/carousel.js");
    // console.log('chau');
  }
}
