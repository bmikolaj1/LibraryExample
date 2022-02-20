import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDTO } from 'src/interface/userDTO.interface';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  public createUserForm(user?: IUserDetailsDTO): FormGroup{
    return this.fb.group({
        firstName: [user ? user.firstName : '', Validators.required],
        lastName: [user ? user.lastName : '', Validators.required],
        dob: [user ? user.dob : '', Validators.required]
      }
    )
  }

  public getUsers(): Observable<IUserDTO[]> {
    return this.http.get<IUserDTO[]>(`${this.baseUrl}/User/GetAll`);
  }

  public adduser(user: IUserDetailsDTO): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/User/Create`, user);
  }
}
