import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListaVehiculosComponent } from './paginas/Pag-lista-vehiculos/pag-lista-vehiculos.component';
import { PagNotfoundComponent } from './paginas/PagNotfound/PagNotfound.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { PagVehiculoRegistroComponent } from './paginas/PagVehiculoRegistro/PagVehiculoRegistro.component';
import { RegistroClienteComponent } from './paginas/RegistroCliente/RegistroCliente.component';

const routes: Routes = [
{
  path: "home",
  component: HomeComponent
},
{
  path: "vehiculos",
  component: PagListaVehiculosComponent
},
{
  path: "vehiculo/:codigo",
  component: PagVehiculoComponent
},
{
  path: "vehiculo",
  component: PagVehiculoRegistroComponent
},
{
  path: "registro",
  component: RegistroClienteComponent
},
{
  path: "",
  component: HomeComponent,
  pathMatch: "full",
},
{
  path: "**",
  component: PagNotfoundComponent,
  pathMatch: "full",
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
