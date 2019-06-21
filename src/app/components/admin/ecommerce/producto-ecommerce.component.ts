import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileItem } from '../../../models/file-item';

@Component({
  selector: 'app-producto-ecommerce',
  templateUrl: './producto-ecommerce.component.html',
  styleUrls: ['./producto-ecommerce.component.css']
})
export class ProductoEcommerceComponent implements OnInit {

  producto: Producto;
  id: number;
  cargando = true;
  categoriasP: any[] = [];
  categoriasS: any[] = [];
  actualizando = false;

  // directivas para dropzone
  imagen1: FileItem[] = [];
  imagen2: FileItem[] = [];
  estaSobreElemento = false;

  constructor(private productosService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute) { 
    // this.activatedRoute.params.subscribe( params => {
    //   this.id = params.id;
    //   if (this.id !== 0) {
    //     this.productosService.getProducto( this.id ).subscribe( (producto: Producto) => {
    //       setTimeout(() => {
    //         this.cargando = false;
    //         this.producto = producto;
    //       }, 500);
    //     });
    //   }
    // });
  }

  ngOnInit() {
    // this.productosService.getCategoriasPrincipales().subscribe( (categorias: any) => {
    //   this.categoriasP = categorias;
    // });

    // this.productosService.getDatos().subscribe((categorias: any) => {
    //   console.log(categorias);
    //   this.categoriasP = categorias.principales;
    //   this.categoriasS = categorias.secundarias;
    // });
  }

  // guardarProducto() {
  //   if (this.id === 0) {
  //     // insertando
  //     console.log('Es nuevooooo');
  //     this.productosService.enviarImagenes(this.imagen1);
  //   } else {
  //     // actualizando
  //     console.log(this.producto);
  //     this.actualizando = true;

  //     // this.productosService.actualizarProducto( this.producto, this.id)
  //     //   .subscribe( (data: any) => {
  //     //     console.log(data);
  //     //   },
  //     //     error => console.error(error)
  //     //   );
  //     this.productosService.enviarImagenes(this.imagen1);

  //     setTimeout(() => {
  //       this.actualizando = false;
  //       this.router.navigate(['/admin/ecommerce']);
  //     }, 1000);
  //   }
  // }

}
