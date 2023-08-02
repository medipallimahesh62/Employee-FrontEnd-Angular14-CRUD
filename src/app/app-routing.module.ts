import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent
  }, {
    path: '*',
    redirectTo: 'employee'
  }, {
    path: 'address-details',
    component: AddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
