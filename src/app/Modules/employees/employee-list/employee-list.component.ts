import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeData: any[] = [];
  isEdit: boolean = false;
  employeeObject: any = {};
  employeeForm!: FormGroup;
  constructor(private _employeeService: EmployeeService) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getAllEmployeeData();
  }

  //METHOD TO FETCH  EMPLOYEE DATA FROM DATABASE
  getAllEmployeeData() {
    this._employeeService.getEmployeeData().subscribe(result => {
      this.employeeData = result;
    })
  }

  // UPON ADD BUTTON CLICK
  onAddClick() {
    this.isEdit = false;
    this.employeeObject = {}
  }

  // UPON EDIT BUTTON CLICK
  onEditClick(empObj: any) {
    this.isEdit = true;
    this._employeeService.getEmployeeById(empObj.id).subscribe(result => {
      this.employeeObject = result;
      console.log('data', this.employeeObject)
      this.employeeForm.patchValue({
        firstName: this.employeeObject.firstName,
        lastName: this.employeeObject.lastName,
        email: this.employeeObject.email,
        phoneNumber: this.employeeObject.phoneNumber,
      })
    })
  }

  //METHOD TO SUBMIT NEW  EMPLOYEE DATA TO DATABASE
  addNewEmployee() {
    const formValues = this.employeeForm.value;
    var req = {
      createdAt: new Date(),
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber
    }
    this._employeeService.submitEmployee(req).subscribe(result => {
      this.getAllEmployeeData();
      this.employeeForm.reset();
    })
  }

  //METHOD TO UPDATE EMPLOYEE DATA 
  updateEmployee() {
    const formValues = this.employeeForm.value;
    var req = {
      id: this.employeeObject.id,
      createdAt: new Date(),
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber
    }
    this._employeeService.updateEmployee(this.employeeObject.id, req).subscribe(result => {
      this.getAllEmployeeData();
      this.employeeForm.reset();
    })
  }

  //METHOD TO DELETE  EMPLOYEE DATA FROM DATABASE
  onDeleteEmployee(empObj: any) {
    this._employeeService.deleteEmployee(empObj.id).subscribe(result => {
      this.getAllEmployeeData();
    })
  }

  //UPON MODAL CLOCE
  onCloseClick() {
    this.employeeForm.reset();
  }

  ngOnDestroy() {
    this.employeeData = [];
    this.employeeObject = {};
    console.log('calling onDestroy...')
  }
}
