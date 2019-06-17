(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<app-side-cart></app-side-cart>\n<div class=\"\">\n  <router-outlet></router-outlet>\n</div>\n<app-footer></app-footer>\n\n<!-- <form class=\"mt-3\" (ngSubmit)=\"pruebaPost()\" #forma=\"ngForm\">\n  <div class=\"form-group\">\n    <label class=\"\" for=\"\">Titulo</label>\n    <input class=\"form-control\" type=\"text\" name=\"title\" id=\"\" [(ngModel)]=\"ejemplo.title\">\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"\" for=\"\">Descripcion</label>\n    <input class=\"form-control\" type=\"text\" name=\"description\" id=\"\" [(ngModel)]=\"ejemplo.description\">\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-outline-secondary m-5\">Enviar</button>\n\n</form>\n\n<button [disabled]=\"forma.invalid\" class=\"btn btn-outline-primary m-5\" (click)=\"prueba()\">Console Log Datos\n  DB</button> -->\n<!-- <div>\n  <table class=\"ml-3 table-bordered\">\n    <thead>\n      <tr>\n        <th></th>\n        <th>Titulo</th>\n        <th>Descripcion</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr *ngFor=\"let ejDB of ejemplosDB; let i=index\">\n        <td>{{ i + 1 }}</td>\n        <td>{{ejDB.title}}</td>\n        <td>{{ejDB.description}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div> -->\n  <!-- {{ ejemplosDB['title'] | json }} -->\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/admin/admin.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/admin/admin.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- sidebar -->\n  <nav class=\"nav flex-column\">\n    <ul>\n      <li class=\"d-block\"><a class=\"ml-4 mt-4\" href=\"#\">E-Commerce</a></li>\n      <li class=\"d-block\"><a class=\"ml-4 mt-4 pt-4\" href=\"#\">Ventas</a></li>\n    </ul>\n  </nav>\n<!-- fin sidebar -->\n\n<!-- contenido -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/admin/ecommerce/ecommerce.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/admin/ecommerce/ecommerce.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 100px;\">\n\n  <!-- <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"pocoStock()\">Agregar Producto</button> -->\n  <div class=\"row animated fadeIn fast\">\n    <div class=\"col-md-12 text-right mb-2\">\n      <button [routerLink]=\"['/admin/ecommerce/producto', 'nuevo']\" type=\"button\" class=\"btn btn-outline-success\">Agregar\n        producto</button>\n    </div>\n  </div>\n\n  <!-- <table class=\"table table-hover table-barderless mt-15\">\n    <thead class=\"thead-light\">\n      <tr>\n        <th class=\"text-center\" scope=\"col\"># ID</th>\n        <th class=\"text-center\" scope=\"col\">Producto</th>\n        <th class=\"text-center\" scope=\"col\">Stock</th>\n        <th scope=\"col\"></th>\n      </tr>\n    </thead>\n    <tbody>\n\n      <tr *ngFor=\"let producto of this.productosBD\">\n        <th class=\"w-25\" scope=\"row\">{{ producto.id }}</th>\n        <td class=\"w-25\">{{ producto.titulo }}</td>\n        <td \n          [style.background-color]=\"producto.stock == 1 ? 'yellow' : producto.stock == 0 ? 'red' : 'inherit'\"\n          class=\"w-25\">{{ producto.stock }}</td>\n        <td class=\"w-25 text-center\">\n          <a (click)=\"editarProducto()\" class=\"mr-4\" href=\"/\"><span style=\"color: blue;\"><i class=\"far fa-2x fa-edit d-inline-block\"></i></span></a>\n          <a (click)=\"borrarProducto()\" class=\"ml-4\" href=\"/\"><span style=\"color: red;\"><i\n                class=\"fas fa-2x fa-trash d-inline-block\"></i></span></a>\n        </td>\n      </tr>\n      \n    </tbody>\n  </table> -->\n\n  <table class=\"table table-hover table-borderless animated fadeIn fast\">\n    <thead class=\"thead-light\">\n      <tr>\n        <th class=\"text-center\" scope=\"col\"># ID</th>\n        <th class=\"text-center\" scope=\"col\">Producto</th>\n        <th class=\"text-center\" scope=\"col\">Stock</th>\n        <th scope=\"col\"></th>\n      </tr>\n    </thead>\n    <tbody>\n\n      <tr *ngFor=\"let producto of this.productosBD\">\n\n        <th class=\"w-25\" scope=\"row\">{{ producto.id }}</th>\n\n        <td class=\"w-25\">{{ producto.titulo }}</td>\n\n        <td [style.background-color]=\"producto.stock == 1 ? 'yellow' : producto.stock == 0 ? 'red' : 'inherit'\"\n          class=\"w-25\">{{ producto.stock }}</td>\n        <td class=\"w-25 text-center\">\n          <button [routerLink]=\"['/admin/ecommerce/producto', producto.id]\" class=\"mr-2 btn btn-outline-primary\">Editar</button>\n          <button (click)=\"borrarProducto(producto.id)\" class=\"btn btn-outline-danger\">Eliminar</button>\n        </td>\n\n      </tr>\n\n    </tbody>\n  </table>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/admin/ecommerce/producto-ecommerce.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/admin/ecommerce/producto-ecommerce.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"cargando\" class=\"alert alert-warning text-center\" role=\"alert\">\n  <strong>Cargando...</strong> por favor espere\n</div>\n\n<div *ngIf=\"!cargando\" class=\"container mt-100\">\n  <h3 *ngIf=\"producto\">Producto <small>{{ producto.titulo }}</small> </h3>\n  <h3 *ngIf=\"!producto\">Nuevo Producto</h3>\n  <button class=\"btn btn-outline-danger\" [routerLink]=\"['/admin/ecommerce']\">Regresar</button>\n\n  <hr>\n\n  <div *ngIf=\"actualizando\" class=\"alert alert-info text-center\" role=\"alert\">\n    <strong>Actualizando...</strong> por favor espere\n  </div>\n\n  <div *ngIf=\"!actualizando\" class=\"row animated fadeIn fast\">\n    <div class=\"col-md-12\">\n\n      <form (ngSubmit)=\"guardarProducto(forma.value)\" #forma=\"ngForm\" enctype='multipart/form-data'>\n\n        <div class=\"form-group\">\n          <label for=\"\">Titulo</label>\n          <input type=\"text\" name=\"nombre\" class=\"form-control\" placeholder=\"Título del producto\" required\n            [(ngModel)]=\"producto.titulo\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Categoria Principal</label>\n          <select name=\"categoria_id\" class=\"form-control\" required [(ngModel)]=\"producto.categoria_id\">\n            <option *ngFor=\"let categoria of this.categoriasP\" value=\"{{ categoria.id }}\">{{ categoria.nombre }}</option>\n          </select>\n        </div>\n\n        <label for=\"\">Categoria secundaria</label><small> - podes seleccionar hasta 3</small><br>\n\n        <div *ngFor=\"let categoria of this.categoriasS\" class=\"form-group d-inline-flex mr-3\">\n          <label class=\"mr-1\" for=\"\">{{ categoria.nombre }}</label>\n          <input type=\"checkbox\" name=\"categoriaSecundaria[]\" value=\"{{ categoria.id }}\" id=\"\">\n          <!-- <input type=\"checkbox\" name=\"categoriaSecundaria[]\"\n            value=\"categoria{{ categoria.id }}\" id=\"\" [(ngModel)]=\"producto.categoriaSecundaria\"> -->\n        </div>\n\n        <div class=\"form-group row\">\n          <div class=\"col-6\">\n            <div *ngIf=\"producto.imagen1\">\n              <label for=\"\">Imágen cargada anteriormente</label>\n              <img src=\"{{ producto.imagen1 }}\" class=\"d-block\" width=\"200px\" alt=\"\">\n            </div>\n\n            <label for=\"\">Seleccioná las imagenes que se verán en el shop</label>\n            <div appNgDropFiles [imagen1]=\"imagen1\" (mouseSobre)=\"estaSobreElemento = $event\"\n              [ngClass]=\"{'file-over': estaSobreElemento}\" class=\"well drop-zone\">\n              <h4>Dejá caer acá el archivo</h4>\n              <img src=\"assets/drop-images.png\" alt=\"\">\n            </div>\n\n            <table class=\"table-info\" *ngIf=\"this.imagen1 !== []\">\n              <thead class=\"\">\n                <th class=\"col-3\">Nombre</th>\n                <th class=\"col-3\">Tamaño</th>\n              </thead>\n\n              <tbody class=\"\">\n                <tr *ngFor=\"let imagen of this.imagen1\">\n                  <td class=\"col-2\">{{ imagen.archivo.name }}</td>\n                  <td class=\"col-2\">{{ imagen.archivo.size / 1024 / 1024 | number: '.2-2' }} MB</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n\n          <!-- <div class=\"col-6\">\n            <div class=\"form-group\">\n              <label for=\"\">Seleccioná la segunda imagen</label>\n              <div appNgDropFiles [imagen2]=\"imagen2\" (mouseSobre)=\"estaSobreElemento = $event\"\n                [ngClass]=\"{'file-over': estaSobreElemento}\"\n                class=\"well drop-zone\">\n                <h4>Dejá caer acá el archivo</h4>\n                <img src=\"assets/drop-images.png\" alt=\"\">\n              </div>\n              \n              <img src=\"{{ producto.imagen2 }}\" width=\"200px\" alt=\"\">\n            </div>\n          </div> -->\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Detalle</label>\n          <input type=\"text\" name=\"detalle\" class=\"form-control\" placeholder=\"Detalle\" required\n            [(ngModel)]=\"producto.detalle\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Descripción</label>\n          <textarea name=\"descripcion\" cols=\"30\" rows=\"10\" class=\"form-control\" [(ngModel)]=\"producto.descripcion\"></textarea>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Precio</label>\n          <input type=\"number\" name=\"precio\" class=\"form-control\" placeholder=\"Precio\" required\n            [(ngModel)]=\"producto.precio\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Descuento</label><small> - en porcentaje</small>\n          <input type=\"number\" name=\"descuento\" class=\"form-control\" placeholder=\"Descuento en porcentaje\" required\n            [(ngModel)]=\"producto.descuento\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"\">Stock</label>\n          <input type=\"number\" name=\"stock\" class=\"form-control\" placeholder=\"Stock\" required\n            [(ngModel)]=\"producto.stock\">\n        </div>\n\n        <div class=\"form-group\">\n          <button [disabled]=\"forma.invalid\" type=\"submit\" class=\"btn btn-outline-primary\">Guardar cambios</button>\n        </div>\n\n      </form>\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/admin/estadisticas/estadisticas.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/admin/estadisticas/estadisticas.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  estadisticas works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/admin/ventas/ventas.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/admin/ventas/ventas.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  ventas works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/faqs/faqs.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/faqs/faqs.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  faqs works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/home/home.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/home/home.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ##### Welcome Area Start ##### -->\n<section class=\"welcome_area bg-img background-overlay\"\n  style=\"background-image: url(../../../assets/template/img/bg-img/bg-1.jpg);\">\n  <div class=\"container h-100\">\n    <div class=\"row h-100 align-items-center\">\n      <div class=\"col-12\">\n        <div class=\"hero-content\">\n          <h6>asoss</h6>\n          <h2>New Collection</h2>\n          <a href=\"#\" class=\"btn essence-btn\">view collection</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n<!-- ##### Welcome Area End ##### -->\n\n<!-- ##### Top Catagory Area Start ##### -->\n<div class=\"top_catagory_area section-padding-80 clearfix\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <!-- Single Catagory -->\n      <div class=\"col-12 col-sm-6 col-md-4\">\n        <div class=\"single_catagory_area d-flex align-items-center justify-content-center bg-img\"\n          style=\"background-image: url(../../../assets/template/img/bg-img/bg-2.jpg);\">\n          <!-- ../img/core-img/long-arrow-left.svg -->\n          <div class=\"catagory-content\">\n            <a href=\"#\">Clothing</a>\n          </div>\n        </div>\n      </div>\n      <!-- Single Catagory -->\n      <div class=\"col-12 col-sm-6 col-md-4\">\n        <div class=\"single_catagory_area d-flex align-items-center justify-content-center bg-img\"\n          style=\"background-image: url(../../../assets/template/img/bg-img/bg-3.jpg);\">\n          <div class=\"catagory-content\">\n            <a href=\"#\">Shoes</a>\n          </div>\n        </div>\n      </div>\n      <!-- Single Catagory -->\n      <div class=\"col-12 col-sm-6 col-md-4\">\n        <div class=\"single_catagory_area d-flex align-items-center justify-content-center bg-img\"\n          style=\"background-image: url(../../../assets/template/img/bg-img/bg-4.jpg);\">\n          <div class=\"catagory-content\">\n            <a href=\"#\">Accessories</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- ##### Top Catagory Area End ##### -->\n\n<!-- ##### CTA Area Start ##### -->\n<div class=\"cta-area\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"cta-content bg-img background-overlay\"\n          style=\"background-image: url(../../../assets/template/img/bg-img/bg-5.jpg);\">\n          <div class=\"h-100 d-flex align-items-center justify-content-end\">\n            <div class=\"cta--text\">\n              <h6>-60%</h6>\n              <h2>Global Sale</h2>\n              <a href=\"#\" class=\"btn essence-btn\">Buy Now</a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- ##### CTA Area End ##### -->\n\n <!-- ##### New Arrivals Area Start ##### -->\n <section class=\"new_arrivals_area section-padding-80 clearfix\">\n   <div class=\"container\">\n     <div class=\"row\">\n       <div class=\"col-12\">\n         <div class=\"section-heading text-center\">\n           <h2>Popular Products</h2>\n         </div>\n       </div>\n     </div>\n   </div>\n\n   <div class=\"container\">\n     <div class=\"row\">\n       <div class=\"col-12\">\n         <div class=\"popular-products-slides owl-carousel\">\n\n           <!-- Single Product -->\n           <div class=\"single-product-wrapper\">\n             <!-- Product Image -->\n             <div class=\"product-img\">\n               <img src=\"../../../assets/template/img/product-img/product-1.jpg\" alt=\"\">\n               <!-- Hover Thumb -->\n               <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-2.jpg\" alt=\"\">\n               <!-- Favourite -->\n               <div class=\"product-favourite\">\n                 <a href=\"#\" class=\"favme fa fa-heart\"></a>\n               </div>\n             </div>\n             <!-- Product Description -->\n             <div class=\"product-description\">\n               <span>topshop</span>\n               <a href=\"single-product-details.html\">\n                 <h6>Knot Front Mini Dress</h6>\n               </a>\n               <p class=\"product-price\">$80.00</p>\n\n               <!-- Hover Content -->\n               <div class=\"hover-content\">\n                 <!-- Add to Cart -->\n                 <div class=\"add-to-cart-btn\">\n                   <a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>\n                 </div>\n               </div>\n             </div>\n           </div>\n\n           <!-- Single Product -->\n           <div class=\"single-product-wrapper\">\n             <!-- Product Image -->\n             <div class=\"product-img\">\n               <img src=\"../../../assets/template/img/product-img/product-2.jpg\" alt=\"\">\n               <!-- Hover Thumb -->\n               <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-3.jpg\" alt=\"\">\n               <!-- Favourite -->\n               <div class=\"product-favourite\">\n                 <a href=\"#\" class=\"favme fa fa-heart\"></a>\n               </div>\n             </div>\n             <!-- Product Description -->\n             <div class=\"product-description\">\n               <span>topshop</span>\n               <a href=\"single-product-details.html\">\n                 <h6>Poplin Displaced Wrap Dress</h6>\n               </a>\n               <p class=\"product-price\">$80.00</p>\n\n               <!-- Hover Content -->\n               <div class=\"hover-content\">\n                 <!-- Add to Cart -->\n                 <div class=\"add-to-cart-btn\">\n                   <a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>\n                 </div>\n               </div>\n             </div>\n           </div>\n\n           <!-- Single Product -->\n           <div class=\"single-product-wrapper\">\n             <!-- Product Image -->\n             <div class=\"product-img\">\n               <img src=\"../../../assets/template/img/product-img/product-3.jpg\" alt=\"\">\n               <!-- Hover Thumb -->\n               <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-4.jpg\" alt=\"\">\n\n               <!-- Product Badge -->\n               <div class=\"product-badge offer-badge\">\n                 <span>-30%</span>\n               </div>\n\n               <!-- Favourite -->\n               <div class=\"product-favourite\">\n                 <a href=\"#\" class=\"favme fa fa-heart\"></a>\n               </div>\n             </div>\n             <!-- Product Description -->\n             <div class=\"product-description\">\n               <span>mango</span>\n               <a href=\"single-product-details.html\">\n                 <h6>PETITE Crepe Wrap Mini Dress</h6>\n               </a>\n               <p class=\"product-price\"><span class=\"old-price\">$75.00</span> $55.00</p>\n\n               <!-- Hover Content -->\n               <div class=\"hover-content\">\n                 <!-- Add to Cart -->\n                 <div class=\"add-to-cart-btn\">\n                   <a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>\n                 </div>\n               </div>\n             </div>\n           </div>\n\n           <!-- Single Product -->\n           <div class=\"single-product-wrapper\">\n             <!-- Product Image -->\n             <div class=\"product-img\">\n               <img src=\"../../../assets/template/img/product-img/product-4.jpg\" alt=\"\">\n               <!-- Hover Thumb -->\n               <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-5.jpg\" alt=\"\">\n\n               <!-- Product Badge -->\n               <div class=\"product-badge new-badge\">\n                 <span>New</span>\n               </div>\n\n               <!-- Favourite -->\n               <div class=\"product-favourite\">\n                 <a href=\"#\" class=\"favme fa fa-heart\"></a>\n               </div>\n             </div>\n             <!-- Product Description -->\n             <div class=\"product-description\">\n               <span>mango</span>\n               <a href=\"single-product-details.html\">\n                 <h6>PETITE Belted Jumper Dress</h6>\n               </a>\n               <p class=\"product-price\">$80.00</p>\n\n               <!-- Hover Content -->\n               <div class=\"hover-content\">\n                 <!-- Add to Cart -->\n                 <div class=\"add-to-cart-btn\">\n                   <a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>\n                 </div>\n               </div>\n             </div>\n           </div>\n\n         </div>\n       </div>\n     </div>\n   </div>\n </section>\n <!-- ##### New Arrivals Area End ##### -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/home/popular-products.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/home/popular-products.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  popular-products works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/perfil/favoritos/favoritos.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/perfil/favoritos/favoritos.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Single Product -->\n<!-- <div class=\"col-12 col-sm-6 col-lg-4\"> -->\n<div class=\"single-product-wrapper\">\n  <!-- Product Image -->\n  <div class=\"product-img\">\n    <!-- <div class=\"product-img\" style=\"height: 210px\"> -->\n    <img [src]=\"producto.path[0]\" alt=\"\">\n    <!-- Hover Thumb -->\n    <!-- <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-2.jpg\" alt=\"\"> -->\n    <img class=\"hover-img\" [src]=\"producto.path[1]\" alt=\"\">\n\n    <!-- Product Badge -->\n    <div class=\"product-badge offer-badge\">\n      <span>-{{ (producto.descuento/100) | percent}}</span>\n    </div>\n    <!-- Favourite -->\n    <div class=\"product-favourite\">\n      <a href=\"#\" class=\"favme fa fa-heart\"></a>\n    </div>\n  </div>\n\n  <!-- Product Description -->\n  <div class=\"product-description\">\n    <span>{{ producto.categoria_id }}</span>\n    <a [routerLink]=\"['/shop/producto/', producto.id]\">\n      <h6>{{ producto.titulo }}</h6>\n    </a>\n    <p *ngIf=\"producto.descuento\" class=\"product-price\">\n      <span class=\"old-price\">{{ producto.precio | currency }}</span>\n      <!-- {{ (producto.precio/producto.descuento) | currency }} -->\n      {{ (producto.precio - (producto.descuento/100)*(producto.precio)) | currency }}\n    </p>\n    <p *ngIf=\"!producto.descuento\" class=\"product-price\">\n      {{ producto.precio | currency }}\n    </p>\n\n    <!-- Hover Content -->\n    <div class=\"hover-content\">\n      <!-- Add to Cart -->\n      <div class=\"add-to-cart-btn\">\n        <a href=\"#\" class=\"btn essence-btn\">agregar</a>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- </div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/perfil/perfil.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/perfil/perfil.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"usuario\"  class=\"container\">\n  <div class=\"row animated fadeIn fast\">\n    <div class=\"col-md-12 text-right mb-2\">\n      <button (click)=\"logout()\" class=\"btn btn-danger mt-5\">Cerrar sesión</button>\n    </div>\n  </div>\n  <div class=\"mt-3 mb-5\">\n    <h2>Hola {{ usuario.name }} {{ usuario.lastname }}</h2>\n    <h5>Estos son tus pedidos</h5>\n  </div>\n  <div mb-5>\n    <table class=\"table\">\n      <thead class=\"thead-light\">\n        <tr>\n          <th scope=\"col\">Título</th>\n          <th scope=\"col\">Cantidad</th>\n          <th scope=\"col\">Precio</th>\n          <th scope=\"col\">Estado</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <th scope=\"row\">safdasdf</th>\n          <td>12312</td>\n          <td>12312</td>\n          <td>asdasd</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/politicas/politicas.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/politicas/politicas.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  politicas works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/registro/login.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/registro/login.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"limiter animated fadeInLeft\">\n  <div class=\"container-login100\">\n    <div class=\"wrap-login100 p-t-50 p-b-90\">\n      <form #formRegistro=\"ngForm\" (ngSubmit)=\"login( formRegistro )\"\n        class=\"login100-form validate-form flex-sb flex-w\">\n\n        <span class=\"login100-form-title p-b-51\">\n          Login\n        </span>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['email'].errors\"\n          class=\"text-danger animated fadeIn\">El correo es obligatorio</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100\" type=\"text\" required email [(ngModel)]=\"usuario.email\" name=\"email\"\n            placeholder=\"Email\">\n\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['password'].errors\"\n          class=\"text-danger animated fadeIn\">La contraseña debe de ser más de 6 letras</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 password\" type=\"password\" minlength=\"6\" required name=\"password\" [(ngModel)]=\"usuario.password\"\n            placeholder=\"Password\">\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <div class=\"flex-sb-m w-full p-t-3 p-b-24\">\n          <div class=\"contact100-form-checkbox\">\n            <input [(ngModel)]=\"recordarme\" class=\"input-checkbox100\" id=\"ckb1\" type=\"checkbox\" name=\"remember-me\">\n            <label class=\"label-checkbox100\" for=\"ckb1\">\n              Recordar mi usuario\n            </label>\n          </div>\n\n          <div>\n            <a routerLink=\"/registro\" class=\"txt1\">\n              ¿No tienes cuenta?\n            </a>\n          </div>\n        </div>\n\n        <div class=\"container-login100-form-btn m-t-17\">\n          <button class=\"login100-form-btn\" type=\"submit\">\n            Ingresar\n          </button>\n        </div>\n\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/registro/registro.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/registro/registro.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"limiter animated fadeInRight\">\n  <div class=\"container-login100\">\n    <div class=\"wrap-login100 p-t-50 p-b-90\">\n      <form (ngSubmit)=\"onSubmit( formRegistro )\" #formRegistro=\"ngForm\"\n        class=\"login100-form validate-form flex-sb flex-w\">\n\n        <span class=\"login100-form-title p-b-51\">\n          Crear nueva cuenta\n        </span>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['email'].errors\"\n          class=\"text-danger animated fadeIn\">El correo es\n          obligatorio</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 email\" type=\"text\" name=\"email\" email required [(ngModel)]=\"usuario.email\"\n            placeholder=\"Email\">\n\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['nombre'].errors\"\n          class=\"text-danger animated fadeIn\">El nombre es obligatorio</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 nombre\" type=\"text\" name=\"nombre\" required [(ngModel)]=\"usuario.nombre\"\n            placeholder=\"Nombre\">\n\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['apellido'].errors\"\n          class=\"text-danger animated fadeIn\">El apellido es obligatorio</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 apellido\" type=\"text\" required name=\"apellido\" [(ngModel)]=\"usuario.apellido\"\n            placeholder=\"Apellido/s\">\n\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['password'].errors\"\n          class=\"text-danger animated fadeIn\">La contraseña debe de ser más de 6 letras</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 password\" type=\"password\" required minlength=\"6\" name=\"password\" [(ngModel)]=\"usuario.password\"\n            placeholder=\"Contraseña\">\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <span *ngIf=\"formRegistro.submitted && formRegistro.controls['repassword'].errors\"\n          class=\"text-danger animated fadeIn\">La recontraseña debe de ser más de 6 letras</span>\n        <div class=\"wrap-input100 m-b-16\">\n          <input class=\"input100 repassword\" type=\"password\" required name=\"repassword\" [(ngModel)]=\"usuario.repassword\"\n            placeholder=\"Repetí la constraseña\">\n          <span class=\"focus-input100\"></span>\n        </div>\n\n        <div class=\"flex-sb-m w-full p-t-3 p-b-24\">\n          <div class=\"contact100-form-checkbox\">\n            <input [(ngModel)]=\"recordarme\" class=\"input-checkbox100\" id=\"ckb1\" type=\"checkbox\" name=\"remember-me\">\n            <label class=\"label-checkbox100\" for=\"ckb1\">\n              Recordar mi usuario\n            </label>\n          </div>\n\n          <div>\n            <a routerLink=\"/login\" class=\"txt1\">\n              ¿Ya tienes cuenta? / Ingresar\n            </a>\n          </div>\n        </div>\n\n        <div class=\"container-login100-form-btn m-t-17\">\n          <button class=\"login100-form-btn\" type=\"submit\">\n            Crear cuenta\n          </button>\n        </div>\n\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shared/footer/footer.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shared/footer/footer.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ##### Footer Area Start ##### -->\n<footer class=\"footer_area clearfix\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <!-- Single Widget Area -->\n      <div class=\"col-12 col-md-6\">\n        <div class=\"single_widget_area d-flex mb-30\">\n          <!-- Logo -->\n          <div class=\"footer-logo mr-50\">\n            <a href=\"#\"><img src=\"../../../../assets/template/img/core-img/logo2.png\" alt=\"\"></a>\n          </div>\n          <!-- Footer Menu -->\n          <div class=\"footer_menu\">\n            <ul>\n              <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'shop' ]\">Shop</a></li>\n              <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'faqs' ]\">Preguntas frecuentes</a>\n              <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'politicas' ]\">Políticas</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <!-- Single Widget Area -->\n      <div class=\"col-12 col-md-6\">\n        <div class=\"single_widget_area mb-30\">\n          <ul class=\"footer_widget_menu\">\n            <li><a href=\"#\">Order Status</a></li>\n            <li><a href=\"#\">Payment Options</a></li>\n            <li><a href=\"#\">Shipping and Delivery</a></li>\n            <li><a href=\"#\">Guides</a></li>\n            <li><a href=\"#\">Privacy Policy</a></li>\n            <li><a href=\"#\">Terms of Use</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row align-items-end\">\n      <!-- Single Widget Area -->\n      <div class=\"col-12 col-md-6\">\n        <div class=\"single_widget_area\">\n          <div class=\"footer_heading mb-30\">\n            <h6>Subscribe</h6>\n          </div>\n          <div class=\"subscribtion_form\">\n            <form action=\"#\" method=\"post\">\n              <input type=\"email\" name=\"mail\" class=\"mail\" placeholder=\"Your email here\">\n              <button type=\"submit\" class=\"submit\"><i class=\"fa fa-long-arrow-right\" aria-hidden=\"true\"></i></button>\n            </form>\n          </div>\n        </div>\n      </div>\n      <!-- Single Widget Area -->\n      <div class=\"col-12 col-md-6\">\n        <div class=\"single_widget_area\">\n          <div class=\"footer_social_area\">\n            <a href=\"https://www.facebook.com/genovevaok/\" data-toggle=\"tooltip\" data-placement=\"top\"\n              title=\"Facebook\"><i class=\"fa fa-facebook\"\n                aria-hidden=\"true\"></i></a>\n            <a href=\"https://www.instagram.com/genovevaok/\" data-toggle=\"tooltip\" data-placement=\"top\"\n              title=\"Instagram\"><i class=\"fa fa-instagram\"\n                aria-hidden=\"true\"></i></a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row mt-5\">\n      <div class=\"col-md-12 text-center\">\n        <p>\n          Copyright &copy;\n          <script>\n            document.write(new Date().getFullYear());\n          </script> \n          Todos los derechos reservados | Desarrollado por <a href=\"https://jackcode.cf\" target=\"_blank\">jackCode</a>\n        </p>\n      </div>\n    </div>\n\n  </div>\n</footer>\n<!-- ##### Footer Area End ##### -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shared/header/header.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shared/header/header.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ##### Header Area Start ##### -->\n<header class=\"header_area\">\n  <div class=\"classy-nav-container breakpoint-off d-flex align-items-center justify-content-between\">\n    <!-- Classy Menu -->\n    <nav class=\"classy-navbar\" id=\"essenceNav\">\n      <!-- Logo -->\n      <a class=\"nav-brand\" [routerLink]=\"[ 'home' ]\"><img\n          src=\"../../../../assets/template/img/core-img/logo.png\" alt=\"\"></a>\n      <!-- Navbar Toggler -->\n      <div class=\"classy-navbar-toggler\">\n        <span class=\"navbarToggler\"><span></span><span></span><span></span></span>\n      </div>\n      <!-- Menu -->\n      <div class=\"classy-menu\">\n        <!-- close btn -->\n        <div class=\"classycloseIcon\">\n          <div class=\"cross-wrap\"><span class=\"top\"></span><span class=\"bottom\"></span></div>\n        </div>\n        <!-- Nav Start -->\n        <div class=\"classynav\">\n          <ul>\n            <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'shop' ]\">Shop</a></li>\n            <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'faqs' ]\">Preguntas frecuentes</a>\n            <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'politicas' ]\">Políticas</a></li>\n            <!-- <li><a>Tablero Angular</a>\n              <ul class=\"dropdown\">\n                <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'admin/ecommerce' ]\">E-Commerce</a></li>\n                <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'admin/ventas' ]\">Ventas</a></li>\n                <li routerLinkActive=\"active\"><a [routerLink]=\"[ 'admin/estadisticas' ]\">Estadísticas</a></li>\n              </ul>\n            </li> -->\n            <li><a href=\"http://127.0.0.1:8000/admin\">Tablero Laravel</a></li>\n          </ul>\n        </div>\n        <!-- Nav End -->\n      </div>\n    </nav>\n\n    <!-- Header Meta Data -->\n    <div class=\"header-meta d-flex clearfix justify-content-end\">\n      <!-- Search Area -->\n      <div class=\"search-area\">\n        <form action=\"#\" method=\"post\">\n          <input type=\"search\" name=\"search\" id=\"headerSearch\" placeholder=\"Type for search\">\n          <button type=\"submit\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button>\n        </form>\n      </div>\n      <!-- Favourite Area -->\n      <div class=\"favourite-area\">\n        <a [routerLink]=\"['favoritos', userId]\" *ngIf=\"userId\"><img src=\"../../../../assets/template/img/core-img/heart.svg\" alt=\"\"></a>\n        <a [routerLink]=\"['login']\" *ngIf=\"!userId\"><img src=\"../../../../assets/template/img/core-img/heart.svg\" alt=\"\"></a>\n      </div>\n      <!-- User Login Info -->\n      <div class=\"user-login-info\">\n        <!-- <a href=\"http://127.0.0.1:8000/login\"><img src=\"../../../../assets/template/img/core-img/user.svg\" alt=\"\"></a> -->\n        <a [routerLink]=\"['perfil', userId]\" *ngIf=\"userId\"><img src=\"../../../../assets/template/img/core-img/user.svg\"\n            alt=\"\"></a>\n        <a [routerLink]=\"['login']\" *ngIf=\"!userId\"><img src=\"../../../../assets/template/img/core-img/user.svg\"\n            alt=\"\"></a>\n      </div>\n      <!-- Cart Area -->\n      <div class=\"cart-area\">\n        <a href=\"#\" id=\"essenceCartBtn\"><img src=\"../../../../assets/template/img/core-img/bag.svg\" alt=\"\">\n          <span>3</span>\n        </a>\n      </div>\n    </div>\n\n  </div>\n</header>\n<!-- ##### Header Area End ##### -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shared/side-cart/side-cart.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shared/side-cart/side-cart.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ##### Right Side Cart Area ##### -->\n<div class=\"cart-bg-overlay\"></div>\n\n<div class=\"right-side-cart-area\">\n\n  <!-- Cart Button -->\n  <div class=\"cart-button\">\n    <a href=\"#\" id=\"rightSideCart\"><img src=\"../../../../assets/template/img/core-img/bag.svg\" alt=\"\"> <span>3</span></a>\n  </div>\n\n  <div class=\"cart-content d-flex\">\n\n    <!-- Cart List Area -->\n    <div class=\"cart-list\">\n      <!-- Single Cart Item -->\n      <div class=\"single-cart-item\">\n        <a href=\"#\" class=\"product-image\">\n          <img src=\"../../../../assets/template/img/product-img/product-1.jpg\" class=\"cart-thumb\" alt=\"\">\n          <!-- Cart Item Desc -->\n          <div class=\"cart-item-desc\">\n            <span class=\"product-remove\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></span>\n            <span class=\"badge\">Mango</span>\n            <h6>Button Through Strap Mini Dress</h6>\n            <p class=\"size\">Size: S</p>\n            <p class=\"color\">Color: Red</p>\n            <p class=\"price\">$45.00</p>\n          </div>\n        </a>\n      </div>\n\n      <!-- Single Cart Item -->\n      <div class=\"single-cart-item\">\n        <a href=\"#\" class=\"product-image\">\n          <img src=\"../../../../assets/template/img/product-img/product-2.jpg\" class=\"cart-thumb\" alt=\"\">\n          <!-- Cart Item Desc -->\n          <div class=\"cart-item-desc\">\n            <span class=\"product-remove\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></span>\n            <span class=\"badge\">Mango</span>\n            <h6>Button Through Strap Mini Dress</h6>\n            <p class=\"size\">Size: S</p>\n            <p class=\"color\">Color: Red</p>\n            <p class=\"price\">$45.00</p>\n          </div>\n        </a>\n      </div>\n\n      <!-- Single Cart Item -->\n      <div class=\"single-cart-item\">\n        <a href=\"#\" class=\"product-image\">\n          <img src=\"../../../../assets/template/img/product-img/product-3.jpg\" class=\"cart-thumb\" alt=\"\">\n          <!-- Cart Item Desc -->\n          <div class=\"cart-item-desc\">\n            <span class=\"product-remove\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></span>\n            <span class=\"badge\">Mango</span>\n            <h6>Button Through Strap Mini Dress</h6>\n            <p class=\"size\">Size: S</p>\n            <p class=\"color\">Color: Red</p>\n            <p class=\"price\">$45.00</p>\n          </div>\n        </a>\n      </div>\n    </div>\n\n    <!-- Cart Summary -->\n    <div class=\"cart-amount-summary\">\n\n      <h2>Summary</h2>\n      <ul class=\"summary-table\">\n        <li><span>subtotal:</span> <span>$274.00</span></li>\n        <li><span>delivery:</span> <span>Free</span></li>\n        <li><span>discount:</span> <span>-15%</span></li>\n        <li><span>total:</span> <span>$232.00</span></li>\n      </ul>\n      <div class=\"checkout-btn mt-100\">\n        <a href=\"checkout.html\" class=\"btn essence-btn\">check out</a>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- ##### Right Side Cart End ##### -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shop/producto-detalle.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shop/producto-detalle.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"cargando\" style=\"margin-top: 400px; margin-bottom: 300px;\" class=\"row text-center animated fadeIn\">\n  <div class=\"col\">\n\n    <i class=\"fas fa-sync fa-spin fa-2x\"></i>\n\n  </div>\n</div>\n\n<section *ngIf=\"!cargando && productoConImagen\" class=\"single_product_details_area d-flex align-items-center\">\n\n  <!-- Single Product Thumb -->\n  <div class=\"single_product_thumb clearfix\">\n    <div class=\"product_thumbnail_slides owl-carousel\">\n      <img *ngFor=\"let imagen of productoConImagen['path']\" [src]=\"imagen\" alt=\"\">\n    </div>\n  </div>\n\n  <!-- <div *ngIf=\"productoConImagen['path']\" id=\"carouselExampleIndicators\" class=\"carousel slide single_product_thumb clearfix\" data-ride=\"carousel\">\n    <ol class=\"carousel-indicators\">\n      <li *ngIf=\"productoConImagen['path'][0]\" data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\"></li>\n      <li *ngIf=\"productoConImagen['path'][1]\" data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\"></li>\n      <li *ngIf=\"productoConImagen['path'][2]\" data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\"></li>\n      <li *ngIf=\"productoConImagen['path'][3]\" data-target=\"#carouselExampleIndicators\" data-slide-to=\"3\"></li>\n      <li *ngIf=\"productoConImagen['path'][4]\" data-target=\"#carouselExampleIndicators\" data-slide-to=\"4\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div class=\"carousel-item active\">\n        <img src=\"{{productoConImagen['path'][0]}}\" class=\"d-block w-100\" alt=\"...\">\n      </div>\n      <div *ngIf=\"productoConImagen['path'][1]\" class=\"carousel-item\">\n        <img src=\"{{productoConImagen['path'][1]}}\" class=\"d-block w-100\" alt=\"...\">\n      </div>\n      <div *ngIf=\"productoConImagen['path'][2]\" class=\"carousel-item\">\n        <img src=\"{{productoConImagen['path'][2]}}\" class=\"d-block w-100\" alt=\"...\">\n      </div>\n      <div *ngIf=\"productoConImagen['path'][3]\" class=\"carousel-item\">\n        <img src=\"{{productoConImagen['path'][3]}}\" class=\"d-block w-100\" alt=\"...\">\n      </div>\n      <div *ngIf=\"productoConImagen['path'][4]\" class=\"carousel-item\">\n        <img src=\"{{productoConImagen['path'][4]}}\" class=\"d-block w-100\" alt=\"...\">\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n  </div> -->\n\n  <!-- Single Product Description -->\n  <div class=\"single_product_desc clearfix\">\n    <!-- marca\n    <span>mango</span>\n    -->\n\n    <!-- con darle click aca agrego al carrito -->\n    <a href=\"cart.html\">\n      <h2>{{ productoConImagen['titulo'] }}</h2>\n    </a>\n    <p *ngIf=\"productoConImagen['descuento']\" class=\"product-price\"><span class=\"old-price\">{{ productoConImagen['precio'] | currency }}</span> {{ (productoConImagen['precio'] - (productoConImagen['descuento']/100)*(productoConImagen['precio'])) | currency }}</p>\n    <p *ngIf=\"!productoConImagen['descuento']\" class=\"product-price\">{{ productoConImagen['precio'] | currency }}</p>\n    <p class=\"product-desc\">{{ productoConImagen['descripcion'] }}</p>\n\n    <!-- Form -->\n    <form *ngIf=\"stockProducto\" class=\"cart-form clearfix\" method=\"post\">\n      <!-- Select Box -->\n      <div class=\"select-box d-flex mt-50 mb-30\">\n        <select name=\"select\" id=\"productSize\" class=\"mr-5\">\n          <option *ngFor=\"let talle of stockProducto\" value=\"talle.talle_id\">Talle: {{ talle.talle_nombre }}</option>\n        </select>\n      </div>\n      <!-- Cart & Favourite Box -->\n      <div class=\"cart-fav-box d-flex align-items-center\">\n        <!-- Cart -->\n        <button type=\"submit\" name=\"addtocart\" value=\"5\" class=\"btn essence-btn\">Agregar</button>\n        <!-- Favourite -->\n        <div class=\"product-favourite ml-4\">\n          <a href=\"#\" class=\"favme fa fa-heart\"></a>\n        </div>\n      </div>\n    </form>\n\n    <form *ngIf=\"!stockProducto\" class=\"cart-form clearfix\" method=\"post\">\n      <!-- Select Box -->\n      <div class=\"select-box d-flex mt-50 mb-30\">\n        <select name=\"select\" id=\"productSize\" class=\"mr-5\">\n          <option disabled>producto sin stock</option>\n        </select>\n      </div>\n      <!-- Cart & Favourite Box -->\n      <!-- <div class=\"cart-fav-box d-flex align-items-center\"> -->\n        <!-- Cart -->\n        <!-- <button type=\"submit\" name=\"addtocart\" value=\"5\" class=\"btn essence-btn\">Add to cart</button> -->\n        <!-- Favourite -->\n        <!-- <div class=\"product-favourite ml-4\">\n          <a href=\"#\" class=\"favme fa fa-heart\"></a>\n        </div> -->\n      <!-- </div> -->\n    </form>\n  </div>\n</section>\n\n<!-- \n\n<div _ngcontent-tcs-c4=\"\" class=\"single_product_thumb clearfix\">\n  <div _ngcontent-tcs-c4=\"\" class=\"product_thumbnail_slides owl-carousel owl-theme owl-loaded\">\n    <div class=\"owl-stage-outer\">\n      <div class=\"owl-stage\"\n        style=\"transform: translate3d(-2695px, 0px, 0px); transition: all 1s ease 0s; width: 3773px;\">\n        <div class=\"owl-item cloned\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle2.jpeg\"></div>\n        <div class=\"owl-item cloned\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle3.jpeg\"></div>\n        <div class=\"owl-item\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle1.jpeg\"></div>\n        <div class=\"owl-item\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle2.jpeg\"></div>\n        <div class=\"owl-item\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle3.jpeg\"></div>\n        <div class=\"owl-item cloned active\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle1.jpeg\"></div>\n        <div class=\"owl-item cloned\" style=\"width: 539px; margin-right: 0px;\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n            src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/zapatos-ImagenDetalle2.jpeg\"></div>\n      </div>\n    </div>\n    <div class=\"owl-controls\">\n      <div class=\"owl-nav\">\n        <div class=\"owl-prev\" style=\"\"><img src=\"../img/core-img/long-arrow-left.svg\" alt=\"\"></div>\n        <div class=\"owl-next\" style=\"\"><img src=\"../img/core-img/long-arrow-right.svg\" alt=\"\"></div>\n      </div>\n      <div class=\"owl-dots\" style=\"display: none;\"></div>\n    </div>\n  </div>\n</div>\n\n\n<div _ngcontent-tcs-c4=\"\" class=\"single_product_thumb clearfix\">\n  <div _ngcontent-tcs-c4=\"\" class=\"product_thumbnail_slides owl-carousel\"><img _ngcontent-tcs-c4=\"\" alt=\"\"\n      src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/prueba-fe-ImagenDetalle1.jpeg\"><img\n      _ngcontent-tcs-c4=\"\" alt=\"\"\n      src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/prueba-fe-ImagenDetalle2.jpeg\"><img\n      _ngcontent-tcs-c4=\"\" alt=\"\"\n      src=\"http://127.0.0.1:8000/storage/productos/imagenesDetalle/prueba-fe-ImagenDetalle3.jpeg\"></div>\n</div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shop/producto.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shop/producto.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Single Product -->\n<!-- <div class=\"col-12 col-sm-6 col-lg-4\"> -->\n  <div class=\"single-product-wrapper\">\n    <!-- Product Image -->\n    <div class=\"product-img\">\n    <!-- <div class=\"product-img\" style=\"height: 210px\"> -->\n      <img [src]=\"producto.path[0]\" alt=\"\">\n      <!-- Hover Thumb -->\n      <!-- <img class=\"hover-img\" src=\"../../../assets/template/img/product-img/product-2.jpg\" alt=\"\"> -->\n      <img class=\"hover-img\" [src]=\"producto.path[1]\" alt=\"\">\n\n      <!-- Product Badge -->\n      <div class=\"product-badge offer-badge\">\n        <span>-{{ (producto.descuento/100) | percent}}</span>\n      </div>\n      <!-- Favourite -->\n      <div class=\"product-favourite\">\n        <a href=\"#\" class=\"favme fa fa-heart\"></a>\n      </div>\n    </div>\n\n    <!-- Product Description -->\n    <div class=\"product-description\">\n      <span>{{ producto.categoria_id }}</span>\n      <a [routerLink]=\"['/shop/producto/', producto.id]\">\n        <h6>{{ producto.titulo }}</h6>\n      </a>\n      <p *ngIf=\"producto.descuento\" class=\"product-price\">\n        <span class=\"old-price\">{{ producto.precio | currency }}</span>\n        <!-- {{ (producto.precio/producto.descuento) | currency }} -->\n        {{ (producto.precio - (producto.descuento/100)*(producto.precio)) | currency }}\n      </p>\n      <p *ngIf=\"!producto.descuento\" class=\"product-price\">\n        {{ producto.precio | currency }}\n      </p>\n\n      <!-- Hover Content -->\n      <div class=\"hover-content\">\n        <!-- Add to Cart -->\n        <div class=\"add-to-cart-btn\">\n          <a href=\"#\" class=\"btn essence-btn\">agregar</a>\n        </div>\n      </div>\n    </div>\n  </div>\n<!-- </div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/shop/shop.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/shop/shop.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ##### Breadcumb Area Start ##### -->\n<div class=\"breadcumb_area bg-img\" style=\"background-image: url(../../../assets/template/img/bg-img/breadcumb.jpg);\">\n  <div class=\"container h-100\">\n    <div class=\"row h-100 align-items-center\">\n      <div class=\"col-12\">\n        <div class=\"page-title text-center\">\n          <h2>Genoveva Shop Online</h2>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- ##### Breadcumb Area End ##### -->\n\n<!-- ##### Shop Grid Area Start ##### -->\n<section class=\"shop_grid_area section-padding-80\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12 col-md-4 col-lg-3\">\n        <div class=\"shop_sidebar_area\">\n\n          <!-- ##### Single Widget ##### -->\n          <div class=\"widget catagory mb-50\">\n            <!-- Widget Title -->\n            <h6 class=\"widget-title mb-30\">Categorias</h6>\n\n            <!--  Catagories  -->\n            <div class=\"catagories-menu\">\n              <ul id=\"menu-content2\" class=\"menu-content collapse show\">\n                <!-- Single Item -->\n                <li data-toggle=\"collapse\" data-target=\"#clothing\">\n                  <a href=\"#\">clothing</a>\n                  <ul class=\"sub-menu collapse show\" id=\"clothing\">\n                    <li><a href=\"#\">All</a></li>\n                    <li><a href=\"#\">Bodysuits</a></li>\n                    <li><a href=\"#\">Dresses</a></li>\n                    <li><a href=\"#\">Hoodies &amp; Sweats</a></li>\n                    <li><a href=\"#\">Jackets &amp; Coats</a></li>\n                    <li><a href=\"#\">Jeans</a></li>\n                    <li><a href=\"#\">Pants &amp; Leggings</a></li>\n                    <li><a href=\"#\">Rompers &amp; Jumpsuits</a></li>\n                    <li><a href=\"#\">Shirts &amp; Blouses</a></li>\n                    <li><a href=\"#\">Shirts</a></li>\n                    <li><a href=\"#\">Sweaters &amp; Knits</a></li>\n                  </ul>\n                </li>\n                <!-- Single Item -->\n                <li data-toggle=\"collapse\" data-target=\"#shoes\" class=\"collapsed\">\n                  <a href=\"#\">shoes</a>\n                  <ul class=\"sub-menu collapse\" id=\"shoes\">\n                    <li><a href=\"#\">All</a></li>\n                    <li><a href=\"#\">Bodysuits</a></li>\n                    <li><a href=\"#\">Dresses</a></li>\n                    <li><a href=\"#\">Hoodies &amp; Sweats</a></li>\n                    <li><a href=\"#\">Jackets &amp; Coats</a></li>\n                    <li><a href=\"#\">Jeans</a></li>\n                    <li><a href=\"#\">Pants &amp; Leggings</a></li>\n                    <li><a href=\"#\">Rompers &amp; Jumpsuits</a></li>\n                    <li><a href=\"#\">Shirts &amp; Blouses</a></li>\n                    <li><a href=\"#\">Shirts</a></li>\n                    <li><a href=\"#\">Sweaters &amp; Knits</a></li>\n                  </ul>\n                </li>\n                <!-- Single Item -->\n                <li data-toggle=\"collapse\" data-target=\"#accessories\" class=\"collapsed\">\n                  <a href=\"#\">accessories</a>\n                  <ul class=\"sub-menu collapse\" id=\"accessories\">\n                    <li><a href=\"#\">All</a></li>\n                    <li><a href=\"#\">Bodysuits</a></li>\n                    <li><a href=\"#\">Dresses</a></li>\n                    <li><a href=\"#\">Hoodies &amp; Sweats</a></li>\n                    <li><a href=\"#\">Jackets &amp; Coats</a></li>\n                    <li><a href=\"#\">Jeans</a></li>\n                    <li><a href=\"#\">Pants &amp; Leggings</a></li>\n                    <li><a href=\"#\">Rompers &amp; Jumpsuits</a></li>\n                    <li><a href=\"#\">Shirts &amp; Blouses</a></li>\n                    <li><a href=\"#\">Shirts</a></li>\n                    <li><a href=\"#\">Sweaters &amp; Knits</a></li>\n                  </ul>\n                </li>\n              </ul>\n            </div>\n          </div>\n\n          <!-- ##### Single Widget ##### -->\n          <div class=\"widget price mb-50\">\n            <!-- Widget Title -->\n            <h6 class=\"widget-title mb-30\">Filtrar por</h6>\n            <!-- Widget Title 2 -->\n            <p class=\"widget-title2 mb-30\">Precio</p>\n\n            <div class=\"widget-desc\">\n              <div class=\"slider-range\">\n                <div data-min=\"49\" data-max=\"360\" data-unit=\"$\"\n                  class=\"slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"\n                  data-value-min=\"49\" data-value-max=\"360\" data-label-result=\"Range:\">\n                  <div class=\"ui-slider-range ui-widget-header ui-corner-all\"></div>\n                  <span class=\"ui-slider-handle ui-state-default ui-corner-all\" tabindex=\"0\"></span>\n                  <span class=\"ui-slider-handle ui-state-default ui-corner-all\" tabindex=\"0\"></span>\n                </div>\n                <div class=\"range-price\">Rango: $49.00 - $360.00</div>\n              </div>\n            </div>\n          </div>\n\n          <!-- ##### Single Widget ##### -->\n          <div class=\"widget color mb-50\">\n            <!-- Widget Title 2 -->\n            <p class=\"widget-title2 mb-30\">Color</p>\n            <div class=\"widget-desc\">\n              <ul class=\"d-flex\">\n                <li><a href=\"#\" class=\"color1\"></a></li>\n                <li><a href=\"#\" class=\"color2\"></a></li>\n                <li><a href=\"#\" class=\"color3\"></a></li>\n                <li><a href=\"#\" class=\"color4\"></a></li>\n                <li><a href=\"#\" class=\"color5\"></a></li>\n                <li><a href=\"#\" class=\"color6\"></a></li>\n                <li><a href=\"#\" class=\"color7\"></a></li>\n                <li><a href=\"#\" class=\"color8\"></a></li>\n                <li><a href=\"#\" class=\"color9\"></a></li>\n                <li><a href=\"#\" class=\"color10\"></a></li>\n              </ul>\n            </div>\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"col-12 col-md-8 col-lg-9\">\n        <div class=\"shop_grid_product_area\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"product-topbar d-flex align-items-center justify-content-between\">\n                <!-- Total Products -->\n                <div class=\"total-products\">\n                  <p><span *ngIf=\"this.productosBD\">{{ this.productosBD.length }}</span> productos encontrados</p>\n                </div>\n                <!-- Sorting -->\n                <div class=\"product-sorting d-flex\">\n                  <p>Sort by:</p>\n                  <form action=\"#\" method=\"get\">\n                    <select name=\"select\" id=\"sortByselect\">\n                      <option value=\"value\">Highest Rated</option>\n                      <option value=\"value\">Newest</option>\n                      <option value=\"value\">Price: $$ - $</option>\n                      <option value=\"value\">Price: $ - $$</option>\n                    </select>\n                    <input type=\"submit\" class=\"d-none\" value=\"\">\n                  </form>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div *ngIf=\"cargando\" class=\"row text-center animated fadeIn\">\n            <div class=\"col\">\n\n              <i class=\"fas fa-sync fa-spin fa-2x\"></i>\n\n            </div>\n          </div>\n\n          <div class=\"row\" *ngIf=\"!cargando\">\n            <!-- <div class=\"col-12 col-sm-6 col-lg-4\"> -->\n              <app-producto class=\"col-12 col-sm-6 col-lg-4\" *ngFor=\"let producto of this.productosBD\"\n                [producto]=\"producto\"></app-producto>\n            <!-- </div> -->\n\n          </div>\n        </div>\n\n        <!-- Pagination -->\n        <nav aria-label=\"navigation\">\n          <ul class=\"pagination mt-50 mb-70\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\"><i class=\"fa fa-angle-left\"></i></a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">...</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">21</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\"><i class=\"fa fa-angle-right\"></i></a></li>\n          </ul>\n        </nav>\n      </div>\n    </div>\n  </div>\n</section>\n<!-- ##### Shop Grid Area End ##### -->"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let AppComponent = class AppComponent {
    constructor(productosService) {
        this.productosService = productosService;
    }
    ngOnInit() {
        this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_1__["ProductosService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _components_shared_header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/shared/header/header.component */ "./src/app/components/shared/header/header.component.ts");
/* harmony import */ var _components_shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/shared/footer/footer.component */ "./src/app/components/shared/footer/footer.component.ts");
/* harmony import */ var _components_shared_side_cart_side_cart_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/shared/side-cart/side-cart.component */ "./src/app/components/shared/side-cart/side-cart.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_shop_shop_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/shop/shop.component */ "./src/app/components/shop/shop.component.ts");
/* harmony import */ var _components_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/faqs/faqs.component */ "./src/app/components/faqs/faqs.component.ts");
/* harmony import */ var _components_politicas_politicas_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/politicas/politicas.component */ "./src/app/components/politicas/politicas.component.ts");
/* harmony import */ var _components_shop_producto_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/shop/producto.component */ "./src/app/components/shop/producto.component.ts");
/* harmony import */ var _components_admin_admin_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/admin/admin.component */ "./src/app/components/admin/admin.component.ts");
/* harmony import */ var _components_admin_ecommerce_ecommerce_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/admin/ecommerce/ecommerce.component */ "./src/app/components/admin/ecommerce/ecommerce.component.ts");
/* harmony import */ var _components_admin_ventas_ventas_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/admin/ventas/ventas.component */ "./src/app/components/admin/ventas/ventas.component.ts");
/* harmony import */ var _components_admin_estadisticas_estadisticas_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/admin/estadisticas/estadisticas.component */ "./src/app/components/admin/estadisticas/estadisticas.component.ts");
/* harmony import */ var _components_admin_ecommerce_producto_ecommerce_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/admin/ecommerce/producto-ecommerce.component */ "./src/app/components/admin/ecommerce/producto-ecommerce.component.ts");
/* harmony import */ var _directives_ng_drop_files_directive__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directives/ng-drop-files.directive */ "./src/app/directives/ng-drop-files.directive.ts");
/* harmony import */ var _services_productos_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var _components_shop_producto_detalle_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/shop/producto-detalle.component */ "./src/app/components/shop/producto-detalle.component.ts");
/* harmony import */ var _components_home_popular_products_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/home/popular-products.component */ "./src/app/components/home/popular-products.component.ts");
/* harmony import */ var _components_registro_registro_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/registro/registro.component */ "./src/app/components/registro/registro.component.ts");
/* harmony import */ var _components_registro_login_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/registro/login.component */ "./src/app/components/registro/login.component.ts");
/* harmony import */ var _services_registro_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./services/registro.service */ "./src/app/services/registro.service.ts");
/* harmony import */ var _components_perfil_perfil_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/perfil/perfil.component */ "./src/app/components/perfil/perfil.component.ts");
/* harmony import */ var _components_perfil_favoritos_favoritos_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/perfil/favoritos/favoritos.component */ "./src/app/components/perfil/favoritos/favoritos.component.ts");



