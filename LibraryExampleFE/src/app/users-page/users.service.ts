import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDTO } from 'src/interface/userDTO.interface';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactDTO } from 'src/interface/contactDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  public createUserForm(user?: IUserDetailsDTO): FormGroup{
    return this.fb.group({
        id: [user ? user.id : 0],
        firstName: [user ? user.firstName : '', Validators.required],
        lastName: [user ? user.lastName : '', Validators.required],
        dob: [user ? user.dob : '', Validators.required],
        contacts: user?.contacts 
          ? this.fb.array(
            user.contacts.map((item) => {
              return this.createContactFormItem(item);
            })
          )
          : this.fb.array([this.createContactFormItem()])
      }
    )
  }

  public createContactFormItem(data?: IContactDTO): FormGroup{
    return this.fb.group({
      id: [data ? data.id : 0],
      firstName: [data ? data.firstName : '', Validators.required],
      lastName: [data ? data.lastName : '', Validators.required]
    })
  }

  public getUsers(): Observable<IUserDTO[]> {
    return this.http.get<IUserDTO[]>(`${this.baseUrl}/User/GetAll`);
  }

  public getUser(id: number): Observable<IUserDetailsDTO> {
    return this.http.get<IUserDetailsDTO>(`${this.baseUrl}/User/GetById/${id}`);
  }

  public adduser(user: IUserDetailsDTO): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/User/Create`, user);
  }

  public editUser(user: IUserDetailsDTO): Observable<boolean>{
    return this.http.put<boolean>(`${this.baseUrl}/User/Update`, user);
  }

  public deleteUser(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/User/Delete/${id}`);
  }
}
