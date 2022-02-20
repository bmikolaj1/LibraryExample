import { Component, Inject, OnInit, Output } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { EventEmitter } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-page-details',
  templateUrl: './users-page-details.component.html',
  styleUrls: ['./users-page-details.component.scss']
})
export class UsersPageDetailsComponent implements OnInit {
 public onSave: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<UsersPageDetailsComponent>, @Inject(MAT_DIALOG_DATA) public form: FormGroup,private _userService: UsersService) { }

  ngOnInit(): void {
  
  }

  public onSubmit(): void{
    this.onSave.emit(this.form);
    this.dialogRef.close(true);
  }

}
