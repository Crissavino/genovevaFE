import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    // this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
  }

}