// agregados por mi


























let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _components_shared_header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"],
            _components_shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
            _components_shared_side_cart_side_cart_component__WEBPACK_IMPORTED_MODULE_9__["SideCartComponent"],
            _components_home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"],
            _components_shop_shop_component__WEBPACK_IMPORTED_MODULE_11__["ShopComponent"],
            _components_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_12__["FaqsComponent"],
            _components_politicas_politicas_component__WEBPACK_IMPORTED_MODULE_13__["PoliticasComponent"],
            _components_shop_producto_component__WEBPACK_IMPORTED_MODULE_14__["ProductoComponent"],
            _components_admin_admin_component__WEBPACK_IMPORTED_MODULE_15__["AdminComponent"],
            _components_admin_ecommerce_ecommerce_component__WEBPACK_IMPORTED_MODULE_16__["EcommerceComponent"],
            _components_admin_ventas_ventas_component__WEBPACK_IMPORTED_MODULE_17__["VentasComponent"],
            _components_admin_estadisticas_estadisticas_component__WEBPACK_IMPORTED_MODULE_18__["EstadisticasComponent"],
            _components_admin_ecommerce_producto_ecommerce_component__WEBPACK_IMPORTED_MODULE_19__["ProductoEcommerceComponent"],
            _directives_ng_drop_files_directive__WEBPACK_IMPORTED_MODULE_20__["NgDropFilesDirective"],
            _components_shop_producto_detalle_component__WEBPACK_IMPORTED_MODULE_22__["ProductoDetalleComponent"],
            _components_home_popular_products_component__WEBPACK_IMPORTED_MODULE_23__["PopularProductsComponent"],
            _components_registro_registro_component__WEBPACK_IMPORTED_MODULE_24__["RegistroComponent"],
            _components_registro_login_component__WEBPACK_IMPORTED_MODULE_25__["LoginComponent"],
            _components_perfil_perfil_component__WEBPACK_IMPORTED_MODULE_27__["PerfilComponent"],
            _components_perfil_favoritos_favoritos_component__WEBPACK_IMPORTED_MODULE_28__["FavoritosComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            _app_routes__WEBPACK_IMPORTED_MODULE_4__["APP_ROUTING"]
        ],
        providers: [
            _services_productos_service__WEBPACK_IMPORTED_MODULE_21__["ProductosService"],
            _services_registro_service__WEBPACK_IMPORTED_MODULE_26__["RegistroService"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: APP_ROUTING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_ROUTING", function() { return APP_ROUTING; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_shop_shop_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/shop/shop.component */ "./src/app/components/shop/shop.component.ts");
/* harmony import */ var _components_shop_producto_detalle_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/shop/producto-detalle.component */ "./src/app/components/shop/producto-detalle.component.ts");
/* harmony import */ var _components_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/faqs/faqs.component */ "./src/app/components/faqs/faqs.component.ts");
/* harmony import */ var _components_politicas_politicas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/politicas/politicas.component */ "./src/app/components/politicas/politicas.component.ts");
/* harmony import */ var _components_registro_registro_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/registro/registro.component */ "./src/app/components/registro/registro.component.ts");
/* harmony import */ var _components_registro_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/registro/login.component */ "./src/app/components/registro/login.component.ts");
/* harmony import */ var _components_perfil_perfil_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/perfil/perfil.component */ "./src/app/components/perfil/perfil.component.ts");
/* harmony import */ var _components_perfil_favoritos_favoritos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/perfil/favoritos/favoritos.component */ "./src/app/components/perfil/favoritos/favoritos.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./guards/auth.guard */ "./src/app/guards/auth.guard.ts");






