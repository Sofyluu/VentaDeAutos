import { NgModule } from "@angular/core";
import { PagListaVehiculosComponent } from "./Pag-lista-vehiculos/pag-lista-vehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { utilitariosModule } from "../utilitarios/UtilitariosModule";
import { PagVehiculoComponent } from "./PagVehiculo/PagVehiculo.component";
import { RouterModule } from "@angular/router";
import { PagVehiculoRegistroComponent } from "./PagVehiculoRegistro/PagVehiculoRegistro.component";
import { HomeComponent } from "./Home/Home.component";
import { RegistroClienteComponent } from "./RegistroCliente/RegistroCliente.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    utilitariosModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    PagListaVehiculosComponent,
    PagVehiculoComponent,
    PagVehiculoRegistroComponent,
    HomeComponent,
    RegistroClienteComponent
  ],
  exports: [
    PagListaVehiculosComponent,
    PagVehiculoComponent,
    PagVehiculoRegistroComponent,
    HomeComponent,
    RegistroClienteComponent
  ],
})
export class PaginaModule {

}
