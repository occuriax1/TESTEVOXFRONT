// src/app/models/empresa.model.ts
import { Socio } from './socio.model';
export interface Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  tituloEstabelecimento?: string;
  atividadeEconomicaPrincipal?: string;
  atividadesEconomicasSecundarias?: string[];
  naturezaJuridica?: string;
  endereco?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairroDistrito?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  email?: string;
  telefone?: string;
  socios?: Socio[]; // Corrija o tipo para Socio[]
}