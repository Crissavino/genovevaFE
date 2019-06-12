import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit, Input, Output } from '@angular/core';

// importados por mi
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  // @Output() productosBD = [];
  @Input('datos') producto: Producto;

  constructor(private productoService: ProductosService) { }

  ngOnInit() {
  }

}
