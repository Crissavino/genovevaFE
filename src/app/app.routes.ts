import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { AdminComponent } from './components/admin/admin.component';
import { EcommerceComponent } from './components/admin/ecommerce/ecommerce.component';
import { VentasComponent } from './components/admin/ventas/ventas.component';
import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
import { ProductoEcommerceComponent } from './components/admin/ecommerce/producto-ecommerce.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent },
    // { path: 'shop/producto:id', component: ShopComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'politicas', component: PoliticasComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/ecommerce', component: EcommerceComponent },
    { path: 'admin/ecommerce/producto/:id', component: ProductoEcommerceComponent },
    { path: 'admin/ventas', component: VentasComponent },
    { path: 'admin/estadisticas', component: EstadisticasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
