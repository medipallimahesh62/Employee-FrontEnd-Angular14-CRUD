export class EmployeeDto {
    id: number = 0;
    employeeName: string = '';
    employeeEmail: string = '';
    employeePhone: number = 0
    employeeDate:Date = new Date();
    addresss: AddressDto[] = [];
    addressCount: number = 0;
     
}

export class AddressDto {
    
    id: number = 0;
   city:any= '';
   employeeId: number = 0;
    employeeName: string = '';
}