import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { TablaComponent } from './tabla/tabla.component';

const routes: Routes = [
  { path: '', component: SeleccionComponent},
  { path: 'tabla/:idPedido', component: TablaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
