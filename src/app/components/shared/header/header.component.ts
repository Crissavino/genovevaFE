import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public logueadoHeader = false;
  usaurioId: number;
  userId;

  constructor(private productosService: ProductosService) { 
    // this.productosService.cargarScript('assets/template/js/active.js').then((res) => { }).catch(() => { });
  }

  ngDoCheck() {
    if (localStorage.getItem('logueado')) {
      this.logueadoHeader = true;
    }

    if (localStorage.getItem('userId') === null) {
      this.userId = null;
    } else {
      this.userId = localStorage.getItem('userId');
    }

  }

  ngOnInit() {
  }

}
