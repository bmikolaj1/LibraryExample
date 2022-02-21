import { Component, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { EventEmitter } from '@angular/core';
import { UsersService } from '../users.service';
import { IContactDTO } from 'src/interface/contactDTO.interface';

@Component({
  selector: 'app-users-page-details',
  templateUrl: './users-page-details.component.html',
  styleUrls: ['./users-page-details.component.scss']
})
export class UsersPageDetailsComponent implements OnInit {
 public onSave: EventEmitter<FormGroup> = new EventEmitter();
 public editId: number | null = null;
 

  constructor(private dialogRef: MatDialogRef<UsersPageDetailsComponent>, @Inject(MAT_DIALOG_DATA) public form: FormGroup,private _userService: UsersService) { }

  ngOnInit(): void {
  
  }

  public onSubmit(): void{
    this.onSave.emit(this.form);
    this.dialogRef.close(true);
  }

  public addContact(): void {
    const contactForm = this._userService.createContactFormItem();
    this.contacts.push(contactForm);
  }

  public deleteContact(index: number): void {
    this.contacts.removeAt(index);
  }

  get contacts() {
    return this.form.controls["contacts"] as FormArray;
  }

  get userId(){
    return this.form.controls["id"] as AbstractControl;
  }

}
