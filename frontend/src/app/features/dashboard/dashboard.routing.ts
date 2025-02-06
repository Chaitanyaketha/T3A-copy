
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { XlImportsComponent } from  '../imports/xl-imports.component';

 
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imports',
    component: XlImportsComponent
  
  },
  { path: '**', redirectTo: 'dashboard' }
];

 
@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
 