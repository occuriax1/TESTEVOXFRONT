// src/app/components/empresa-add/empresa-add.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent {
  // Inicialize todos os novos campos com valores padrão apropriados
  novaEmpresa: Empresa = {
    nome: '',
    cnpj: '',
    endereco: '',
    tituloEstabelecimento: '',
    atividadeEconomicaPrincipal: '',
    atividadesEconomicasSecundarias: [],
    naturezaJuridica: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairroDistrito: '',
    municipio: '',
    uf: '',
    cep: '',
    email: '',
    telefone: ''
  };

  constructor(
    private empresaService: EmpresaService,
    private router: Router 
  ) {}

  addEmpresa(): void {
    this.empresaService.createEmpresa(this.novaEmpresa).subscribe({
      next: (empresa) => {
          Swal.fire({
          title: 'Sucesso!',
          text: 'Empresa adicionada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.novaEmpresa = {
          nome: '',
          cnpj: '',
          endereco: '',
          tituloEstabelecimento: '',
          atividadeEconomicaPrincipal: '',
          atividadesEconomicasSecundarias: [],
          naturezaJuridica: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairroDistrito: '',
          municipio: '',
          uf: '',
          cep: '',
          email: '',
          telefone: ''
        };
      },
      error: (error) => {
        
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao adicionar empresa. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
