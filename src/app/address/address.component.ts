import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { AddressDto } from '../entity';
declare let $: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  viewAll: any;
  employeeId: any;
  addAddress: boolean = false;
   
  addressDto: AddressDto = new AddressDto();
  @ViewChild('addressForm') addressForm: any;
  addressId: number = 0;
  city:string= '';
  showAllAddress: boolean = false;
  employeeName: string = '';
  addressList: AddressDto[] = [];
  cities = [
    { Name: "Kerala", code: "Kerala" },
    { Name: "Coimbatore", code: "Coimbatore" },
    { Name: "Hyderabad", code: "Hyderabad" },
    { Name: "Bangalore", code: "Bangalore" },
    { Name: "Pune", code: "Pune" },
    { Name: "Mumbai", code: "Mumbai" },
    { Name: "Gurgaon", code: "Gurgaon" },
    { Name: "Chennai", code: "Chennai" }
  ];

  constructor(private route: ActivatedRoute, private appService: AppService,   
    private router: Router) { }

  ngOnInit(): void {
     
    this.employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (this.route.snapshot.paramMap.get('viewAll') == "true") {
      this.showAllAddress = true;
      this.fetchAllAddressDetails();
    } else{ 
      this.showAllAddress = false;
      this.fetchAddressDetailsForAEmployee();
    }
  }

  goBack() {
    this.router.navigate(['employee']);
  }

  saveAddressDetailsModal() {
    this.addressDto.id = 0;
    this.addressDto.city ='';
    $('#addAddress').modal('show');
    this.addAddress = true;
  }

  saveAddressDetails() {
    this.addressDto.employeeId = this.employeeId;
    this.appService.saveAddressForAEmployee(this.addressDto).subscribe(res => {
      this.fetchAddressDetailsForAEmployee();
    }, error => {
      console.log(error.error.message);
    });
  }

   
   gotoback(){
    this.router.navigate(['address-details']);
   }

  fetchAddressDetailsForAEmployee() {
    this.appService.fetchAddressessForAEmployee(this.employeeId).subscribe(res => {
      this.addressList = <AddressDto[]>res;
      this.employeeName = this.addressList[0].employeeName
      this.showAllAddress = false;
      console.log(this.addressList);
    }, error => {
      console.log(error.error.message);
      this.addressList = [];
    });
  }

  updateAddressDetailsModal(addressId:number,city:string) {
    this.addressDto.city=city;
    this.addressDto.id=addressId;
    $('#addAddress').modal('show');
    this.addAddress = false;
  }

  updateAddressDetails() {
    //this.addressDto = <AddressDto>this.AddressDetails.value;
    this.appService.updateAddress(this.addressDto).subscribe(res => {
      if (this.showAllAddress) {
        this.fetchAllAddressDetails();
      } else {
        this.fetchAddressDetailsForAEmployee();
      }
    }, error => {
      console.log(error.error.message);
    });
  }

  deleteAddressDetailsModal(addressId: number,city:string) {
    $('#deleteAddress').modal('show');
    this.addressId = addressId;
    this.city=city;
     
  
     
  }

  deleteAddressDetails() {
    this.appService.deleteAddress(this.addressId).subscribe(res => {
      if (this.showAllAddress) {
        this.fetchAllAddressDetails();
      } else {
        this.fetchAddressDetailsForAEmployee();
      }
    }, error => {
      console.log(error.error.message);
    });
  }

  fetchAllAddressDetails() {
    this.appService.fetchAllAddressess().subscribe(res => {
      this.addressList = <AddressDto[]>res;
      this.showAllAddress = true;
    }, error => {
      console.log(error.error.message);
      this.addressList = [];
    });
  }

}
