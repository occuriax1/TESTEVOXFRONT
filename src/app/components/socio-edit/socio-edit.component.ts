// src/app/components/socio-edit/socio-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { SocioService } from '../../services/socio.service';
import { Empresa } from '../../models/empresa.model';
import { Socio } from '../../models/socio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socio-edit',
  templateUrl: './socio-edit.component.html',
  styleUrls: ['./socio-edit.component.css']
})
export class SocioEditComponent implements OnInit {
  empresa: Empresa | null = null;
  empresas: Empresa[] = [];
  socio: Socio | null = null;

  constructor(
    private empresaService: EmpresaService,
    private socioService: SocioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmpresa();
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.getEmpresas().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar as empresas.', 'error');
      }
    });
  }

  getEmpresa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.socioService.getSocioById(+id).subscribe({
        next: (socio) => {
          this.socio = socio;
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao buscar detalhes do sócio.', 'error');
        }
      });
    } else {
      Swal.fire('Erro', 'ID do sócio não fornecido.', 'error');
    }
  }

  updateSocio(): void {
    if (this.socio && this.socio.id) {
      this.socioService.updateSocio(this.socio.id, this.socio).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Sócio atualizado com sucesso!', 'success');
          // Redirecionar ou atualizar a interface do usuário conforme necessário
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao atualizar sócio.', 'error');
        }
      });
    } else {
      Swal.fire('Erro', 'Tentativa de atualizar um sócio nulo ou sem ID.', 'error');
    }
  }
}