// import { AdminComponent } from './components/admin/admin.component';
// import { EcommerceComponent } from './components/admin/ecommerce/ecommerce.component';
// import { VentasComponent } from './components/admin/ventas/ventas.component';
// import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
// import { ProductoEcommerceComponent } from './components/admin/ecommerce/producto-ecommerce.component';





const APP_ROUTES = [
    { path: 'home', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'shop', component: _components_shop_shop_component__WEBPACK_IMPORTED_MODULE_2__["ShopComponent"] },
    { path: 'shop/producto/:id', component: _components_shop_producto_detalle_component__WEBPACK_IMPORTED_MODULE_3__["ProductoDetalleComponent"] },
    { path: 'faqs', component: _components_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_4__["FaqsComponent"] },
    { path: 'politicas', component: _components_politicas_politicas_component__WEBPACK_IMPORTED_MODULE_5__["PoliticasComponent"] },
    // { path: 'admin', component: AdminComponent },
    // { path: 'admin/ecommerce', component: EcommerceComponent },
    // { path: 'admin/ecommerce/producto/:id', component: ProductoEcommerceComponent },
    // { path: 'admin/ventas', component: VentasComponent },
    // { path: 'admin/estadisticas', component: EstadisticasComponent },
    { path: 'registro', component: _components_registro_registro_component__WEBPACK_IMPORTED_MODULE_6__["RegistroComponent"] },
    { path: 'login', component: _components_registro_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"] },
    { path: 'perfil/:id', component: _components_perfil_perfil_component__WEBPACK_IMPORTED_MODULE_8__["PerfilComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"]] },
    { path: 'favoritos/:id', component: _components_perfil_favoritos_favoritos_component__WEBPACK_IMPORTED_MODULE_9__["FavoritosComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"]] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];
