import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistroService } from '../services/registro.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private registroService: RegistroService, private router: Router) {}

  canActivate(): boolean {
    if (this.registroService.estaLogueado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      Swal.fire({
        title: 'Primero tenes que iniciar sesión en tu cuenta o crear una',
        type: 'warning',
        allowOutsideClick: false
      });
      return false;
    }
  }
}
