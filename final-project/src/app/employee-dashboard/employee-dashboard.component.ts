import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

    formValue !: FormGroup;
    employeeModelObj: EmployeeModel = new EmployeeModel();
    employeeData !: any;
  
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee()
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.mobile = this.formValue.value.mobile
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res)
       alert("Employee Added Succesfully")
       let ref = document.getElementById('cancel')
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();
    },
    err=>{
      alert("somthing went wrong")
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    },
    err=>{
      alert("Somthing went wrong");
    })
  }

  // putEmployee(row:any){
  //   this.api.deleteEmployee(row.id)
  //   .subscribe(res=>{
  //     this.
  //   })
  }

}
