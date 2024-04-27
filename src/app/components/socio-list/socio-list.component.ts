// src/app/components/socio-list/socio-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SocioService } from 'src/app/services/socio.service';
import { Socio } from 'src/app/models/socio.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-socio-list',
  templateUrl: './socio-list.component.html',
  styleUrls: ['./socio-list.component.css']
})
export class SocioListComponent implements OnInit {
  socios: Socio[] = [];
  empresasMap = new Map<number, Empresa>(); 

  constructor(
    private socioService: SocioService,
    private empresaService: EmpresaService 
  ) {}

  ngOnInit(): void {
    
    this.empresaService.getEmpresasMap().subscribe(
      empresasMap => {
        this.empresasMap = empresasMap;
        this.loadSocios(); 
      },
      error => console.error('Erro ao carregar empresas', error)
    );
  }

  loadSocios(): void {
    this.socioService.getSocios().subscribe(
      socios => {
        this.socios = socios.map(socio => {
          const id = this.extractIdFromIri(socio.empresa);
          const empresa = id !== null ? this.empresasMap.get(id) : undefined;
          return { ...socio, empresaNome: empresa?.nome };
        });
      },
      error => console.error('Erro ao carregar sócios', error)
    );
  }
  
  private extractIdFromIri(iri: string | null | undefined): number | null {
    if (!iri) { 
      return null;
    }
    const id = parseInt(iri.split('/').pop() || '0', 10);
    return isNaN(id) ? null : id; 
  }
  deleteSocio(id: number | undefined): void {
    if (id === undefined) {
      console.error('Tentativa de excluir um sócio sem ID');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este sócio?')) {
      this.socioService.deleteSocio(id).subscribe(
        () => {
          console.log('Sócio excluído com sucesso!');
          this.loadSocios(); 
        },
        (error) => console.error('Erro ao excluir sócio', error)
      );
    }
  }
}
