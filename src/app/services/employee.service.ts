import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  getEmployeeData():Observable<any>{
    return this._http.get('https://629882c6f2decf5bb74472c7.mockapi.io/api/v1/users');
  }
  getEmployeeById(empId:number):Observable<any>{
    return this._http.get('https://629882c6f2decf5bb74472c7.mockapi.io/api/v1/users/' + empId);
  }
  submitEmployee(empObj:any):Observable<any>{
    return this._http.post('https://629882c6f2decf5bb74472c7.mockapi.io/api/v1/users', empObj)
  }
  updateEmployee(empId:number, empObj:any):Observable<any>{
    return this._http.put('https://629882c6f2decf5bb74472c7.mockapi.io/api/v1/users/' +empId , empObj)
  }
  deleteEmployee(userId:any):Observable<any>{
    return this._http.delete('https://629882c6f2decf5bb74472c7.mockapi.io/api/v1/users/'+ userId) 
  }
}