// export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
const APP_ROUTING = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(APP_ROUTES, { onSameUrlNavigation: 'reload' });


/***/ }),

/***/ "./src/app/components/admin/admin.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/admin/admin.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW4vYWRtaW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/admin/admin.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/admin/admin.component.ts ***!
  \*****************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AdminComponent = class AdminComponent {
    constructor() { }
    ngOnInit() {
    }
};
AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin',
        template: __webpack_require__(/*! raw-loader!./admin.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/admin/admin.component.html"),
        styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/components/admin/admin.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], AdminComponent);



/***/ }),

/***/ "./src/app/components/admin/ecommerce/ecommerce.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/admin/ecommerce/ecommerce.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW4vZWNvbW1lcmNlL2Vjb21tZXJjZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/admin/ecommerce/ecommerce.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/admin/ecommerce/ecommerce.component.ts ***!
  \*******************************************************************/
/*! exports provided: EcommerceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EcommerceComponent", function() { return EcommerceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");



let EcommerceComponent = class EcommerceComponent {
    // cargando = true;
    constructor(productosService) {
        this.productosService = productosService;
        // this.productosService.getProductos().subscribe(res => {
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        // this.productosBD = <Producto[]>res;
        // });
    }
    ngOnInit() {
        setTimeout(() => {
            this.pocoStock();
        }, 500);
    }
    pocoStock() {
        const queda1 = [];
        const queda0 = [];
        for (const i of this.productosBD) {
            if (i.stock === 1) {
                queda1.push(' ' + i.titulo);
            }
            if (i.stock === 0) {
                queda0.push(' ' + i.titulo);
            }
        }
        // swal('Alerta de Stock! \n\n' + queda1 + ' tiene/n un solo remanente en stock \n' + queda0 + ' no tiene/n ninguno en stock');
    }
};
EcommerceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-ecommerce',
        template: __webpack_require__(/*! raw-loader!./ecommerce.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/admin/ecommerce/ecommerce.component.html"),
        styles: [__webpack_require__(/*! ./ecommerce.component.css */ "./src/app/components/admin/ecommerce/ecommerce.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], EcommerceComponent);



