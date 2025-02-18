import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionesService {
  private apiUrl = 'http://localhost:3000/api/adquisiciones'; // Cambia la URL si es diferente

  constructor(private http: HttpClient) { }

  // 1️⃣ Obtener todas las adquisiciones
  getAdquisiciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2️⃣ Insertar una nueva adquisición
  createAdquisicion(adquisicion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adquisicion,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // 3️⃣ Actualizar una adquisición
  updateAdquisicion(id: number, adquisicion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, adquisicion, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4️⃣ Eliminar una adquisición
  deleteAdquisicion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // 4️⃣ obtener una adquisicon por ID
  // preferi asi por que si hay muchas... no es buena idea traerlas todas
  getAdquisicionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

}
