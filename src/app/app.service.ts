import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto, AddressDto } from './entity';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'http://localhost:8080/employee/';

  constructor(private http: HttpClient) { }

  public fetchAllEmployeeDetails() {
    return this.http.get<any>(this.url + 'fetch-all-employee-details');
  }

  public addOrUpdateEmployee(employeeDto: EmployeeDto) {
    return this.http.post<any>(this.url + 'add-or-update-employee', employeeDto);
  }

  public deleteEmployeeDetails(employeeId: number) {
    return this.http.delete<any>(this.url + 'delete-employee-details?employeeId=' + employeeId);
  }

  public saveAddressForAEmployee(addressDto: AddressDto) {
    return this.http.post<any>(this.url + 'save-address-for-a-employee', addressDto);
  }

  public fetchAddressessForAEmployee(employeeId: number) {
    return this.http.get<any>(this.url + 'fetch-address-details-for-a-employee?employeeId='+ employeeId);
  }

  public updateAddress(addressDto: AddressDto) {
    return this.http.put<any>(this.url + 'update-address', addressDto);
  }

  public deleteAddress(addressId: number) {
    return this.http.delete<any>(this.url + 'delete-address?addressId=' + addressId);
  }

  public fetchAllAddressess() {
    return this.http.get<any>(this.url + 'fetch-all-address-details');
  }
  public getAllemp(pageNo : number,pageSize : number,sortBy : string) {

    return this.http.get<any[]>(this.url+'page-for-employee?pageNo=' + pageNo + '&pageSize=' + pageSize + 
    '&sortBy=' + sortBy);

  }
     downloadCSVFile(): any {
		return this.http.get('http://localhost:8080/employee/emp-csv', {responseType: 'blob'});
  }

}
