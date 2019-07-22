import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinProductosGuard implements CanActivate {
  canActivate(): boolean {
    // si el carrito tiene productos duvuelve verdadero y paso
    return true;
    // si el carrito no tiene productos devuelve falso y se va al shop
  }
}
