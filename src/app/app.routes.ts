import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductoDetalleComponent } from './components/shop/producto-detalle.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
// import { AdminComponent } from './components/admin/admin.component';
// import { EcommerceComponent } from './components/admin/ecommerce/ecommerce.component';
// import { VentasComponent } from './components/admin/ventas/ventas.component';
// import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
// import { ProductoEcommerceComponent } from './components/admin/ecommerce/producto-ecommerce.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/registro/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FavoritosComponent } from './components/perfil/favoritos/favoritos.component';
import { AuthGuard } from './guards/auth.guard';
import { SideCartComponent } from './components/shared/side-cart/side-cart.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ProductosDescuentoComponent } from './components/productos-descuento/productos-descuento.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'carrito', component: SideCartComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'shop/producto/:id', component: ProductoDetalleComponent },
    { path: 'shop/descuentos', component: ProductosDescuentoComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [ AuthGuard ] },
    { path: 'faqs', component: FaqsComponent },
    { path: 'politicas', component: PoliticasComponent },
    // { path: 'admin', component: AdminComponent },
    // { path: 'admin/ecommerce', component: EcommerceComponent },
    // { path: 'admin/ecommerce/producto/:id', component: ProductoEcommerceComponent },
    // { path: 'admin/ventas', component: VentasComponent },
    // { path: 'admin/estadisticas', component: EstadisticasComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil/:id', component: PerfilComponent, canActivate: [ AuthGuard ] },
    { path: 'favoritos/:id', component: FavoritosComponent, canActivate: [ AuthGuard ] },
    { path: 'busqueda/:termino', component: BusquedaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];

// export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true, onSameUrlNavigation: 'reload' });
