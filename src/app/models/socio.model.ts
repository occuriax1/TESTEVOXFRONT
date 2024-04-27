// src/app/models/socio.model.ts
export interface Socio {
  id?: number;
  nome: string;
  participacao: number;
  empresaNome?: string;
  empresa?: string | null; 
  empresaId?: number;
}