import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-descuento',
  templateUrl: './productos-descuento.component.html',
  styleUrls: ['./productos-descuento.component.css']
})
export class ProductosDescuentoComponent implements OnInit {
  
  cargando = true;
  todosLosProductos = [];
  todosLosProductosConImagenes = [];
  productosDecuento = [];
  todosLasImagenesShopJson;
  categoriasPrincipales = [];
  colores = [];

  constructor(private productosService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute) { 

    if (localStorage.getItem('todosLosProductos')) {
      const todosLosProductosJson = JSON.parse(localStorage.getItem('todosLosProductos'));
      this.todosLosProductos = todosLosProductosJson;
    }
    let imagenesShop;
    if (localStorage.getItem('todosLasImagenesShop')) {
      const todosLasImagenesShopJson = JSON.parse(localStorage.getItem('todosLasImagenesShop'));
      imagenesShop = todosLasImagenesShopJson;
    }

    let arregloPath: any[] = [];
    this.todosLosProductos.forEach((producto: any) => {
      imagenesShop.forEach((imagen: any) => {
        if (producto.id === imagen.producto_id) {
          arregloPath.push(imagen.path);
          producto.path = arregloPath;
        }
      });
      arregloPath = [];
      this.todosLosProductosConImagenes.push(producto);
      setTimeout(() => {
        this.cargando = false;
      }, 500);
    });

    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;

      this.categoriasPrincipales = datos.principales;
      this.colores = datos.colores;
    }

    this.todosLosProductosConImagenes.forEach(producto => {
      if (producto.descuento) {
        this.productosDecuento.push(producto);
      }
    });

    setTimeout(() => {
      this.cargando = false;
    }, 500);
  }

  ngOnInit() { }

}
