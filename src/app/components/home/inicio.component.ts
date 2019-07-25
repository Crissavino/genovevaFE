import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  tituloPag = "";

  constructor(private productosService: ProductosService, private router: Router) {}

  ngOnInit() {
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

    this.tituloPag = "Bienvenidos"
    this.productosService.editarTitulo(this.tituloPag);
  }

  ngOnDestroy(): void {
    const header: any = document.querySelector('.header_area');
    const footer: any = document.querySelector('.footer_area');
    header.classList.remove('d-none');
    footer.classList.remove('d-none');
    this.productosService.reiniciarTitulo(this.tituloPag);
  }
}
