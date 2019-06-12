import { Component } from '@angular/core';
// importados por mi
import { NgForm } from '@angular/forms';
import { PruebaService } from './services/prueba.service';
import { Ejemplo } from './interfaces/ejemplo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private respuesta = {};
  ejemplo: Ejemplo = {
    title: '',
    description: ''
  };

  ejemplosDB = [];

  constructor(private pruebaService: PruebaService) {
    this.pruebaService.getPrueba().subscribe(( res: any ) => {
      this.ejemplosDB = res;
    });
  }

  public prueba() {
    this.pruebaService.getPrueba().subscribe( res => {
      this.respuesta = res;
      console.log(this.respuesta);
    });
  }

  public pruebaPost() {
    this.pruebaService.postPrueba( this.ejemplo )
      .subscribe( (data: any) => {
        console.log(data);
        alert(JSON.stringify(data.message));
      },
        error => {
          alert(JSON.stringify(error.error.message));
          console.error(error.error.message);
        });
  }
}
