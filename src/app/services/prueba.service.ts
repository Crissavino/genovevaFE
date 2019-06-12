import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Ejemplo } from './../interfaces/ejemplo.interface';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private urlAPI = 'http://genovevabe.cf/api';

  constructor(private http: HttpClient) { }

  getPrueba() {
    const url = `${this.urlAPI}/ejemplo`;
    // return this.http.get('http://127.0.0.1:8000/api/ejemplo').pipe( map( (res: any) => {
    //   console.log(res);
    //   console.log('res');
    // }));
    return this.http.get(url).pipe();

  }

  postPrueba( ejemplo: Ejemplo) {
    let body = JSON.stringify( ejemplo );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.urlAPI}/ejemplo`;

    return this.http.post(url, body, { headers }).pipe( map( res => res));
  }
}
