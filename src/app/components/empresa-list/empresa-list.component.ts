// src/app/components/empresa-list/empresa-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,

  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.getEmpresas().subscribe(
      (empresas) => this.empresas = empresas,
      (error) => console.error(error)
    );
  }

  deleteEmpresa(id: number | undefined): void {
    if (id === undefined) {
      Swal.fire('Erro', 'ID da empresa é indefinido', 'error');
      return;
    }
    
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não, cancele!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.deleteEmpresa(id).subscribe({
          next: () => {
            Swal.fire(
              'Excluído!',
              'A empresa foi excluída.',
              'success'
            );
            this.loadEmpresas(); // Recarregar a lista
          },
          error: (error) => {
            Swal.fire('Erro', 'Erro ao excluir empresa. Tente novamente.', 'error');
            console.error('Erro ao excluir empresa', error);
          }
        });
      }
    });
  }
}
