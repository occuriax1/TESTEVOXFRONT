// src/app/components/empresa-edit/empresa-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
  empresa: Empresa | null = null;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empresaService.getEmpresaById(+id).subscribe(
        (empresa) => {
          this.empresa = empresa;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao buscar empresa!'
          });
          console.error('Erro ao buscar empresa', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'ID da empresa não fornecido na rota!'
      });
    }
  }

  updateEmpresa(): void {
    if (this.empresa && this.empresa.id) {
      this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Empresa atualizada com sucesso!',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/empresas']); // Adiciona redirecionamento aqui
            }
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar',
            text: 'Não foi possível atualizar a empresa!'
          });
          console.error('Erro ao atualizar empresa', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Tentativa de atualizar uma empresa nula ou sem ID.'
      });
    }
  }
}