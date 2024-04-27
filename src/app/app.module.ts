import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaAddComponent } from './components/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './components/empresa-edit/empresa-edit.component';
import { SocioListComponent } from './components/socio-list/socio-list.component';
import { SocioAddComponent } from './components/socio-add/socio-add.component';
import { SocioEditComponent } from './components/socio-edit/socio-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaListComponent,
    EmpresaAddComponent,
    EmpresaEditComponent,
    SocioListComponent,
    SocioAddComponent,
    SocioEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




