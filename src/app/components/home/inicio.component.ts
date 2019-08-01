import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  tituloPag = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private productosService: ProductosService, private router: Router) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const header: any = document.querySelector('.header_area');
      const footer: any = document.querySelector('.footer_area');
      header.classList.add('d-none');
      footer.classList.add('d-none');

      setTimeout(() => {
        // this.router.navigateByUrl('/home').then(() => {
        //   location.reload();
        // });
        this.router.navigate(['/home']);
      }, 1500);
      this.productosService.cargarNoIndex();
    }


    this.tituloPag = "Bienvenidos"
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.productosService.borrarNoIndex();
      const header: any = document.querySelector('.header_area');
      const footer: any = document.querySelector('.footer_area');
      header.classList.remove('d-none');
      footer.classList.remove('d-none');
    }
    this.productosService.reiniciarTitulo(this.tituloPag);
  }
}
