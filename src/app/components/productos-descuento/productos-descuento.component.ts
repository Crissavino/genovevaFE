import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-descuento',
  templateUrl: './productos-descuento.component.html',
  styleUrls: ['./productos-descuento.component.css']
})
export class ProductosDescuentoComponent implements OnInit, OnDestroy {
  
  cargando = true;
  todosLosProductos = [];
  todosLosProductosConImagenes = [];
  productosDecuento = [];
  todosLasImagenesShopJson;
  categoriasPrincipales = [];
  colores = [];
  contenido = "";
  tituloPag = "";
  mantenimiento;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productosService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute) { 
    if (isPlatformBrowser(this.platformId)) {
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
  }

  ngOnInit() { 
    this.contenido = "Estos son todos los productos de nuestro stock que tienen descuento, apurate, nunca duran mucho tiempo!";
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Grandes descuentos";
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

  ngOnDestroy() {
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

}
