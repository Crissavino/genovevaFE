import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    // this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
  }

}
