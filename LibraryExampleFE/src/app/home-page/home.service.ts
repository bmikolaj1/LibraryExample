import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IBookRentDTO } from "src/interface/bookRentDTO.interface";

@Injectable({
    providedIn: 'root'
  })
  export class HomeService {
    private baseUrl: string = environment.baseUrl;
  
    constructor(private http: HttpClient, private fb: FormBuilder) { }

    public getBookRents(): Observable<IBookRentDTO[]> {
      return this.http.get<IBookRentDTO[]>(`${this.baseUrl}/Home/GetAll`);
    }
  
   
}
  