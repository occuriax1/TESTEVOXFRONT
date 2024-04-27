// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaAddComponent } from './components/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './components/empresa-edit/empresa-edit.component';
import { SocioListComponent } from './components/socio-list/socio-list.component';
import { SocioAddComponent } from './components/socio-add/socio-add.component';
import { SocioEditComponent } from './components/socio-edit/socio-edit.component';

const routes: Routes = [
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresas/add', component: EmpresaAddComponent },
  { path: 'empresas/edit/:id', component: EmpresaEditComponent },
  { path: 'socios', component: SocioListComponent },
  { path: 'socios/add', component: SocioAddComponent },
  { path: 'socios/edit/:id', component: SocioEditComponent },
  { path: '', redirectTo: '/empresas', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
