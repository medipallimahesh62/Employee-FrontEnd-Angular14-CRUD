import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { EmployeeDto, AddressDto } from './entity';
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-ui';
  constructor() { /* TODO document why this constructor is empty */ }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  
  }

}