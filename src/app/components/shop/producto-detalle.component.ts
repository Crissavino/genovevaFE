import { Component, OnInit } from '@angular/core';
// importados por mi
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  productoConImagen: any[];
  datos = {
    colores: [],
    principales: [],
    secundarios: [],
    talles: []
  };

  stockProducto = [];

  cargando = true;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    let idProducto: number;
    let pathImagenDetalle: any[] = [];

    this.productosService.getDatos().subscribe((res: any) => {
      this.datos.colores = res.colores;
      this.datos.principales = res.principales;
      this.datos.secundarios = res.secundarios;
      this.datos.talles = res.talles;
    });

    this.activatedRoute.params.subscribe(parametro => {
      idProducto = parametro['id'];
    });
    this.productosService
      .getImagenesDetalle(idProducto)
      .subscribe((res: any) => {
        res.forEach(imagen => {
          pathImagenDetalle.push(imagen.path);
        });
      });
    this.productosService.getProducto(idProducto).subscribe((producto: any) => {
      producto.path = pathImagenDetalle;
      this.productoConImagen = producto;
      // console.log(this.productoConImagen );
      this.cargando = false;
    });

    this.productosService
      .getStockProducto(idProducto)
      .subscribe((stocks: any) => {
        stocks.forEach(stock => {
          this.datos.talles.forEach(talle => {
            if (stock.talle_id === talle.id) {
              // console.log(talle.nombre, stock.cantidad);
              this.stockProducto.push({
                talle_id: talle.id,
                talle_nombre: talle.nombre,
                talle_cantidad: stock.cantidad
              });
              // console.log(this.stockProducto);
            }
          });
        });
      });
  }

  ngOnInit() {
    this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
    this.productosService.cargarEstilos('assets/template/owlcarousel/assets/owl.carousel.min.css')
      .then(() => { }).catch(() => { });
    this.productosService.cargarEstilos('assets/template/owlcarousel/assets/owl.theme.default.min.css')
      .then(() => { }).catch(() => { });
  }

}