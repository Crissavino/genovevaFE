import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto-buscado',
  templateUrl: './producto-buscado.component.html',
  styleUrls: ['./producto-buscado.component.css']
})
export class ProductoBuscadoComponent implements OnInit, DoCheck {

  arrayNombresCategoriaPrincipal = [];
  nombreCategoria = '';
  @Input() producto;
  buscando = false;

  constructor(private productoService: ProductosService) {
    if (localStorage.getItem('todosLosDatos')) {
      const todosLosDatosJson = JSON.parse(localStorage.getItem('todosLosDatos'));
      const datos = todosLosDatosJson;
      this.arrayNombresCategoriaPrincipal = datos.principales;
    }

    setTimeout(() => {
      this.arrayNombresCategoriaPrincipal.forEach(categoria => {
        if (categoria.id === this.producto.categoria_id) {
          console.log(categoria.nombre);
          this.nombreCategoria = categoria.nombre;
        }
      });
    }, 1000);
  }

  ngOnInit() {
  }

  ngDoCheck() {
  }

  // buscar() {
    
  // }

}
