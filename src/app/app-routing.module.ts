import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LgsShellComponent } from './lgs-screens';

const routes: Routes = [
    {
      path: 'shell',
      component: LgsShellComponent,
      loadChildren: () =>
      import('./lgs-screens/lgs-shell/lgs-shell.module').then(
        (m) => m.ShellModule
      )
    },
    { path: '', redirectTo: 'shell', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}