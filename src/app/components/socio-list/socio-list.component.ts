// src/app/components/socio-list/socio-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SocioService } from 'src/app/services/socio.service';
import { Socio } from 'src/app/models/socio.model';

@Component({
  selector: 'app-socio-list',
  templateUrl: './socio-list.component.html',
  styleUrls: ['./socio-list.component.css']
})
export class SocioListComponent implements OnInit {
  socios: Socio[] = [];

  constructor(private socioService: SocioService) {}

  ngOnInit(): void {
    this.loadSocios();
  }

  loadSocios(): void {
    this.socioService.getSocios().subscribe(
      (data) => {
        console.log('Dados recebidos:', data);  
        this.socios = data;  
      },
      (error) => console.error('Erro ao carregar sócios', error)
    );
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
