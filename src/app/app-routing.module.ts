import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Modules/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./Modules/students/students.module').then(m => m.StudentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