/***/ }),

/***/ "./src/app/components/admin/ecommerce/producto-ecommerce.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/components/admin/ecommerce/producto-ecommerce.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW4vZWNvbW1lcmNlL3Byb2R1Y3RvLWVjb21tZXJjZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/admin/ecommerce/producto-ecommerce.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/admin/ecommerce/producto-ecommerce.component.ts ***!
  \****************************************************************************/
/*! exports provided: ProductoEcommerceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductoEcommerceComponent", function() { return ProductoEcommerceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let ProductoEcommerceComponent = class ProductoEcommerceComponent {
    constructor(productosService, router, activatedRoute) {
        this.productosService = productosService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.cargando = true;
        this.categoriasP = [];
        this.categoriasS = [];
        this.actualizando = false;
        // directivas para dropzone
        this.imagen1 = [];
        this.imagen2 = [];
        this.estaSobreElemento = false;
        this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
            if (this.id !== 0) {
                this.productosService.getProducto(this.id).subscribe((producto) => {
                    setTimeout(() => {
                        this.cargando = false;
                        this.producto = producto;
                    }, 500);
                });
            }
        });
    }
    ngOnInit() {
        // this.productosService.getCategoriasPrincipales().subscribe( (categorias: any) => {
        //   this.categoriasP = categorias;
        // });
        this.productosService.getDatos().subscribe((categorias) => {
            console.log(categorias);
            this.categoriasP = categorias.principales;
            this.categoriasS = categorias.secundarias;
        });
    }
};
ProductoEcommerceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-producto-ecommerce',
        template: __webpack_require__(/*! raw-loader!./producto-ecommerce.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/admin/ecommerce/producto-ecommerce.component.html"),
        styles: [__webpack_require__(/*! ./producto-ecommerce.component.css */ "./src/app/components/admin/ecommerce/producto-ecommerce.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
], ProductoEcommerceComponent);



