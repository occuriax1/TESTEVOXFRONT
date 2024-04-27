// src/app/services/socio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socio } from '../models/socio.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private apiUrl = 'http://127.0.0.1:8000/api/socios';

  constructor(private http: HttpClient) {}

  getSocios(): Observable<Socio[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response['hydra:member'] as Socio[])
    );
  }
  
  createSocio(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(this.apiUrl, socio);
  }
  
  getSocioById(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.apiUrl}/${id}`);
  }

  updateSocio(id: number, empresa: Socio): Observable<Socio> {
    return this.http.put<Socio>(`${this.apiUrl}/${id}`, empresa);
  }

  deleteSocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
