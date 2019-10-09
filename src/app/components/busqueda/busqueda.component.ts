import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, OnDestroy {

  termino: string;
  // termino: FormControl = new FormControl();
  todosLosProductos = [];
  todosLosProductosConImagenes = [];
  productosBuscados: any[] = [];
  buscando = false;
  todosLasImagenesShopJson;
  muestro = false;
  cargando = true;
  categoriasPrincipales = [];
  colores = [];
  contenido = "";
  tituloPag = "";

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
    }
  }

  ngOnInit() {

    this.productosService.getData().subscribe((data: string) => {
      this.termino = data;
      this.buscando = true;
      setTimeout(() => {
        this.buscando = false;
        this.buscarProducto(this.termino);
      }, 1000);
    });
    this.contenido = "Esta es la pagina de busqueda de Genoveva Shop Online, aca podras encontrar y asi poder comprar todos nuestros productos. En la pagina podras ver los productos que encontramos de acuerdo con lo que has buscado";
    this.productosService.editarMetaHead(this.contenido);

    this.tituloPag = "Resultados de la busqueda"
    this.productosService.editarTitulo(this.tituloPag);

    this.productosService.cargarNoIndex();
  }

  ngOnDestroy() {
    this.productosBuscados = [];
    console.log(this.contenido);
    
    this.productosService.borrarNoIndex();
    this.productosService.reiniciarMetaHead(this.contenido);
    this.productosService.reiniciarTitulo(this.tituloPag);
  }

  buscarProducto(termino) {

    // const todosLosProductosJSon = JSON.parse(localStorage.getItem('todosLosProductos'));
    let productosEncontrados = [];
    let arregloPath: any[] = [];
    let cantEncontrados = 0;

    this.todosLosProductosConImagenes.forEach( producto => {
      if (producto.titulo.toLowerCase().includes(termino)) {
        if (productosEncontrados.length === 0) {
          productosEncontrados.push(producto);
          this.productosBuscados = productosEncontrados;
          cantEncontrados = 1;
        } else {
          productosEncontrados.push(producto)
          cantEncontrados++;
        }
      } else {
        if (cantEncontrados === 0) {
          this.productosBuscados = [];
          productosEncontrados = [];
        }
      }
    });

    // this.todosLosProductosConImagenes.forEach(producto => {
    //   console.log(productosEncontrados);
    //   if (producto.titulo.toLowerCase().includes(termino)) {
    //     if (productosEncontrados.length !== 0) {
    //       productosEncontrados.forEach(prodB => {
    //         if (prodB.id !== producto.id) {
    //           productosEncontrados.push(producto);
    //           this.productosBuscados = productosEncontrados;
    //           cantEncontrados++;
    //         }
    //       });
    //     } else {
    //       productosEncontrados.push(producto);
    //       this.productosBuscados = productosEncontrados;
    //       cantEncontrados = 1;
    //     }
    //   } else {
    //     if (cantEncontrados === 0) {
    //       this.productosBuscados = [];
    //       productosEncontrados = [];
    //       // Swal.fire({
    //       //   title: "No se encontró ningun producto",
    //       //   type: "info"
    //       // });
    //     }
    //   }
    // });

    if (termino === '') {
      cantEncontrados = 0;
      this.productosBuscados = [];
      productosEncontrados = [];
      arregloPath = [];
      productosEncontrados = this.todosLosProductosConImagenes;
      this.productosBuscados = this.todosLosProductosConImagenes;
    }

    return productosEncontrados;
  }

}
