import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs';
import { IUserDetailsDTO } from 'src/interface/userDetailsDTO.interface';
import { IUserDTO } from 'src/interface/userDTO.interface';
import { UsersPageDetailsComponent } from './users-page-details/users-page-details.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  public displayedColumns: string[] = ["firstName", "lastName"];
  public dataSource: IUserDTO[] = [];
  public isLoading: boolean = false;
  
  constructor(private _userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.refreshGrid();
  }

  public refreshGrid(): void{
    this.isLoading = true;
    this._userService.getUsers().subscribe((result) => {
      this.isLoading = false;
      this.dataSource = result;
      });
  }

  public openDialog(): void{
    let form = this._userService.createUserForm();
    const dialogRef = this.dialog.open(UsersPageDetailsComponent, {
      width: '400px',
      data: form
   });

   const subscribeDialog = dialogRef.componentInstance.onSave.subscribe((data) => {
    let formValue = data.value;
    let user: IUserDetailsDTO = {firstName: formValue.firstName,lastName: formValue.lastName, dob: formValue.dob };
    this._userService.adduser(user).subscribe((result) => {
      this.refreshGrid();
    });
  });

  dialogRef.afterClosed().subscribe(result => {      
    subscribeDialog.unsubscribe();
  });


  }

}
