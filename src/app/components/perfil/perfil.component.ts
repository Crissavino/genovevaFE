import { RegistroService } from 'src/app/services/registro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario: UsuarioModel;

  constructor(
    private registroService: RegistroService,
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(parametro => {
      this.registroService
        .getUsuario(parametro['id'])
        .subscribe((usuario: any) => {
          this.usuario = usuario;
        });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.productosService.cargarScript('assets/template/js/active.js');
    }, 1000);
  }

  logout() {
    localStorage.removeItem('logueado');
    localStorage.removeItem('userId');
    // if (localStorage.getItem('email')) {
    //   localStorage.removeItem('email');
    // }
    this.registroService.logout();
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy() {
    this.productosService.borrarScript('assets/template/js/active.js');
  }
}
