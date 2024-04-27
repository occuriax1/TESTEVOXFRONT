// src/app/components/socio-add/socio-add.component.ts
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; 
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { SocioService } from 'src/app/services/socio.service';
import { Socio } from 'src/app/models/socio.model';

@Component({
  selector: 'app-socio-add',
  templateUrl: './socio-add.component.html',
  styleUrls: ['./socio-add.component.css']
})
export class SocioAddComponent implements OnInit {
  empresas: Empresa[] = [];
  selectedEmpresaId?: number | null = null; 
  novoSocio: Socio = { nome: '', participacao: 0, empresaId: undefined };

  constructor(
    private empresaService: EmpresaService,
    private socioService: SocioService
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.getEmpresas().subscribe(
      (empresas) => this.empresas = empresas,
      (error) => console.error('Erro ao carregar empresas', error)
    );
  }

  addSocio(): void {
    if (this.selectedEmpresaId) {
      this.novoSocio.empresaId = this.selectedEmpresaId;
      this.socioService.createSocio(this.novoSocio).subscribe(
        (socio) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Sócio adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.novoSocio = { nome: '', participacao: 0, empresaId: undefined }; 
        },
        (error) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao adicionar sócio.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          console.error('Erro ao adicionar sócio', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Atenção!',
        text: 'Nenhuma empresa selecionada!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }
}