/***/ }),

/***/ "./src/app/components/admin/estadisticas/estadisticas.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/components/admin/estadisticas/estadisticas.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW4vZXN0YWRpc3RpY2FzL2VzdGFkaXN0aWNhcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/admin/estadisticas/estadisticas.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/admin/estadisticas/estadisticas.component.ts ***!
  \*************************************************************************/
/*! exports provided: EstadisticasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasComponent", function() { return EstadisticasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let EstadisticasComponent = class EstadisticasComponent {
    constructor() { }
    ngOnInit() {
    }
};
EstadisticasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-estadisticas',
        template: __webpack_require__(/*! raw-loader!./estadisticas.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/admin/estadisticas/estadisticas.component.html"),
        styles: [__webpack_require__(/*! ./estadisticas.component.css */ "./src/app/components/admin/estadisticas/estadisticas.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], EstadisticasComponent);



/***/ }),

/***/ "./src/app/components/admin/ventas/ventas.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/admin/ventas/ventas.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRtaW4vdmVudGFzL3ZlbnRhcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/admin/ventas/ventas.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/admin/ventas/ventas.component.ts ***!
  \*************************************************************/
/*! exports provided: VentasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VentasComponent", function() { return VentasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let VentasComponent = class VentasComponent {
    constructor() { }
    ngOnInit() {
    }
};
VentasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-ventas',
        template: __webpack_require__(/*! raw-loader!./ventas.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/admin/ventas/ventas.component.html"),
        styles: [__webpack_require__(/*! ./ventas.component.css */ "./src/app/components/admin/ventas/ventas.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], VentasComponent);



