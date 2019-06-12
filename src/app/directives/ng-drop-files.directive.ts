import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() imagen1: FileItem[] = [];
  @Input() imagen2: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extrarArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }


  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extrarArchivos(archivosLista: FileList) {
    // console.log(archivosLista);

    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemporal)) {

        const nuevoArchivo = new FileItem(archivoTemporal);

        // this.imagen1 = nuevoArchivo;
        this.imagen1.push(nuevoArchivo);

      }


    }
  }

  // Validaciones
  private _archivoPuedeSerCargado(archivo: File): boolean {

    if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }


  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {

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

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined ? false : tipoArchivo.startsWith('image'));
  }

}
