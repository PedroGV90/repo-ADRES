import { Routes } from '@angular/router';
import { FormularioComponent } from './adquisiciones/formulario/formulario.component';
import { VisualizarComponent } from './adquisiciones/visualizar/visualizar.component';
import { InicioComponent } from './inicio/inicio.component';  // Importa el nuevo componente
import { EditarAdquisicionComponent } from './adquisiciones/editar-adquisicion/editar-adquisicion.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },  // Ruta para la página de inicio
  { path: 'adquisiciones', component: FormularioComponent },
  { path: 'visualizar', component: VisualizarComponent },
  { path: 'editar-adquisicion/:id', component: EditarAdquisicionComponent }

];