/***/ }),

/***/ "./src/app/components/faqs/faqs.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/faqs/faqs.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZmFxcy9mYXFzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/faqs/faqs.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/faqs/faqs.component.ts ***!
  \***************************************************/
/*! exports provided: FaqsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqsComponent", function() { return FaqsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");



let FaqsComponent = class FaqsComponent {
    constructor(productosService) {
        this.productosService = productosService;
    }
    ngOnInit() {
        // this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
};
FaqsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-faqs',
        template: __webpack_require__(/*! raw-loader!./faqs.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/faqs/faqs.component.html"),
        styles: [__webpack_require__(/*! ./faqs.component.css */ "./src/app/components/faqs/faqs.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], FaqsComponent);



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/registro.service */ "./src/app/services/registro.service.ts");




let HomeComponent = class HomeComponent {
    constructor(productosService, registroService) {
        this.productosService = productosService;
        this.registroService = registroService;
        this.logueado = false;
    }
    ngOnInit() {
        // this.productosService.cargarScript('assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
};
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/home/home.component.html"),
        styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"], src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_3__["RegistroService"]])
], HomeComponent);



/***/ }),

/***/ "./src/app/components/home/popular-products.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/home/popular-products.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9wb3B1bGFyLXByb2R1Y3RzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/home/popular-products.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/home/popular-products.component.ts ***!
  \***************************************************************/
/*! exports provided: PopularProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopularProductsComponent", function() { return PopularProductsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PopularProductsComponent = class PopularProductsComponent {
    constructor() { }
    ngOnInit() {
    }
};
PopularProductsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-popular-products',
        template: __webpack_require__(/*! raw-loader!./popular-products.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/home/popular-products.component.html"),
        styles: [__webpack_require__(/*! ./popular-products.component.css */ "./src/app/components/home/popular-products.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PopularProductsComponent);



/***/ }),

/***/ "./src/app/components/perfil/favoritos/favoritos.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/components/perfil/favoritos/favoritos.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcGVyZmlsL2Zhdm9yaXRvcy9mYXZvcml0b3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/perfil/favoritos/favoritos.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/components/perfil/favoritos/favoritos.component.ts ***!
  \********************************************************************/
/*! exports provided: FavoritosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritosComponent", function() { return FavoritosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FavoritosComponent = class FavoritosComponent {
    constructor() { }
    ngOnInit() {
    }
};
FavoritosComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-favoritos',
        template: __webpack_require__(/*! raw-loader!./favoritos.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/perfil/favoritos/favoritos.component.html"),
        styles: [__webpack_require__(/*! ./favoritos.component.css */ "./src/app/components/perfil/favoritos/favoritos.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], FavoritosComponent);



/***/ }),

/***/ "./src/app/components/perfil/perfil.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/perfil/perfil.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcGVyZmlsL3BlcmZpbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/perfil/perfil.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/perfil/perfil.component.ts ***!
  \*******************************************************/
/*! exports provided: PerfilComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilComponent", function() { return PerfilComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/registro.service */ "./src/app/services/registro.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");





let PerfilComponent = class PerfilComponent {
    constructor(registroService, productosService, router, activatedRoute) {
        this.registroService = registroService;
        this.productosService = productosService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.activatedRoute.params.subscribe(parametro => {
            this.registroService.getUsuario(parametro['id']).subscribe((usuario) => {
                this.usuario = usuario;
            });
        });
    }
    ngOnInit() {
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
};
PerfilComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-perfil',
        template: __webpack_require__(/*! raw-loader!./perfil.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/perfil/perfil.component.html"),
        styles: [__webpack_require__(/*! ./perfil.component.css */ "./src/app/components/perfil/perfil.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_1__["RegistroService"], src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_4__["ProductosService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
], PerfilComponent);



/***/ }),

/***/ "./src/app/components/politicas/politicas.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/politicas/politicas.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcG9saXRpY2FzL3BvbGl0aWNhcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/politicas/politicas.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/politicas/politicas.component.ts ***!
  \*************************************************************/
/*! exports provided: PoliticasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoliticasComponent", function() { return PoliticasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");



let PoliticasComponent = class PoliticasComponent {
    constructor(productosService) {
        this.productosService = productosService;
    }
    ngOnInit() {
        // this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
};
PoliticasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-politicas',
        template: __webpack_require__(/*! raw-loader!./politicas.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/politicas/politicas.component.html"),
        styles: [__webpack_require__(/*! ./politicas.component.css */ "./src/app/components/politicas/politicas.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], PoliticasComponent);



/***/ }),

/***/ "./src/app/components/registro/login.component.css":
/*!*********************************************************!*\
  !*** ./src/app/components/registro/login.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0cm8vbG9naW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/registro/login.component.ts":
/*!********************************************************!*\
  !*** ./src/app/components/registro/login.component.ts ***!
  \********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var src_app_models_usuario_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/usuario.models */ "./src/app/models/usuario.models.ts");
/* harmony import */ var src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/registro.service */ "./src/app/services/registro.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);







let LoginComponent = class LoginComponent {
    constructor(productoService, registroService, router, activatedRoute) {
        this.productoService = productoService;
        this.registroService = registroService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.usuario = new src_app_models_usuario_models__WEBPACK_IMPORTED_MODULE_3__["UsuarioModel"]();
        this.logueadoLogin = false;
        this.recordarme = false;
    }
    ngOnInit() {
        this.productoService.cargarEstilos('assets/registro/css/util.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/css/main.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/css/animate.css')
            .then(() => { }).catch(() => { });
        // this.productoService.cargarScript('assets/template/js/active.js').
        //   then((res) => { }).catch(() => { });
        if (localStorage.getItem('email')) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
        }
    }
    login(formRegistro) {
        if (formRegistro.invalid) {
            return;
        }
        this.registroService.enviarLogin(this.usuario).subscribe((usuario) => {
            if ((usuario)) {
                if (this.recordarme) {
                    localStorage.setItem('email', this.usuario.email);
                }
                localStorage.setItem('userId', usuario.id);
                this.router.navigate(['/perfil', usuario.id]);
            }
            else {
                // swal('Contraseña incorrecta');
                sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
                    title: 'Error de autenticación',
                    type: 'error',
                    text: 'Ingresaste mal el mail o la contraseña',
                });
                // document.querySelector('.password').value = '';
            }
        });
    }
};
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/registro/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/registro/login.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"], src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_4__["RegistroService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/components/registro/registro.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/registro/registro.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0cm8vcmVnaXN0cm8uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/registro/registro.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/registro/registro.component.ts ***!
  \***********************************************************/
/*! exports provided: RegistroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroComponent", function() { return RegistroComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var src_app_models_usuario_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/usuario.models */ "./src/app/models/usuario.models.ts");
/* harmony import */ var src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/registro.service */ "./src/app/services/registro.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let RegistroComponent = class RegistroComponent {
    constructor(productoService, registroService, router) {
        this.productoService = productoService;
        this.registroService = registroService;
        this.router = router;
        this.usuario = new src_app_models_usuario_models__WEBPACK_IMPORTED_MODULE_3__["UsuarioModel"]();
        this.recordarme = false;
    }
    ngOnInit() {
        this.productoService.cargarEstilos('assets/registro/css/util.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/css/main.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/fonts/font-awesome-4.7.0/css/font-awesome.min.css')
            .then(() => { }).catch(() => { });
        this.productoService.cargarEstilos('assets/registro/css/animate.css')
            .then(() => { }).catch(() => { });
        // this.productoService.cargarScript('/assets/template/js/active.js').
        //   then((res) => { }).catch(() => { });
        if (localStorage.getItem('email')) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
        }
    }
    onSubmit(formRegistro) {
        if (formRegistro.invalid) {
            return;
        }
        this.registroService.enviarRegistro(this.usuario).subscribe(res => {
            this.registroService.enviarLogin(this.usuario).subscribe((usuario) => {
                if (usuario) {
                    if (this.recordarme) {
                        localStorage.setItem('email', this.usuario.email);
                    }
                    localStorage.setItem('userId', usuario.id);
                    this.router.navigate(['/perfil', usuario.id]);
                }
            });
        });
    }
};
RegistroComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-registro',
        template: __webpack_require__(/*! raw-loader!./registro.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/registro/registro.component.html"),
        styles: [__webpack_require__(/*! ./registro.component.css */ "./src/app/components/registro/registro.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"], src_app_services_registro_service__WEBPACK_IMPORTED_MODULE_4__["RegistroService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
], RegistroComponent);



/***/ }),

/***/ "./src/app/components/shared/footer/footer.component.css":
/*!***************************************************************!*\
  !*** ./src/app/components/shared/footer/footer.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/shared/footer/footer.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/shared/footer/footer.component.ts ***!
  \**************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
};
FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shared/footer/footer.component.html"),
        styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/components/shared/footer/footer.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], FooterComponent);



/***/ }),

/***/ "./src/app/components/shared/header/header.component.css":
/*!***************************************************************!*\
  !*** ./src/app/components/shared/header/header.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/shared/header/header.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/shared/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");



let HeaderComponent = class HeaderComponent {
    constructor(productosService) {
        this.productosService = productosService;
        this.logueadoHeader = false;
        // this.productosService.cargarScript('assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
    ngDoCheck() {
        if (localStorage.getItem('logueado')) {
            this.logueadoHeader = true;
        }
        if (localStorage.getItem('userId') === null) {
            this.userId = null;
        }
        else {
            this.userId = localStorage.getItem('userId');
        }
    }
    ngOnInit() {
    }
};
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: __webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shared/header/header.component.html"),
        styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/components/shared/header/header.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], HeaderComponent);



/***/ }),

/***/ "./src/app/components/shared/side-cart/side-cart.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/components/shared/side-cart/side-cart.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hhcmVkL3NpZGUtY2FydC9zaWRlLWNhcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/shared/side-cart/side-cart.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/components/shared/side-cart/side-cart.component.ts ***!
  \********************************************************************/
/*! exports provided: SideCartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideCartComponent", function() { return SideCartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SideCartComponent = class SideCartComponent {
    constructor() { }
    ngOnInit() {
    }
};
SideCartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-side-cart',
        template: __webpack_require__(/*! raw-loader!./side-cart.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shared/side-cart/side-cart.component.html"),
        styles: [__webpack_require__(/*! ./side-cart.component.css */ "./src/app/components/shared/side-cart/side-cart.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SideCartComponent);



/***/ }),

/***/ "./src/app/components/shop/producto-detalle.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/shop/producto-detalle.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hvcC9wcm9kdWN0by1kZXRhbGxlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/shop/producto-detalle.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/shop/producto-detalle.component.ts ***!
  \***************************************************************/
