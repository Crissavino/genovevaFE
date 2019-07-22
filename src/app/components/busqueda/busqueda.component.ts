import { Component, OnInit, OnDestroy } from '@angular/core';
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
  }

  ngOnDestroy() {
    this.productosBuscados = [];
  }

  buscarProducto(termino) {

    // const todosLosProductosJSon = JSON.parse(localStorage.getItem('todosLosProductos'));
    let productosEncontrados = [];
    let arregloPath: any[] = [];
    let cantEncontrados = 0;

    this.todosLosProductosConImagenes.forEach(producto => {
      console.log(productosEncontrados);
      if (producto.titulo.toLowerCase().includes(termino)) {
        if (productosEncontrados.length !== 0) {
          productosEncontrados.forEach(prodB => {
            if (prodB.id !== producto.id) {
              productosEncontrados.push(producto);
              this.productosBuscados = productosEncontrados;
              cantEncontrados++;
            }
          });
        } else {
          productosEncontrados.push(producto);
          this.productosBuscados = productosEncontrados;
          cantEncontrados = 1;
        }
      } else {
        if (cantEncontrados === 0) {
          this.productosBuscados = [];
          productosEncontrados = [];
          // Swal.fire({
          //   title: "No se encontró ningun producto",
          //   type: "info"
          // });
        }
      }
    });

    if (termino === '') {
      this.productosBuscados = [];
      productosEncontrados = [];
      arregloPath = [];
      productosEncontrados = this.todosLosProductosConImagenes;
      this.productosBuscados = this.todosLosProductosConImagenes;
    }

    return productosEncontrados;
  }

}
