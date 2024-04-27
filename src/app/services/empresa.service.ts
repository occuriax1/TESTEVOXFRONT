// src/app/services/empresa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://127.0.0.1:8000/api/empresas';
  private empresasMap: Map<number, Empresa> = new Map();

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<{ 'hydra:member': Empresa[] }>(this.apiUrl).pipe(
      map(response => response['hydra:member']),
      tap(empresas => {
        this.empresasMap.clear(); 
        empresas.forEach(empresa => {
          if (empresa.id) {
            this.empresasMap.set(empresa.id, empresa);
          }
        });
      }),
      catchError(error => {
        console.error('Erro ao carregar empresas', error);
        return of([]);
      })
    );
  }

  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa).pipe(
      tap(createdEmpresa => {
        if (createdEmpresa.id) {
          this.empresasMap.set(createdEmpresa.id, createdEmpresa);
        }
      })
    );
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa).pipe(
      tap(updatedEmpresa => {
        if (updatedEmpresa.id) {
          this.empresasMap.set(updatedEmpresa.id, updatedEmpresa);
        }
      })
    );
  }

  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.empresasMap.delete(id);
      })
    );
  }

  getEmpresasMap(): Observable<Map<number, Empresa>> {
    if (this.empresasMap.size > 0) {
      return of(this.empresasMap);
    } else {
      return this.getEmpresas().pipe(
        map(() => this.empresasMap)
      );
    }
  }
}
