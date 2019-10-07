import { Component, OnInit, DoCheck, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  public logueadoHeader = false;
  usaurioId: number;
  userId;
  cantidadDeProd: number;
  // terminoBusqueda: FormControl = new FormControl();
  terminoBusqueda: string;
  mostrarTablero = false;
  mantenimiento: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productosService: ProductosService, private carritoService: CarritoService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngDoCheck() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("logueado")) {
        this.logueadoHeader = true;
      }
  
      if (localStorage.getItem("userId") === null) {
        this.userId = null;
      } else {
        this.userId = localStorage.getItem("userId");
        if (localStorage.getItem('esAdmin') !== null) {
          this.mostrarTablero = true;
        } else {
          this.mostrarTablero = false;
        }
      }
    }

    if (this.cantidadDeProd !== this.carritoService.cantidadPodructos()) {
      this.cantidadDeProd = this.carritoService.cantidadPodructos();
    }

  }

  ngOnInit() { }

  ngOnDestroy() { }

  buscarTermino(termino: string) {
    const terminoMinuscula = termino.toLowerCase();
    this.productosService.updateData(terminoMinuscula);
    this.router.navigate(['/busqueda/', terminoMinuscula]);
  }
}