/*! exports provided: ProductoDetalleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductoDetalleComponent", function() { return ProductoDetalleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");


// importados por mi


let ProductoDetalleComponent = class ProductoDetalleComponent {
    constructor(productosService, router, activatedRoute) {
        this.productosService = productosService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.datos = {
            colores: [],
            principales: [],
            secundarios: [],
            talles: []
        };
        this.stockProducto = [];
        this.cargando = true;
        let idProducto;
        let pathImagenDetalle = [];
        this.productosService.getDatos().subscribe((res) => {
            this.datos.colores = res.colores;
            this.datos.principales = res.principales;
            this.datos.secundarios = res.secundarios;
            this.datos.talles = res.talles;
        });
        this.activatedRoute.params.subscribe(parametro => {
            idProducto = parametro['id'];
        });
        this.productosService
            .getImagenesDetalle(idProducto)
            .subscribe((res) => {
            res.forEach(imagen => {
                pathImagenDetalle.push(imagen.path);
            });
        });
        this.productosService.getProducto(idProducto).subscribe((producto) => {
            producto.path = pathImagenDetalle;
            this.productoConImagen = producto;
            // console.log(this.productoConImagen );
            this.cargando = false;
        });
        this.productosService
            .getStockProducto(idProducto)
            .subscribe((stocks) => {
            stocks.forEach(stock => {
                this.datos.talles.forEach(talle => {
                    if (stock.talle_id === talle.id) {
                        // console.log(talle.nombre, stock.cantidad);
                        this.stockProducto.push({
                            talle_id: talle.id,
                            talle_nombre: talle.nombre,
                            talle_cantidad: stock.cantidad
                        });
                        // console.log(this.stockProducto);
                    }
                });
            });
        });
    }
    ngOnInit() {
        this.productosService.cargarScript('../../../assets/template/js/active.js').then((res) => { }).catch(() => { });
        this.productosService.cargarEstilos('assets/template/owlcarousel/assets/owl.carousel.min.css')
            .then(() => { }).catch(() => { });
        this.productosService.cargarEstilos('assets/template/owlcarousel/assets/owl.theme.default.min.css')
            .then(() => { }).catch(() => { });
    }
};
ProductoDetalleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-producto-detalle',
        template: __webpack_require__(/*! raw-loader!./producto-detalle.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shop/producto-detalle.component.html"),
        styles: [__webpack_require__(/*! ./producto-detalle.component.css */ "./src/app/components/shop/producto-detalle.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
], ProductoDetalleComponent);



/***/ }),

/***/ "./src/app/components/shop/producto.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/shop/producto.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hvcC9wcm9kdWN0by5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/shop/producto.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/shop/producto.component.ts ***!
  \*******************************************************/
/*! exports provided: ProductoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductoComponent", function() { return ProductoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/productos.service */ "./src/app/services/productos.service.ts");



let ProductoComponent = class ProductoComponent {
    constructor(productoService) {
        this.productoService = productoService;
    }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ProductoComponent.prototype, "producto", void 0);
ProductoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-producto',
        template: __webpack_require__(/*! raw-loader!./producto.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shop/producto.component.html"),
        styles: [__webpack_require__(/*! ./producto.component.css */ "./src/app/components/shop/producto.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], ProductoComponent);



/***/ }),

/***/ "./src/app/components/shop/shop.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/shop/shop.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2hvcC9zaG9wLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/shop/shop.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/shop/shop.component.ts ***!
  \***************************************************/
/*! exports provided: ShopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopComponent", function() { return ShopComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/productos.service */ "./src/app/services/productos.service.ts");



let ShopComponent = class ShopComponent {
    constructor(productosService) {
        this.productosService = productosService;
        this.productoConImagen = [];
        this.cargando = true;
        this.productosService.getProductos().subscribe(res => {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            // console.log(res);
            this.productosBD = res;
            // console.log(this.productosBD);
            this.productosService.getImagenesShop().subscribe((imagenesShop) => {
                // console.log(res);
                let arregloPath = [];
                this.productosBD.forEach((producto) => {
                    imagenesShop.forEach((imagen) => {
                        if (producto.id === imagen.producto_id) {
                            arregloPath.push(imagen.path);
                            producto.path = arregloPath;
                            // console.log(arregloPath);
                        }
                    });
                    arregloPath = [];
                    this.productoConImagen.push(producto);
                    this.cargando = false;
                });
            });
        });
        // this.productosService.cargarScript('assets/template/js/active.js').then((res) => { }).catch(() => { });
    }
    ngOnInit() {
    }
};
ShopComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-shop',
        template: __webpack_require__(/*! raw-loader!./shop.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/shop/shop.component.html"),
        styles: [__webpack_require__(/*! ./shop.component.css */ "./src/app/components/shop/shop.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_productos_service__WEBPACK_IMPORTED_MODULE_2__["ProductosService"]])
], ShopComponent);



/***/ }),

/***/ "./src/app/directives/ng-drop-files.directive.ts":
/*!*******************************************************!*\
  !*** ./src/app/directives/ng-drop-files.directive.ts ***!
  \*******************************************************/
/*! exports provided: NgDropFilesDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgDropFilesDirective", function() { return NgDropFilesDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_file_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/file-item */ "./src/app/models/file-item.ts");



let NgDropFilesDirective = class NgDropFilesDirective {
    constructor() {
        this.imagen1 = [];
        this.imagen2 = [];
        this.mouseSobre = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    onDragEnter(event) {
        this.mouseSobre.emit(true);
        this._prevenirDetener(event);
    }
    onDragLeave(event) {
        this.mouseSobre.emit(false);
    }
    onDrop(event) {
        const transferencia = this._getTransferencia(event);
        if (!transferencia) {
            return;
        }
        this._extrarArchivos(transferencia.files);
        this._prevenirDetener(event);
        this.mouseSobre.emit(false);
    }
    _getTransferencia(event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }
    _extrarArchivos(archivosLista) {
        // console.log(archivosLista);
        // tslint:disable-next-line:forin
        for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
            const archivoTemporal = archivosLista[propiedad];
            if (this._archivoPuedeSerCargado(archivoTemporal)) {
                const nuevoArchivo = new _models_file_item__WEBPACK_IMPORTED_MODULE_2__["FileItem"](archivoTemporal);
                // this.imagen1 = nuevoArchivo;
                this.imagen1.push(nuevoArchivo);
            }
        }
    }
    // Validaciones
    _archivoPuedeSerCargado(archivo) {
        if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
            return true;
        }
        else {
            return false;
        }
    }
    _prevenirDetener(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    _archivoYaFueDroppeado(nombreArchivo) {
        for (const archivo of this.imagen1) {
            if (archivo.nombreArchivo === nombreArchivo) {
                console.log('El archivo ' + nombreArchivo + ' ya está agregado!');
                return true;
            }
        }
        // if (this.imagen1) {
        //   if (this.imagen1.nombreArchivo === nombreArchivo) {
        //     console.log('El archivo ' + nombreArchivo + ' ya está agregado!');
        //     return true;
        //   }
        // }
        return false;
    }
    _esImagen(tipoArchivo) {
        return (tipoArchivo === '' || tipoArchivo === undefined ? false : tipoArchivo.startsWith('image'));
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], NgDropFilesDirective.prototype, "imagen1", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], NgDropFilesDirective.prototype, "imagen2", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], NgDropFilesDirective.prototype, "mouseSobre", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('dragover', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], NgDropFilesDirective.prototype, "onDragEnter", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('dragleave', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], NgDropFilesDirective.prototype, "onDragLeave", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('drop', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], NgDropFilesDirective.prototype, "onDrop", null);
NgDropFilesDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[appNgDropFiles]'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], NgDropFilesDirective);



/***/ }),

/***/ "./src/app/guards/auth.guard.ts":
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_registro_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/registro.service */ "./src/app/services/registro.service.ts");




let AuthGuard = class AuthGuard {
    constructor(registroService, router) {
        this.registroService = registroService;
        this.router = router;
    }
    canActivate() {
        if (this.registroService.estaLogueado()) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
};
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_registro_service__WEBPACK_IMPORTED_MODULE_3__["RegistroService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], AuthGuard);



/***/ }),

/***/ "./src/app/models/file-item.ts":
/*!*************************************!*\
  !*** ./src/app/models/file-item.ts ***!
  \*************************************/
/*! exports provided: FileItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileItem", function() { return FileItem; });
class FileItem {
    // public estaSubiendo: boolean;
    // public progreso: number;
    constructor(archivo) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        // this.estaSubiendo = false;
        // this.progreso = 0;
    }
}


/***/ }),

/***/ "./src/app/models/usuario.models.ts":
/*!******************************************!*\
  !*** ./src/app/models/usuario.models.ts ***!
  \******************************************/
/*! exports provided: UsuarioModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioModel", function() { return UsuarioModel; });
class UsuarioModel {
}


/***/ }),

/***/ "./src/app/services/productos.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/productos.service.ts ***!
  \***********************************************/
/*! exports provided: ProductosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductosService", function() { return ProductosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");



// import { Observable } from 'rxjs/Observable';

let ProductosService = class ProductosService {
    constructor(http) {
        this.http = http;
        // private urlAPI = 'http://genovevabe.cf/api';
        this.urlAPI = 'http://127.0.0.1:8000/api';
    }
    getProductos() {
        const url = `${this.urlAPI}/productos`;
        // return this.http.get('http://127.0.0.1:8000/api/ejemplo').pipe( map( (res: any) => {
        //   console.log(res);
        //   console.log('res');
        // }));
        return this.http.get(url).pipe();
    }
    getProducto(id) {
        const url = `${this.urlAPI}/producto/${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    getDatos() {
        const url = `${this.urlAPI}/datos`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    getImagenesShop() {
        const url = `${this.urlAPI}/imagenesShop`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    getImagenesDetalle(id) {
        const url = `${this.urlAPI}/imagenesDetalle/${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    getStockProducto(id) {
        const url = `${this.urlAPI}/producto/${id}/stock`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    cargarScript(scriptUrl) {
        return new Promise(resolve => {
            const scriptElement = document.createElement('script');
            scriptElement.src = scriptUrl;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }
    cargarEstilos(styleUrl) {
        return new Promise((resolve, reject) => {
            const styleElement = document.createElement('link');
            styleElement.href = styleUrl;
            styleElement.rel = 'stylesheet';
            styleElement.onload = resolve;
            document.head.appendChild(styleElement);
        });
    }
};
ProductosService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ProductosService);



/***/ }),

/***/ "./src/app/services/registro.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/registro.service.ts ***!
  \**********************************************/
/*! exports provided: RegistroService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroService", function() { return RegistroService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");



// import { Observable } from 'rxjs/Observable';

let RegistroService = class RegistroService {
    constructor(http) {
        this.http = http;
        this.urlAPI = 'http://127.0.0.1:8000/api';
    }
    enviarRegistro(usuario) {
        const url = `${this.urlAPI}/registro`;
        const body = JSON.stringify(usuario);
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, body, { headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((usuario) => {
            localStorage.setItem('email', usuario.email);
            return usuario;
        }));
    }
    enviarLogin(usuario) {
        const url = `${this.urlAPI}/login`;
        const body = JSON.stringify(usuario);
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, body, { headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((user) => {
            return user;
        }));
    }
    getUsuario(id) {
        const url = `${this.urlAPI}/usuario/${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => {
            return res;
        }));
    }
    estaLogueado() {
        if (localStorage.getItem('userId')) {
            return true;
        }
    }
    logout() {
        const url = `${this.urlAPI}/logout`;
        return this.http.get(url);
    }
};
RegistroService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], RegistroService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/cristiansavino/Desktop/Trabajo_FSWD/mariana/genovevaFE/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map