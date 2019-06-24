import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// agregados por mi
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SideCartComponent } from './components/shared/side-cart/side-cart.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { ProductoComponent } from './components/shop/producto.component';
import { AdminComponent } from './components/admin/admin.component';
import { EcommerceComponent } from './components/admin/ecommerce/ecommerce.component';
import { VentasComponent } from './components/admin/ventas/ventas.component';
import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
import { ProductoEcommerceComponent } from './components/admin/ecommerce/producto-ecommerce.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { ProductosService } from './services/productos.service';
import { ProductoDetalleComponent } from './components/shop/producto-detalle.component';
import { PopularProductsComponent } from './components/home/popular-products.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/registro/login.component';
import { RegistroService } from './services/registro.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FavoritosComponent } from './components/perfil/favoritos/favoritos.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ProductoBuscadoComponent } from './components/busqueda/producto-buscado/producto-buscado.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductosDescuentoComponent } from './components/productos-descuento/productos-descuento.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideCartComponent,
    HomeComponent,
    ShopComponent,
    FaqsComponent,
    PoliticasComponent,
    ProductoComponent,
    AdminComponent,
    EcommerceComponent,
    VentasComponent,
    EstadisticasComponent,
    ProductoEcommerceComponent,
    NgDropFilesDirective,
    ProductoDetalleComponent,
    PopularProductsComponent,
    RegistroComponent,
    LoginComponent,
    PerfilComponent,
    FavoritosComponent,
    CheckoutComponent,
    BusquedaComponent,
    ProductoBuscadoComponent,
    ProductosDescuentoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    APP_ROUTING
  ],
  providers: [
    ProductosService,
    RegistroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
