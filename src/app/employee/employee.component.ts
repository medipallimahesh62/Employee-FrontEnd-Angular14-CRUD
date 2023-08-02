import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EmployeeDto } from '../entity';
import { saveAs } from 'file-saver';
declare let $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeList: EmployeeDto[] = [];

  employeeDto: EmployeeDto = new EmployeeDto();
  @ViewChild('employeeForm') employeeForm: any;

  employeeId: number = 0;
  employeeName: string = '';
  employeeEmail: string = '';
  employeePhone: number = 0;
  employeeDate: Date = new Date

  addEmployee: boolean = false;
  viewAll: boolean = false;

  pageNo: number = 0;
  pageSize: number = 10;
  sortBy: string = 'id';



  constructor(private appService: AppService, private route: Router) { }

  ngOnInit(): void {
    this.getallEmp(this.pageNo, this.pageSize, this.sortBy)
  }

  // fetchEmployeeDetails() {
  //   this.appService.fetchAllEmployeeDetails().subscribe(data => {
  //     this.employeeList = <EmployeeDto[]>data;
  //   }, error => {
  //     console.log(error.error.message);
  //     this.employeeList = [];
  //   });
  // }


  saveEmployeeDetails() {
    
    this.appService.addOrUpdateEmployee(this.employeeDto).subscribe(data => {
      console.log(data);
      this.getallEmp(this.pageNo, this.pageSize, this.sortBy)
    },
      error => {
        console.log(error);
      })
  }
  onSubmit() {
    this.appService.addOrUpdateEmployee(this.employeeDto).subscribe(data => {
      this.getallEmp(this.pageNo, this.pageSize, this.sortBy)
    }
      , error => console.log(error));
  }

  gotoback() {
    this.route.navigate(['employee']);
  }


  updateEmployeeDetailsModal(employeeId: number, employeeName: string, employeeEmail: string,
    employeePhone: number, employeeDate: Date) {
    this.employeeDto.employeeName = employeeName;
    this.employeeDto.employeeEmail = employeeEmail;
    this.employeeDto.employeePhone = employeePhone;
    this.employeeDto.employeeDate = employeeDate;
    console.log(employeeDate);
    this.employeeDto.id = employeeId;
    $('#addEmployee').modal('show');
    this.addEmployee = false;
  }
  addEmployeeDetailsModal() {
    this.employeeDto.id = 0;
    this.employeeDto.employeeName = '';
    this.employeeDto.employeeEmail = '';
    this.employeeDto.employeePhone = 0;
    this.employeeDto.employeeDate = new Date;
    $('#addEmployee').modal('show');
    this.addEmployee = true;
  }

  deleteEmployeeDetailsModal(employeeId: number, employeeName: string) {
    $('#deleteEmployee').modal('show');
    this.employeeId = employeeId;
    this.employeeName = employeeName;
  }

  deleteEmployeeDetails() {
    this.appService.deleteEmployeeDetails(this.employeeId).subscribe(res => {
      this.getallEmp(this.pageNo, this.pageSize, this.sortBy)
    }, error => {
      console.log(error.error.message);
    });
  }

  goToAddressComponent(viewAll: boolean, event?: any, employeeId?: number) {
    if (event == undefined || event.target.nodeName != "SPAN") {
      this.route.navigate(['address-details', { viewAll: viewAll, employeeId: employeeId }]);
    }
  }
  getallEmp(pageNo: number, pageSize: number, sortBy: string) {

    this.appService.getAllemp(pageNo, pageSize, sortBy).subscribe(data => {
      this.employeeList = data
    })
  }

  downloadCSV() {
    this.appService.downloadCSVFile().subscribe((response: any) => {
      let blob: any = new Blob([response], { type: 'text/csv; charset=utf-8' });
      saveAs(blob, 'emp.csv');
    }), (_error: any) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}