export interface Producto {
    id: number;
    titulo: string;
    descripcion: string;
    detalle: string;
    // imagen1: FileItem[];
    // imagen2: string;
    descuento?: number;
    categoria_id: number;
    nuevo: number;
    popular: number;
    precio: number;
    stock: number;
    categoria?: number;
    path: string[];
}
